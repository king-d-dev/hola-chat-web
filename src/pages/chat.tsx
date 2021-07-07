import { useEffect } from 'react';
import { ActiveChat } from '../components/active-chat';
import { UserList } from '../components/user-list';
import socket from '../lib/socket';

function ChatPage() {
  useEffect(() => {
    socket.connect();

    socket.onAny((event, ...args) => {
      console.log('Catch all', event, args);
    });

    return () => {
      socket.disconnect();
      socket.offAny();
    };
  }, []);

  return (
    <div className="flex items-center justify-center bg-gray-50 h-screen m-auto">
      <div className="w-8/12 bg-white h-full flex">
        <UserList />
        <ActiveChat />
      </div>
    </div>
  );
}

export { ChatPage };
