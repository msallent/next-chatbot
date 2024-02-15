'use client';

import { ChatBox } from '@/components/ChatBox';
import { ChatView } from '@/components/ChatView';
import { useChat } from '@/hooks/useChat';

export function ChatContainer() {
  const { message, messages, isLoading, handleChange, handleSubmit } = useChat();

  return (
    <>
      <ChatView messages={messages} />

      <ChatBox
        message={message}
        isLoading={isLoading}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </>
  );
}
