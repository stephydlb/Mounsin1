import React, { useState } from 'react';


const TwoFactorSetup: React.FC = () => {

  // Ce composant doit être relié à la configuration 2FA d'Auth0 côté dashboard.
  // Ici, on affiche simplement un message d'information.

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Activer la double authentification (2FA)</h2>
      <div className="text-gray-700">
        La double authentification (2FA) est à activer dans votre espace utilisateur Auth0.<br />
        Rendez-vous sur la page de gestion de compte après connexion.<br />
        <br />
        <b>Note :</b> L’activation 2FA (SMS, app, biométrie) se fait côté Auth0 Dashboard.<br />
        <a href="https://auth0.com/docs/secure/multi-factor-authentication" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">En savoir plus sur la 2FA Auth0</a>
      </div>
    </div>
  );
};

export default TwoFactorSetup;
