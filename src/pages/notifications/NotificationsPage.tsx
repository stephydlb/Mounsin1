import React from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const NotificationsPage: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const notifications = state.notifications;

  const markAsRead = (id: string) => {
    dispatch({ type: 'MARK_NOTIFICATION_READ', payload: id });
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6 text-blue-700">Notifications</h2>
      {notifications.length === 0 ? (
        <p className="text-gray-500">Aucune notification.</p>
      ) : (
        <div className="space-y-4">
          {notifications.map(notif => (
            <Card key={notif.id} className={notif.read ? '' : 'border-blue-500'}>
              <CardHeader>
                <CardTitle>{notif.title}</CardTitle>
                <div className="text-sm text-gray-500">{notif.date} — {notif.type}</div>
              </CardHeader>
              <CardContent>
                <p className="mb-2">{notif.message}</p>
                {!notif.read && (
                  <button onClick={() => markAsRead(notif.id)} className="bg-blue-600 text-white px-4 py-1 rounded font-bold">Marquer comme lu</button>
                )}
                {notif.actionUrl && (
                  <a href={notif.actionUrl} className="ml-4 text-blue-600 underline">Voir plus</a>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;
