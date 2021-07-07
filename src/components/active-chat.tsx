import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect, useRef } from 'react';
import { nanoid } from 'nanoid';
import sendMessageImg from '../assets/img/email.png';
import socket from '../lib/socket';
import { useMessages } from '../stores/messages';
import { Message, SocketEvent, User } from '../types';
import { ChatMessage } from './chat-message';
import { useUsers } from '../stores/users';

type ActiveChatWrapperProps = { selectedUser: User };

function ActiveChatWrapper({ selectedUser }: ActiveChatWrapperProps) {
  const textFieldRef = useRef<HTMLInputElement>(null!);
  const auth0Context = useAuth0();
  const user = auth0Context.user!;
  const { all, addMessage, setMessages } = useMessages();
  const messages = Object.values(all).filter((msg) => {
    return (
      (msg.sender === selectedUser.email || msg.sender === user.email!) &&
      (msg.recipient === selectedUser.email || msg.recipient === user.email!)
    );
  });

  function blockUser() {
    socket.emit(SocketEvent.BLOCK_USER, selectedUser);
  }

  function scrollToBottom(elementID: string) {
    setTimeout(() => document.getElementById(elementID)?.scrollIntoView({ behavior: 'smooth' }), 5);
  }

  function sendChat() {
    const text = textFieldRef.current.value;
    if (!text.trim()) return;

    const messageToSend: Message = {
      clientId: nanoid(),
      text,
      sender: user.email!,
      recipient: selectedUser!.email,
      sentAt: new Date(),
    };

    socket.emit(SocketEvent.MESSAGE, messageToSend, (ack: any) => {
      console.log('Message has been sent to the socket server', ack);
    });
    addMessage(messageToSend);
    scrollToBottom(messageToSend.clientId);

    textFieldRef.current.value = '';
  }

  useEffect(() => {
    scrollToBottom('default-last-item');
  }, [messages]);

  useEffect(() => {
    socket.on(SocketEvent.MESSAGE, function (message: Message) {
      addMessage(message);
      scrollToBottom(message.clientId);
    });

    return () => {
      socket.off(SocketEvent.MESSAGE);
    };
  }, [addMessage, selectedUser]);

  useEffect(() => {
    socket.emit(SocketEvent.SELECTED_USER_MESSAGES, selectedUser);

    socket.on(SocketEvent.SELECTED_USER_MESSAGES, function (data) {
      setMessages(data);
    });

    return () => {
      socket.off(SocketEvent.SELECTED_USER_MESSAGES);
    };
  }, [selectedUser, setMessages]);

  return (
    <React.Fragment>
      {messages ? (
        <div className="messages-container overflow-auto relative w-full h-full">
          <div className="flex justify-end bg-white p-2 border-r fixed">
            <button onClick={blockUser} className="bg-red-500 rounded-md px-4 py-1 text-white">
              Block
            </button>
          </div>

          <div className="h-20"></div>

          <div className="messages px-4 flex flex-col pb-20 pt-6">
            {Object.values(messages).map((msg) => (
              <ChatMessage key={msg.clientId} message={msg} />
            ))}

            <div id="default-last-item"></div>
          </div>
        </div>
      ) : (
        <div className="h-full flex justify-center items-center">
          <h4 className="text-white">loading messages...</h4>
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendChat();
        }}
        className="send-message-container absolute bottom-0 p-4 flex w-full justify-between bg-gray-200"
      >
        <input
          ref={textFieldRef}
          className="w-full text-xs rounded-2xl py-2 px-4 mr-2"
          type="text"
          placeholder="start your hola here..."
        />
        <img onClick={sendChat} src={sendMessageImg} alt="send message" className="w-6" />
      </form>
    </React.Fragment>
  );
}

function ActiveChat() {
  const { selectedUser } = useUsers();

  return (
    <div className="active-chat w-full relative">
      {selectedUser === null ? (
        <div className="h-full flex justify-center items-center">
          <h4 className="text-white">select a user to start chatting 💬 with.</h4>
        </div>
      ) : (
        <ActiveChatWrapper selectedUser={selectedUser} />
      )}
    </div>
  );
}

export { ActiveChat };
