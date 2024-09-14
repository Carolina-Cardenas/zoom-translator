// /client/src/App.js
import React, { useState } from 'react';
import AudioCapture from './components/AudioCapture';
import TranslationDisplay from './components/TranslationDisplay';
import ZoomIntegration from './components/ZoomIntegration';

const App = () => {
  const [translation, setTranslation] = useState('');

  const handleTranslation = (translatedText) => {
    setTranslation(translatedText);
  };

  return (
    <div>
      <h1>Aplicación de Traducción en Vivo para Zoom</h1>
      <ZoomIntegration />
      <AudioCapture onTranslation={handleTranslation} />
      <TranslationDisplay translation={translation} />
    </div>
  );
};

export default App;
