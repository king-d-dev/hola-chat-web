import create from 'zustand';

type AccessToeknState = {
  accessToken: string | null;
  setAccessToken: (token: string) => void;
};

export const useAccessToken = create<AccessToeknState>((set) => ({
  accessToken: null,
  setAccessToken: (token) => set({ accessToken: token }),
}));
