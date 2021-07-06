import classnames from 'classnames';
import { Message } from '../types';

type ChatMessageProps = {
  message: Message;
};

function ChatMessage({ message }: ChatMessageProps) {
  const user = { email: 'test@gmail.com' };
  const isOutgoingMessage = user.email === message.sender.email;

  return (
    <div
      className={classnames(
        'chat-message bg-white text-black rounded-md max-w-sm w-auto px-3 py-1',
        { 'outgoing-message': isOutgoingMessage, 'bg-blue-400 text-white': isOutgoingMessage }
      )}
    >
      {message.text}
    </div>
  );
}

export { ChatMessage };
