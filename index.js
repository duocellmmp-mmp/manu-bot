require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const chrono = require('chrono-node');
const cron = require('node-cron');
const admin = require('firebase-admin');

// 1. Conexión Firebase
const serviceAccount = JSON.parse(process.env.FIREBASE_CONFIG);
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
const db = admin.firestore();

const app = express();
app.get('/', (req, res) => res.send('Bot activo con Firebase'));
app.listen(process.env.PORT || 3000);

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });

// 2. Lógica del Bot
bot.on('message', async (msg) => {
    const text = msg.text;
    if (!text || text.startsWith('/')) return;

    const fechaDetectada = chrono.es.parseDate(text);
    if (fechaDetectada) {
        await db.collection('tareas').add({
            chatId: msg.chat.id,
            texto: text,
            fecha: admin.firestore.Timestamp.fromDate(fechaDetectada),
            notificado: false
        });
        bot.sendMessage(msg.chat.id, `✅ Agendado en la nube para: ${fechaDetectada.toLocaleString()}`);
    } else {
        bot.sendMessage(msg.chat.id, "No entendí la fecha. Prueba: 'Prueba el miércoles a las 10:30'");
    }
});

// 3. Verificador de tareas (revisa Firebase cada minuto)
cron.schedule('* * * * *', async () => {
    const ahora = new Date();
    const snapshot = await db.collection('tareas').where('notificado', '==', false).get();
    
    snapshot.forEach(async (doc) => {
        const data = doc.data();
        if (data.fecha.toDate() <= ahora) {
            bot.sendMessage(data.chatId, `🔔 RECORDATORIO: ${data.texto}`);
            await db.collection('tareas').doc(doc.id).update({ notificado: true });
        }
    });
});