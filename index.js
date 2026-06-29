require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const chrono = require('chrono-node'); // <-- Nueva librería

const app = express();
app.get('/', (req, res) => res.send('Bot activo'));
app.listen(process.env.PORT || 3000);

const token = process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot(token, { polling: true });

bot.on('message', (msg) => {
  const text = msg.text;
  if (!text || text.startsWith('/')) return;

  // Intentamos parsear la fecha del mensaje
  const parsedDate = chrono.es.parseDate(text); // 'es' para español

  if (parsedDate) {
    const ahora = new Date();
    const tiempoEspera = parsedDate.getTime() - ahora.getTime();

    if (tiempoEspera > 0) {
      bot.sendMessage(msg.chat.id, `✅ Entendido. Te recordaré: "${text}" el ${parsedDate.toLocaleString()}`);
      
      setTimeout(() => {
        bot.sendMessage(msg.chat.id, `🔔 RECORDATORIO: ${text}`);
      }, tiempoEspera);
    } else {
      bot.sendMessage(msg.chat.id, "❌ La fecha parece estar en el pasado.");
    }
  } else {
    bot.sendMessage(msg.chat.id, "No pude entender la fecha. Intenta: 'Recordar prueba el miércoles a las 10:30'");
  }
});