
const { Client, GatewayIntentBits, Events } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, AudioPlayerStatus } = require('@discordjs/voice');
const io = require('socket.io')(4000); // Asegúrate de que el puerto coincida con el de tu cliente React

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once(Events.ClientReady, () => {
  console.log('Bot está listo');
});

client.on(Events.MessageCreate, async (message) => {
  if (message.content === '!join' && message.member.voice.channel) {
    const connection = joinVoiceChannel({
      channelId: message.member.voice.channel.id,
      guildId: message.guild.id,
      adapterCreator: message.guild.voiceAdapterCreator,
    });

    connection.on('stateChange', async (oldState, newState) => {
      if (newState.status === AudioPlayerStatus.Playing) {
        console.log('Bot conectado al canal de voz');
      }
    });

    connection.on('error', error => {
      console.error('Error en la conexión de voz:', error);
    });
  }
});

client.login('YOUR_DISCORD_BOT_TOKEN');

io.on('connection', (socket) => {
  console.log('Cliente conectado');

  socket.on('audio', async (audioData) => {
    console.log('Datos de audio recibidos');

    // Aquí se debería procesar el audio y traducirlo
    // Este es un lugar para añadir tu lógica de traducción

    const translatedText = 'Texto traducido simulado'; // Simulación
    socket.emit('translation', translatedText);
  });

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});
