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
    const text = msg.text || "";
    const lowerText = text.toLowerCase();

    // 1. COMANDOS DE PRIORIDAD ALTA
    if (lowerText.includes('eliminar') || lowerText.includes('quitar')) {
        const snapshot = await db.collection('tareas').where('chatId', '==', msg.chat.id).get();
        if (snapshot.empty) return bot.sendMessage(msg.chat.id, "No tienes recordatorios.");
        
        const batch = db.batch();
        snapshot.docs.forEach(doc => batch.delete(doc.ref));
        await batch.commit();
        return bot.sendMessage(msg.chat.id, "✅ Recordatorios eliminados.");
    }

    if (lowerText.includes('dame todos') || lowerText.includes('mis recordatorios')) {
        // Quitamos el orderBy por ahora para evitar el error de índice
        const snapshot = await db.collection('tareas')
            .where('chatId', '==', msg.chat.id)
            .where('notificado', '==', false)
            .get();
        
        if (snapshot.empty) return bot.sendMessage(msg.chat.id, "No tienes tareas pendientes.");
        
        let respuesta = "📋 *Pendientes:*\n";
        snapshot.forEach(doc => {
            const data = doc.data();
            respuesta += `• ${data.texto} (${data.fecha.toDate().toLocaleString('es-EC')})\n`;
        });
        return bot.sendMessage(msg.chat.id, respuesta, { parse_mode: 'Markdown' });
    }

    // 2. DETECCIÓN DE FECHA (Solo si no es un comando)
    const parsedDate = chrono.es.parseDate(text, new Date(), { forwardDate: true });

    if (parsedDate) {
        await db.collection('tareas').add({
            chatId: msg.chat.id,
            texto: text,
            fecha: admin.firestore.Timestamp.fromDate(parsedDate),
            notificado: false
        });
        bot.sendMessage(msg.chat.id, `✅ Agendado: ${parsedDate.toLocaleString('es-EC')}`);
    } else {
        bot.sendMessage(msg.chat.id, "No entendí. Prueba: 'Mañana a las 10:00' o 'Mis recordatorios'");
    }
});

cron.schedule('* * * * *', async () => {
    const ahora = new Date();
    const snapshot = await db.collection('tareas').where('notificado', '==', false).get();
    snapshot.forEach(async (doc) => {
        if (doc.data().fecha.toDate() <= ahora) {
            bot.sendMessage(doc.data().chatId, `🔔 RECORDATORIO: ${doc.data().texto}`);
            await db.collection('tareas').doc(doc.id).update({ notificado: true });
        }
    });
});