import create from 'zustand';
import { User } from '../types';

export type SelectedUser = User | null;

type UsersState = {
  users: Record<string, User>;
  selectedUser: SelectedUser;
  setSelectedUser: (user: User) => void;
  addUser: (user: User) => void;
  setUsers: (users: User[]) => void;
  removeUser: (email: string) => void;
};

export const useUsers = create<UsersState>((set) => ({
  users: {},
  selectedUser: null,
  addUser: (user) => set((state) => ({ users: { ...state.users, [user.email]: user } })),
  removeUser: (email) =>
    set((state) => {
      const _users = { ...state.users };
      delete _users[email];
      return { users: _users };
    }),
  setSelectedUser: (user) => set({ selectedUser: user }),
  setUsers: (users) => {
    const _users = users.reduce((prev, current) => ({ ...prev, [current.email]: current }), {});
    set({ users: _users });
  },
}));
