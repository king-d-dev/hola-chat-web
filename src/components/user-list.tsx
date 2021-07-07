import { SocketEvent, User } from '../types';
import classnames from 'classnames';
import userImage from '../assets/img/profile-user.png';
import { useUsers } from '../stores/users';
import { useEffect } from 'react';
import socket from '../lib/socket';
import { useAuth0 } from '@auth0/auth0-react';

type ListUserProps = {
  user: User;
};

function ListUserItem({ user }: ListUserProps) {
  const { setSelectedUser, selectedUser } = useUsers();

  return (
    <div
      onClick={() => setSelectedUser(user)}
      className={classnames(
        'list-user flex items-center pb-3 mb-3 border-b border-gray-100 cursor-pointer py-3 px-2',
        {
          active: selectedUser?.email === user.email,
        }
      )}
    >
      <img src={userImage} alt="user profile" className="w-5 mr-2" />
      <span className="overflow-ellipsis overflow-hidden">{user.email}</span>
    </div>
  );
}

function UserList() {
  const auth0Context = useAuth0();
  const user = auth0Context.user!;
  const { users, addUser, setUsers } = useUsers();
  // const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    socket.on(SocketEvent.NEW_USER_CONNECTED, function (newUser: User) {
      // if new connection is from the same user but a different device do not add them to the list
      if (user.email === newUser.email) return;

      addUser(newUser);
    });

    return () => {
      socket.off(SocketEvent.NEW_USER_CONNECTED);
    };
  }, [users, addUser, user]);

  useEffect(() => {
    socket.on(SocketEvent.ACTIVE_USERS, function (activeUsers) {
      setUsers(activeUsers);
    });

    return () => {
      socket.off(SocketEvent.ACTIVE_USERS);
    };
  }, [setUsers]);

  return (
    <div className="overflow-auto h-full w-72 border-l ">
      <div className="bg-gray-800">
        <h1 className="text-white text-sm p-4 text-center overflow-ellipsis overflow-hidden">
          {user.email}
        </h1>
      </div>

      <div className="h-4"></div>

      <div className="">
        {Object.values(users).map((user) => (
          <ListUserItem key={user.email} user={user} />
        ))}
      </div>
    </div>
  );
}

export { UserList };
