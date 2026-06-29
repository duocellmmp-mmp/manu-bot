require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const chrono = require('chrono-node');
const cron = require('node-cron');

// 1. Configuración Servidor (Render)
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('Bot de Manu en línea 🤖'));
app.listen(port, () => console.log(`Servidor activo en puerto ${port}`));

// 2. Configuración Bot
const token = process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot(token, { polling: true });

// Almacenamiento temporal (en memoria)
let tareas = [];

// 3. Lógica del Bot
bot.on('message', (msg) => {
    const text = msg.text;
    if (!text || text.startsWith('/')) return;

    // Detectar fecha y hora en el mensaje
    const fechaDetectada = chrono.es.parseDate(text);

    if (fechaDetectada) {
        const tarea = {
            chatId: msg.chat.id,
            texto: text,
            fecha: fechaDetectada,
            notificado: false
        };
        tareas.push(tarea);
        bot.sendMessage(msg.chat.id, `✅ Entendido. Agendado para: ${fechaDetectada.toLocaleString()}`);
    } else {
        bot.sendMessage(msg.chat.id, "No entendí cuándo quieres el recordatorio. Prueba con: 'Prueba el miércoles a las 10:30'");
    }
});

// 4. Verificador de tareas (revisa cada minuto)
cron.schedule('* * * * *', () => {
    const ahora = new Date();
    
    tareas.forEach(t => {
        if (!t.notificado && t.fecha <= ahora) {
            bot.sendMessage(t.chatId, `🔔 RECORDATORIO: ${t.texto}`);
            t.notificado = true;
        }
    });
});