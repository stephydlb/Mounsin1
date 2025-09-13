import React from 'react';

const SettingsPage: React.FC = () => {
  return (
    <div className="max-w-xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-700">Paramètres</h2>
      <div className="bg-white p-4 rounded shadow space-y-4">
        <div>
          <label className="block font-semibold mb-1">Langue</label>
          <select className="w-full border rounded p-2">
            <option>Français</option>
            <option disabled>Anglais (bientôt)</option>
          </select>
        </div>
        <div>
          <label className="block font-semibold mb-1">Notifications</label>
          <input type="checkbox" checked readOnly className="mr-2" /> Activer les notifications (mock)
        </div>
        <div>
          <label className="block font-semibold mb-1">Thème</label>
          <select className="w-full border rounded p-2">
            <option>Clair</option>
            <option>Sombre</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
