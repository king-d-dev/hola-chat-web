import { useAuth0 } from '@auth0/auth0-react';
import classnames from 'classnames';
import { Message } from '../types';

type ChatMessageProps = {
  message: Message;
};

function ChatMessage({ message }: ChatMessageProps) {
  const auth0Context = useAuth0();
  const user = auth0Context.user!;
  const isOutGoingMessage = user.email === message.sender;
  console.log('IIII', isOutGoingMessage);

  return (
    <div
      id={message.clientId}
      className={classnames(
        'chat-message bg-white text-black rounded-md max-w-sm w-auto px-3 py-1',
        { 'outgoing-message': isOutGoingMessage, 'bg-blue-400 text-white': isOutGoingMessage }
      )}
    >
      {message.text}
    </div>
  );
}

export { ChatMessage };
