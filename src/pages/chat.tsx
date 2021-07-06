import { useAuth0 } from '@auth0/auth0-react';
import { ActiveChat } from '../components/active-chat';
import { UserList } from '../components/user-list';
import { User } from '../types';

function ChatPage() {
  const auth0Context = useAuth0<User>();
  const user = auth0Context.user!;

  console.log('User', user);

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
