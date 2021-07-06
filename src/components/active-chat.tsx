import sendMessageImg from '../assets/img/email.png';
import { Message } from '../types';
import { ChatMessage } from './chat-message';

function ActiveChat() {
  const david = { email: 'david@gmail.com' };
  const parker = { email: 'parker@gmail.com' };

  const messages: Message[] = Array(5).fill({
    text: 'hello there',
    sender: david,
    recipient: parker,
    sentAt: 'today',
  });

  messages.unshift({
    ...messages[0],
    text: 'hey there, whats up',
    deliveredAt: 'now',
    sender: { email: 'test@gmail.com' },
  });

  return (
    <div className="active-chat w-full overflow-auto relative">
      <div className="px-4 h-full flex flex-col-reverse pb-20">
        {messages.map((msg) => (
          <ChatMessage message={msg} />
        ))}
      </div>

      <div className="send-message-container absolute bottom-0 p-4 flex w-full justify-between bg-gray-200">
        <input
          className="w-full text-xs rounded-2xl py-2 px-4 mr-2"
          type="text"
          placeholder="start typing here..."
        />
        <img src={sendMessageImg} alt="send message" className="w-6" />
      </div>
    </div>
  );
}

export { ActiveChat };
