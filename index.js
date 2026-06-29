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
    const text = msg.text ? msg.text.toLowerCase() : "";
    if (!text) return;

    // 1. Comando: Eliminar
    if (text.includes('eliminar') || text.includes('quitar')) {
        const snapshot = await db.collection('tareas').where('chatId', '==', msg.chat.id).get();
        if (snapshot.empty) return bot.sendMessage(msg.chat.id, "No tienes recordatorios pendientes.");
        let batch = db.batch();
        snapshot.docs.forEach(doc => batch.delete(doc.ref));
        await batch.commit();
        return bot.sendMessage(msg.chat.id, "✅ Todos tus recordatorios han sido eliminados.");
    }

    // 2. Comando: Listar (Ordenados por fecha)
    if (text.includes('mis recordatorios') || text.includes('dame todos los recordatorios')) {
        const snapshot = await db.collection('tareas')
            .where('chatId', '==', msg.chat.id)
            .where('notificado', '==', false)
            .orderBy('fecha', 'asc') // <-- Ordenado por fecha
            .get();
        
        if (snapshot.empty) return bot.sendMessage(msg.chat.id, "No tienes recordatorios programados.");
        
        let respuesta = "📋 *Tus recordatorios pendientes:*\n\n";
        snapshot.forEach(doc => {
            const data = doc.data();
            respuesta += `• ${data.texto} (📅 ${data.fecha.toDate().toLocaleString('es-EC')})\n`;
        });
        return bot.sendMessage(msg.chat.id, respuesta, { parse_mode: 'Markdown' });
    }

    // 3. Procesar Recordatorios (solo si no fue un comando anterior)
    const ahora = new Date();
    const parsedDate = chrono.es.parseDate(text, ahora, { forwardDate: true });

    if (parsedDate) {
        await db.collection('tareas').add({
            chatId: msg.chat.id,
            texto: msg.text, // Guardamos el texto original
            fecha: admin.firestore.Timestamp.fromDate(parsedDate),
            notificado: false
        });
        bot.sendMessage(msg.chat.id, `✅ Agendado para: ${parsedDate.toLocaleString('es-EC')}`);
    } else {
        bot.sendMessage(msg.chat.id, "No entendí. Prueba: 'Recordar mañana a las 10' o 'Dame mis recordatorios'");
    }
});

// 4. Verificador de tareas
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