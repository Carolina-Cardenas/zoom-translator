
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const { translateSpeech } = require('./services/googleSpeech');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.json());

io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');

    socket.on('audio', async (audioData) => {
        const translatedText = await translateSpeech(audioData);
        socket.emit('translation', translatedText);
    });

    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
});

server.listen(4000, () => {
    console.log('Servidor corriendo en el puerto 4000');
});
