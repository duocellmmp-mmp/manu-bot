require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const chrono = require('chrono-node');
const cron = require('node-cron');
const admin = require('firebase-admin');

// 1. Configuración de Firebase
// Asegúrate de que la variable FIREBASE_CONFIG en Render contenga el JSON de tu cuenta de servicio
const serviceAccount = JSON.parse(process.env.FIREBASE_CONFIG);
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

// 2. Servidor Web para mantener el bot despierto en Render
const app = express();
const port = process.env.PORT || 3000;
app.get('/', (req, res) => res.send('Bot de Manu activo y conectado a Firebase'));
app.listen(port, () => console.log(`Servidor escuchando en puerto ${port}`));

// 3. Configuración del Bot
const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });

// 4. Lógica de mensajes
bot.on('message', async (msg) => {
    const text = msg.text;
    if (!text || text.startsWith('/')) return;

    // Usamos la referencia actual y forzamos el idioma español
    const ahora = new Date();
    const parsedDate = chrono.es.parseDate(text, ahora, { forwardDate: true });

    if (parsedDate) {
        // Guardamos en Firebase con zona horaria local
        await db.collection('tareas').add({
            chatId: msg.chat.id,
            texto: text,
            fecha: admin.firestore.Timestamp.fromDate(parsedDate),
            notificado: false
        });

        const fechaFormateada = parsedDate.toLocaleString('es-EC', { timeZone: 'America/Guayaquil' });
        bot.sendMessage(msg.chat.id, `✅ ¡Entendido! Agendado para el: ${fechaFormateada}`);
    } else {
        bot.sendMessage(msg.chat.id, "No logré entender la fecha. Intenta escribir algo como: 'Recordar revisar pruebas mañana a las 10:00'");
    }
});

// 5. Verificador de tareas (revisa Firebase cada minuto)
cron.schedule('* * * * *', async () => {
    const ahora = new Date();
    const snapshot = await db.collection('tareas')
        .where('notificado', '==', false)
        .get();
    
    snapshot.forEach(async (doc) => {
        const data = doc.data();
        if (data.fecha.toDate() <= ahora) {
            bot.sendMessage(data.chatId, `🔔 RECORDATORIO: ${data.texto}`);
            await db.collection('tareas').doc(doc.id).update({ notificado: true });
        }
    });
});