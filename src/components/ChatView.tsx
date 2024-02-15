import { ChatMessage } from '@/components/ChatMessage';
import type { ChatSessionMessage } from '@/types/chat-session';

type ChatViewProps = {
  messages: Array<ChatSessionMessage>;
};

export function ChatView({ messages }: ChatViewProps) {
  return (
    <div className="w-full flex-1 flex flex-col gap-4 overflow-auto">
      {messages.map((message, index) => (
        <ChatMessage key={index} message={message} />
      ))}
    </div>
  );
}
