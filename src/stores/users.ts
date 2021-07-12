import create from 'zustand';
import { User } from '../types';

export type SelectedUser = User | null;

type UsersState = {
  users: Record<string, User>;
  blacklisters: string[] /** list of people who have blocked this user */;
  setBlackListers: (list: string[]) => void /** This function initialises the list defined above */;
  addToBlackListers: (
    user: User
  ) => void /** This function is for adding one user at a time to the blaclist */;
  removeBlackListersFromUsers: () => void /** This function removes those who have blacklisted this user from their list of users they can chat */;
  blacklist: string[] /** List of people this user has blocked */;
  setBlackList: (list: string[]) => void;
  selectedUser: SelectedUser;
  setSelectedUser: (user: User) => void;
  addUser: (user: User) => void;
  setUsers: (users: User[]) => void;
  removeUser: (email: string) => void;
  removeBlackListedUsers: () => void /** This function removes those that this user has blocked from this user's list of users he/she can chat with */;
  addToBlackList: (user: User) => void;
};

export const useUsers = create<UsersState>((set) => ({
  users: {},
  selectedUser: null,
  blacklisters: [],
  addToBlackListers: (user: User) =>
    set((state) => {
      return { blacklisters: [...state.blacklisters, user.email] };
    }),
  setBlackListers: (list: string[]) => set({ blacklisters: list }),
  removeBlackListersFromUsers: () =>
    set((state) => {
      const _users = { ...state.users };
      state.blacklisters.forEach((blacklister) => {
        delete _users[blacklister];
      });

      return { users: _users };
    }),
  blacklist: [],
  setBlackList: (list: string[]) => set({ blacklist: list }),
  addUser: (user) => set((state) => ({ users: { ...state.users, [user.email]: user } })),
  removeBlackListedUsers: () =>
    set((state) => {
      const _users = { ...state.users };
      state.blacklist.forEach((blacklistedUser) => {
        delete _users[blacklistedUser];
      });

      return { users: _users };
    }),
  addToBlackList: (user) =>
    set((state) => {
      const _blacklist = [...state.blacklist, user.email];

      return { blacklist: _blacklist };
    }),
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
