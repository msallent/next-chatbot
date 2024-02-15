import classNames from 'classnames';
import type { ChatSessionMessage } from '@/types/chat-session';

const chatRoleLabels: Record<ChatSessionMessage['role'], string> = {
  assistant: 'Assistant',
  user: 'You',
};

type ChatMessageProps = {
  message: ChatSessionMessage;
};

export function ChatMessage({ message: { role, message, timestamp } }: ChatMessageProps) {
  const sentDate = new Date(timestamp);
  const [hours, minutes] = sentDate.toTimeString().split(':');

  return (
    <div
      className={classNames(
        'max-w-[80%]',
        { 'self-end': role === 'user' },
        { 'self-start': role === 'assistant' }
      )}
    >
      <div className={classNames('text-xs italic my-1', { 'text-right': role === 'user' })}>
        {chatRoleLabels[role]} {`(${hours}:${minutes})`}
      </div>
      <div
        className={classNames(
          'p-4 rounded-md',
          { 'rounded-tr-none bg-[#00BF6F]': role === 'user' },
          { 'rounded-tl-none bg-neutral-700': role === 'assistant' }
        )}
      >
        {message}
      </div>
    </div>
  );
}
