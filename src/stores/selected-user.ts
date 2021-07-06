import create from 'zustand';
import { User } from '../types';

export type SelectedUser = User | null;

export type SelectedUserStore = {
  selectedUser: SelectedUser;
  setSelectedUser: (user: SelectedUser) => void;
};

export const useSelectedUser = create<SelectedUserStore>((set) => ({
  selectedUser: null,
  setSelectedUser: (user) => set({ selectedUser: user }),
}));
