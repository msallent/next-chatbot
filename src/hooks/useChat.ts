import { ChangeEvent, useState } from 'react';
import { ChatSessionMessage } from '@/types/chat-session';

export function useChat() {
  const [isLoading, setIsLoading] = useState(false);
  const [chatSessionId, setChatSessionId] = useState<number | undefined>();
  const [messages, setMessages] = useState<Array<ChatSessionMessage>>([]);
  const [message, setMessage] = useState('');

  function handleChange(value: string) {
    setMessage(value);
  }

  async function handleSubmit(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    const userMessage: ChatSessionMessage = { role: 'user', timestamp: Date.now(), message };

    setMessage('');
    setMessages((messages) => [...messages, userMessage]);

    let sessionId = chatSessionId;

    if (!sessionId) {
      try {
        const response = await fetch('/api/chat-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });

        const data = await response.json();

        sessionId = data.id;
        setChatSessionId(sessionId);
      } catch (error) {
        console.error(error);
      }
    }

    try {
      const response = await fetch('/api/chat-session', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: sessionId, userMessage }),
      });

      const data = await response.json();
      setMessages(data.messages);
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  }

  return {
    message,
    messages,
    isLoading,
    handleChange,
    handleSubmit,
  };
}
