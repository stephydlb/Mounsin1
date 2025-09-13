import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

const BOT_WELCOME = "Bonjour ! Je suis le bot santé. Posez-moi vos questions sur la plateforme ou la santé.";

const exampleQuestions = [
  "Comment prendre un rendez-vous ?",
  "Comment trouver une pharmacie proche ?",
  "Comment accéder à mes dossiers médicaux ?",
  "Quels sont les vaccins recommandés ?"
];

const OpenAIBotPopup: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ sender: 'bot', text: BOT_WELCOME }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  // Debug logs to trace behavior
  React.useEffect(() => {
    console.log('OpenAIBotPopup mounted')
  }, [])

  const sendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;
    console.log('sendMessage called, input=', input)
    setMessages(msgs => [...msgs, { sender: 'user', text: input }]);
    setLoading(true);
    // Appel réel à l'API OpenAI (remplacer la clé par une variable d'env côté backend ou proxy)
    try {
      const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
      if (!apiKey) {
        setMessages(msgs => [...msgs, { sender: 'bot', text: "Erreur : clé API OpenAI manquante (VITE_OPENAI_API_KEY)" }]);
        setLoading(false);
        return;
      }
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'Tu es un assistant médical pour la plateforme Mounsin. Réponds de façon claire et concise.' },
            ...messages.filter(m => m.sender !== 'bot').map(m => ({ role: 'user', content: m.text })),
            { role: 'user', content: input }
          ],
          max_tokens: 256,
          temperature: 0.7
        })
      });
      if (!res.ok) {
        throw new Error('Erreur API OpenAI');
      }
      const data = await res.json();
      const answer = data.choices?.[0]?.message?.content || "Je n'ai pas compris, peux-tu reformuler ?";
      setMessages(msgs => [...msgs, { sender: 'bot', text: answer }]);
    } catch (err) {
      setMessages(msgs => [...msgs, { sender: 'bot', text: "Erreur lors de la connexion à OpenAI." }]);
    }
    setLoading(false);
    setInput('');
  };

  return (
    <>
  <Button onClick={() => { console.log('open button clicked'); setOpen(true) }} className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 rounded-full w-16 h-16 shadow-lg flex items-center justify-center text-2xl">💬</Button>
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-80 bg-white rounded-lg shadow-xl border flex flex-col">
          <div className="p-3 border-b font-bold bg-blue-600 text-white rounded-t-lg flex justify-between items-center">
            Bot Santé
            <button onClick={() => setOpen(false)} className="text-white text-xl">×</button>
          </div>
          <div className="flex-1 p-3 space-y-2 overflow-y-auto max-h-80">
            {messages.map((msg, i) => (
              <div key={i} className={msg.sender === 'bot' ? 'text-left' : 'text-right'}>
                <span className={msg.sender === 'bot' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'} style={{borderRadius:8,padding:'6px 12px',display:'inline-block',marginBottom:4}}>{msg.text}</span>
              </div>
            ))}
            {loading && <div className="text-blue-500">Le bot réfléchit...</div>}
          </div>
          <form onSubmit={sendMessage} className="flex border-t">
            <input
              className="flex-1 p-2 outline-none"
              placeholder="Votre question..."
              value={input}
              onChange={e => setInput(e.target.value)}
              disabled={loading}
            />
            <Button type="submit" className="rounded-none" disabled={loading || !input.trim()}>Envoyer</Button>
          </form>
          <div className="p-2 text-xs text-gray-500 border-t bg-gray-50">
            Exemples :
            {exampleQuestions.map(q => (
              <button key={q} className="underline text-blue-600 ml-1" onClick={() => setInput(q)}>{q}</button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default OpenAIBotPopup;
