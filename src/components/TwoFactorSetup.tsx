import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const TwoFactorSetup: React.FC = () => {
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();
  const [isEnabling, setIsEnabling] = useState(false);

  const handleEnable2FA = async () => {
    setIsEnabling(true);
    try {
      // Redirect to Auth0 for 2FA setup
      await loginWithRedirect({
        appState: {
          returnTo: window.location.pathname,
        },
        authorizationParams: {
          prompt: 'login',
          // Additional params for 2FA setup if needed
        },
      });
    } catch (error) {
      console.error('Error enabling 2FA:', error);
    } finally {
      setIsEnabling(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
        <h2 className="text-xl font-bold mb-4">Activer la double authentification (2FA)</h2>
        <p>Veuillez vous connecter pour configurer la 2FA.</p>
        <button onClick={() => loginWithRedirect()} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
          Se connecter
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Activer la double authentification (2FA)</h2>
      <div className="text-gray-700 mb-4">
        La double authentification ajoute une couche de sécurité supplémentaire à votre compte.
      </div>
      <button
        onClick={handleEnable2FA}
        disabled={isEnabling}
        className="w-full bg-green-600 text-white py-2 rounded disabled:opacity-50"
      >
        {isEnabling ? 'Activation en cours...' : 'Activer la 2FA'}
      </button>
      <div className="mt-4 text-sm text-gray-600">
        <p>Après activation, vous devrez fournir un code de vérification lors de la connexion.</p>
        <a href="https://auth0.com/docs/secure/multi-factor-authentication" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline block mt-2">
          En savoir plus sur la 2FA Auth0
        </a>
      </div>
    </div>
  );
};

export default TwoFactorSetup;
