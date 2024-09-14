// /server/services/googleSpeech.js
const axios = require('axios');

const translateSpeech = async (audioData) => {
    // Aquí iría la integración con Google Cloud Speech-to-Text API
    // Simulación de respuesta por ahora
    return "Texto traducido simulado";
};

module.exports = { translateSpeech };
