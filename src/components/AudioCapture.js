import React, { useEffect, useRef } from 'react';
import io from 'socket.io-client';

const AudioCapture = ({ onTranslation }) => {
  const audioRef = useRef(null);
  const socket = useRef(null);

  useEffect(() => {
    // Conectar con el servidor WebSocket
    socket.current = io('http://localhost:4000');

    // Escuchar las traducciones que envía el servidor
    socket.current.on('translation', (translation) => {
      console.log('Traducción recibida:', translation);
      onTranslation(translation);
    });

    // Capturar el audio del micrófono
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        console.log('Captura de audio iniciada');
        audioRef.current = new MediaRecorder(stream);
        audioRef.current.start();

        audioRef.current.addEventListener('dataavailable', event => {
          console.log('Datos de audio capturados:', event.data);
          socket.current.emit('audio', event.data);
        });

        audioRef.current.addEventListener('error', (err) => {
          console.error('Error en MediaRecorder:', err);
        });
      })
      .catch(err => {
        console.error('Error al acceder al micrófono', err);
      });

    return () => {
      // Detener la captura de audio y desconectar el socket cuando el componente se desmonte
      if (audioRef.current) {
        audioRef.current.stop();
        console.log('Captura de audio detenida');
      }

      if (socket.current) {
        socket.current.disconnect();
        console.log('Socket desconectado');
      }
    };
  }, [onTranslation]);

  return <div>Capturando audio...</div>;
};

export default AudioCapture;

