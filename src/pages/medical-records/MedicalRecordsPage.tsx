import React, { useState } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const MedicalRecordsPage: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const records = state.medicalRecords;

  // Upload form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !file) return;
    setUploading(true);
    // Simulate upload and add to context
    setTimeout(() => {
      const newRecord = {
        id: Date.now().toString(),
        date: new Date().toISOString().slice(0, 10),
        type: 'test_result',
        doctorName: 'N/A',
        title,
        description,
        files: [{ name: file.name, url: URL.createObjectURL(file), type: file.type }],
        // Add dummy fields for Vaccination type compatibility
        name: '',
        batch: '',
        location: '',
      } as any;
      dispatch({ type: 'SET_MEDICAL_RECORDS', payload: [newRecord, ...records] });
      setTitle(''); setDescription(''); setFile(null); setUploading(false);
    }, 1000);
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6 text-green-700">Mes dossiers médicaux</h2>
      <form onSubmit={handleUpload} className="mb-8 bg-white p-4 rounded shadow space-y-4">
        <div>
          <label className="block font-semibold mb-1">Titre</label>
          <input type="text" className="w-full border rounded p-2" value={title} onChange={e => setTitle(e.target.value)} required />
        </div>
        <div>
          <label className="block font-semibold mb-1">Description</label>
          <textarea className="w-full border rounded p-2" value={description} onChange={e => setDescription(e.target.value)} />
        </div>
        <div>
          <label className="block font-semibold mb-1">Fichier</label>
          <input type="file" className="w-full" onChange={e => setFile(e.target.files?.[0] || null)} required />
        </div>
        <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded font-bold" disabled={uploading}>{uploading ? 'Envoi...' : 'Ajouter'}</button>
      </form>
      {records.length === 0 ? (
        <p className="text-gray-500">Aucun dossier médical trouvé.</p>
      ) : (
        <div className="space-y-4">
          {records.map(record => (
            <Card key={record.id}>
              <CardHeader>
                <CardTitle>{record.title}</CardTitle>
                <div className="text-sm text-gray-500">{record.date} — {record.type}</div>
              </CardHeader>
              <CardContent>
                <p className="mb-2">{record.description}</p>
                {record.files && record.files.length > 0 && (
                  <div className="mt-2">
                    <span className="font-semibold">Fichiers :</span>
                    <ul className="list-disc ml-6">
                      {record.files.map(file => (
                        <li key={file.url}>
                          <a href={file.url} download className="text-blue-600 underline">{file.name}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MedicalRecordsPage;
