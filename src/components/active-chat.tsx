import { useEffect, useState } from 'react';
import sendMessageImg from '../assets/img/email.png';
import socket from '../lib/socket';
import { useSelectedUser } from '../stores/selected-user';
import { Message, SocketEvent } from '../types';
import { ChatMessage } from './chat-message';

function ActiveChat() {
  const [messages, setMessages] = useState<Message[] | null>(null);
  const { selectedUser } = useSelectedUser();

  console.log('SSS', selectedUser);

  function fetchMessageHistory() {
    socket.emit(SocketEvent.GET_SELECTED_USER_MESSAGES);
  }

  useEffect(() => {
    fetchMessageHistory();
  }, [selectedUser]);

  useEffect(() => {
    socket.on(SocketEvent.GET_SELECTED_USER_MESSAGES, function (data) {
      console.log('GET SELECTED USER MESSAGES', data);
    });

    return () => {
      socket.off(SocketEvent.GET_SELECTED_USER_MESSAGES);
    };
  }, []);

  function renderContent() {
    if (messages)
      return (
        <div className="px-4 h-full flex flex-col-reverse pb-20">
          {messages.map((msg) => (
            <ChatMessage key={Math.random() * Math.random()} message={msg} />
          ))}
        </div>
      );
    else if (selectedUser === null)
      return (
        <div className="h-full flex justify-center items-center">
          <h4 className="text-white">select a user to start chatting 💬 with.</h4>
        </div>
      );
    else
      return (
        <div className="h-full flex justify-center items-center">
          <h4 className="text-white">loading messages...</h4>
        </div>
      );
  }

  return (
    <div className="active-chat w-full overflow-auto relative">
      {renderContent()}

      {selectedUser && (
        <div className="send-message-container absolute bottom-0 p-4 flex w-full justify-between bg-gray-200">
          <input
            className="w-full text-xs rounded-2xl py-2 px-4 mr-2"
            type="text"
            placeholder="start your hola here..."
          />
          <img src={sendMessageImg} alt="send message" className="w-6" />
        </div>
      )}
    </div>
  );
}

export { ActiveChat };
