// Usamos require de forma estándar
const TelegramBot = require('node-telegram-bot-api');
const express = require('express');

// 1. Configuración del Servidor Web
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('El bot de Manu está en línea 🤖');
});

app.listen(port, () => {
  console.log(`Servidor web escuchando en el puerto ${port}`);
});

// 2. Configuración del Bot
// Usamos tu Token directamente aquí para esta prueba, 
// recuerda luego moverlo a un archivo .env por seguridad.
const token = '8007968947:AAHD6il9Lyo0DmH4UDq_mCE0uUUcCuZH__M';

// IMPORTANTE: Si polling da error al desplegar, se debe usar webhooks.
// Para pruebas locales, polling: true funciona.
const bot = new TelegramBot(token, { polling: true });

// Comando: /start
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, '¡Hola Manu! Soy tu asistente. Pídeme que te recuerde algo usando este formato: "Pon un recordatorio dentro de X minutos"');
});

// Comando: Recordatorios
bot.onText(/Pon un recordatorio dentro de (\d+) minutos/i, (msg, match) => {
  const chatId = msg.chat.id;
  const minutos = parseInt(match[1]);

  bot.sendMessage(chatId, `¡Anotado! Te enviaré un recordatorio en ${minutos} minutos. ⏱️`);

  setTimeout(() => {
    bot.sendMessage(chatId, '🔔 ¡Bip bip! Aquí tienes tu recordatorio.');
  }, minutos * 60 * 1000);
});