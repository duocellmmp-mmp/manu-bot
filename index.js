require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const chrono = require('chrono-node');
const cron = require('node-cron');
const admin = require('firebase-admin');

const serviceAccount = JSON.parse(process.env.FIREBASE_CONFIG);
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
const db = admin.firestore();

const app = express();
app.listen(process.env.PORT || 3000);

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });

bot.on('message', async (msg) => {
    const text = msg.text;
    if (!text) return;

    // 1. Comando para borrar
    if (text.toLowerCase().includes('quitar') || text.toLowerCase().includes('eliminar')) {
        const snapshot = await db.collection('tareas').where('chatId', '==', msg.chat.id).get();
        let batch = db.batch();
        snapshot.docs.forEach(doc => batch.delete(doc.ref));
        await batch.commit();
        return bot.sendMessage(msg.chat.id, "✅ Todos tus recordatorios han sido eliminados.");
    }

    // 2. Procesar Recordatorios
    const ahora = new Date();
    // Forzamos que la fecha sea desde hoy para evitar errores de desfase
    const parsedDate = chrono.es.parseDate(text, ahora, { forwardDate: true });

    if (parsedDate) {
        await db.collection('tareas').add({
            chatId: msg.chat.id,
            texto: text,
            fecha: admin.firestore.Timestamp.fromDate(parsedDate),
            notificado: false
        });
        bot.sendMessage(msg.chat.id, `✅ Agendado para: ${parsedDate.toLocaleString('es-EC')}`);
    } else if (!text.startsWith('/')) {
        bot.sendMessage(msg.chat.id, "No entendí la fecha. Ejemplo: 'Recordar mañana a las 12:00'");
    }
});

// 3. Verificador de tareas
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