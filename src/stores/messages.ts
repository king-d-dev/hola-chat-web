import create from 'zustand';
import { Message } from '../types';

type MessagesMapping = Record<string, Message>;

type Messages = {
  all: MessagesMapping;
  addMessage: (message: Message) => void;
  setMessages: (messages: Message[]) => void;
};

export const useMessages = create<Messages>((set) => ({
  all: {},
  addMessage: (message) =>
    set((state) => {
      return { all: { ...state.all, [message.clientId]: message } };
    }),
  setMessages: (messages) => {
    const _messages = messages.reduce(
      (prev, current) => ({ ...prev, [current.clientId]: current }),
      {}
    );

    set({ all: _messages });
  },
}));
