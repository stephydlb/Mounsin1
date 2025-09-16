import React, { useState } from 'react';
import { useAppContext, User } from '@/contexts/AppContext';
import { usersApi } from '@/lib/api';

const ProfilePage: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const user = state.user;
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState<User>(user!);

  if (!user) return <div className="p-8">Aucun utilisateur connecté.</div>;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      const response = await usersApi.update(user.id, form);
      if (response.success && response.data) {
        dispatch({ type: 'SET_USER', payload: response.data as User });
        setEdit(false);
      } else {
        alert('Failed to update profile: ' + response.error);
      }
    }
  };

  return (
    <div className="max-w-xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6 text-green-700">Mon profil</h2>
      {edit ? (
        <form onSubmit={handleSave} className="space-y-4 bg-white p-4 rounded shadow">
          <div>
            <label className="block font-semibold mb-1">Prénom</label>
            <input name="firstName" value={form.firstName || ''} onChange={handleChange} className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block font-semibold mb-1">Nom</label>
            <input name="lastName" value={form.lastName || ''} onChange={handleChange} className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block font-semibold mb-1">Email</label>
            <input name="email" value={form.email || ''} onChange={handleChange} className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block font-semibold mb-1">Téléphone</label>
            <input name="phone" value={form.phone || ''} onChange={handleChange} className="w-full border rounded p-2" />
          </div>
          <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded font-bold">Enregistrer</button>
        </form>
      ) : (
        <div className="bg-white p-4 rounded shadow space-y-2">
          <div><span className="font-semibold">Prénom :</span> {user.firstName}</div>
          <div><span className="font-semibold">Nom :</span> {user.lastName}</div>
          <div><span className="font-semibold">Email :</span> {user.email}</div>
          <div><span className="font-semibold">Téléphone :</span> {user.phone}</div>
          <button onClick={() => setEdit(true)} className="mt-4 bg-blue-600 text-white px-6 py-2 rounded font-bold">Modifier</button>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
