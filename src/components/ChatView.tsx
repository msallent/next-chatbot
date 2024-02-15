import { useEffect, useRef } from 'react';
import { ChatMessage } from '@/components/ChatMessage';
import type { ChatSessionMessage } from '@/types/chat-session';

type ChatViewProps = {
  messages: Array<ChatSessionMessage>;
};

export function ChatView({ messages }: ChatViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const containerHeight = containerRef.current.scrollHeight;
      containerRef.current.scrollTo({ behavior: 'smooth', top: containerHeight });
    }
  }, [messages]);

  return (
    <div ref={containerRef} className="w-full flex-1 flex flex-col gap-4 overflow-auto">
      {messages.map((message, index) => (
        <ChatMessage key={index} message={message} />
      ))}
    </div>
  );
}
