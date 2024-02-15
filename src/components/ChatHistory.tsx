'use client';

import { useState } from 'react';
import classNames from 'classnames';
import type { ChatSession } from '@prisma/client';
import { ChatMessage } from '@/components/ChatMessage';
import type { ChatSessionMessage } from '@/types/chat-session';

type ChatHistoryProps = {
  chatSessions: Array<ChatSession>;
};

export function ChatHistory({ chatSessions }: ChatHistoryProps) {
  const [selectedSessionId, setSelectedSessionId] = useState<number | undefined>();
  const selectedSession = chatSessions.find((chatSession) => chatSession.id === selectedSessionId);

  return (
    <>
      <div className="w-full max-h-48 flex flex-col items-center justify-between shrink-0 overflow-auto border rounded-md border-neutral-800 bg-neutral-950">
        {chatSessions.map((chatSession, index) => (
          <button
            key={chatSession.id}
            className={classNames('w-full p-4', {
              'bg-neutral-700': chatSession.id === selectedSessionId,
              'border-b border-neutral-800': index + 1 !== chatSessions.length,
            })}
            onClick={() => setSelectedSessionId(chatSession.id)}
          >
            <div className="flex flex-col items-start">
              <span>Chat Session #{index + 1}</span>
              <span className="text-xs text-gray-400">
                Started: {chatSession.createdAt.toLocaleString()}
              </span>
              <span className="text-xs text-gray-400">
                Last updated: {chatSession.updatedAt?.toLocaleString()}
              </span>
            </div>
          </button>
        ))}
      </div>

      {selectedSession ? (
        <div className="flex flex-col w-full gap-4 overflow-auto">
          {((selectedSession.messages as Array<ChatSessionMessage>) || []).map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
        </div>
      ) : (
        <span>Please select a session to view chat history.</span>
      )}
    </>
  );
}
