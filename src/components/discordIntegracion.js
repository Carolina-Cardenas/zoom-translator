

import React, { useEffect } from 'react';

const DiscordIntegration = () => {
  useEffect(() => {
    // Aquí iría la lógica para conectar con el bot de Discord, si es necesario
    console.log('Integración con Discord iniciada');

    return () => {
      // Limpieza si es necesario
      console.log('Integración con Discord desactivada');
    };
  }, []);

  return <div>Integración con Discord</div>;
};

export default DiscordIntegration;
