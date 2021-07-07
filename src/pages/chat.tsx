import { useEffect } from 'react';
import { ActiveChat } from '../components/active-chat';
import { UserList } from '../components/user-list';
import socket from '../lib/socket';
import { useUsers } from '../stores/users';
import { SocketEvent, User } from '../types';

function Chat() {
  const { addToBlackListers, removeBlackListersFromUsers, setBlackListers } = useUsers();

  // handle situation where this user is blocked by another user
  useEffect(() => {
    socket.on(SocketEvent.BLOCKED, function (blacklister: User) {
      console.log('BLOCKEDDDDDD', blacklister);
      addToBlackListers(blacklister);
      removeBlackListersFromUsers();
    });

    return () => {
      socket.off(SocketEvent.BLOCKED);
    };
  }, [addToBlackListers, removeBlackListersFromUsers]);

  useEffect(() => {
    // load list of blacklisters on component mount
    socket.emit(SocketEvent.BLACK_LISTERS);

    socket.on(SocketEvent.BLACK_LISTERS, function (list: string[]) {
      console.log('BLACKLISTERSSSSS', list);
      setBlackListers(list);

      // remove all my blacklisters from my users list
      removeBlackListersFromUsers();
    });

    console.log('get blacklisters');
    return () => {
      socket.off(SocketEvent.BLACK_LISTERS);
    };
  }, [setBlackListers, removeBlackListersFromUsers]);

  return (
    <div className="flex items-center justify-center bg-gray-50 h-screen m-auto">
      <div className="w-8/12 bg-white h-full flex">
        <UserList />
        <ActiveChat />
      </div>
    </div>
  );
}

function ChatPage() {
  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  return <Chat />;
}

export { ChatPage };
