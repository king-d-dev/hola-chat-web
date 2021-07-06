import { SocketEvent, User } from '../types';
import userImage from '../assets/img/profile-user.png';
import { useSelectedUser } from '../stores/selected-user';
import { useEffect, useState } from 'react';
import socket from '../lib/socket';
import { useAuth0 } from '@auth0/auth0-react';

type ListUserProps = {
  user: User;
};

function ListUserItem({ user }: ListUserProps) {
  const { setSelectedUser } = useSelectedUser();

  return (
    <div
      onClick={() => setSelectedUser(user)}
      className="flex items-center pb-3 mb-3 border-b border-gray-100 cursor-pointer"
    >
      <img src={userImage} alt="user profile" className="w-5 mr-2" />
      <span className="overflow-ellipsis">{user.email}</span>
    </div>
  );
}

function UserList() {
  const auth0Context = useAuth0();
  const user = auth0Context.user!;
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    socket.on(SocketEvent.ACTIVE_USERS, function (activeUsers) {
      setUsers(activeUsers);
      console.log('ACTIVE USERS', activeUsers);
    });
    console.log('TOEKNE', socket.auth);

    return () => {
      socket.off(SocketEvent.ACTIVE_USERS);
    };
  }, []);

  return (
    <div className="overflow-auto h-full w-72 border-l ">
      <div className="bg-gray-800">
        <h1 className="text-white text-sm p-4 text-center overflow-ellipsis overflow-hidden">
          {user.email}
        </h1>
      </div>

      <div className="py-3 px-2">
        {users.map((user) => (
          <ListUserItem key={user.email} user={user} />
        ))}
      </div>
    </div>
  );
}

export { UserList };
