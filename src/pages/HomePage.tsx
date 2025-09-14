import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  console.log('DEBUG: HomePage rendered!');
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <img src="/file.svg" alt="Logo" className="w-20 mb-6" />
      <h1 className="text-4xl font-bold text-green-600 mb-2">Mounsin</h1>
      <p className="text-lg text-gray-700 mb-8 text-center max-w-md">
        Plateforme de santé centralisée pour vous faciliter l'acces aux soins. Accédez à vos rendez-vous, dossiers médicaux, notifications et plus encore !
      </p>
      <div className="flex gap-4 flex-wrap justify-center">
        <Link to="/fr/auth/login" className="px-7 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition">Se connecter</Link>
        <Link to="/fr/dashboard" className="px-7 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">Tableau de bord</Link>
        <Link to="/fr/dashboard/appointments" className="px-7 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition">Rendez-vous</Link>
      </div>
    </div>
  );
};

export default HomePage;
