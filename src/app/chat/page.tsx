'use client';

import { ChatBox } from '@/components/ChatBox';
import { ChatHeader } from '@/components/ChatHeader';
import { ChatView } from '@/components/ChatView';
import { useChat } from '@/hooks/useChat';

export default function Chat() {
  const { message, messages, isLoading, handleChange, handleSubmit } = useChat();

  return (
    <main className="h-full flex flex-col items-center justify-end gap-4 p-4">
      <ChatHeader page="chat" />

      <ChatView messages={messages} />

      <ChatBox
        message={message}
        isLoading={isLoading}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </main>
  );
}
