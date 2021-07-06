import { User } from '../types';
import userImage from '../assets/img/profile-user.png';

type ListUserProps = {
  user: User;
};

function ListUserItem({ user }: ListUserProps) {
  return (
    <div className="flex items-center pb-3 mb-3 border-b border-gray-100 cursor-pointer">
      <img src={userImage} alt="user profile" className="w-5 mr-2" />
      {user.email}
    </div>
  );
}

function UserList() {
  const users = [{ email: 'david' }, { email: 'shaker' }, { email: 'stel' }];

  return (
    <div className="overflow-auto h-full w-4/12 border-l ">
      <div className="bg-gray-800">
        <h1 className="text-white uppercase text-sm p-4 text-center">test@gmail.com</h1>
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
