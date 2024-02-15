export type ChatSessionMessage = {
  role: 'user' | 'assistant';
  timestamp: number;
  message: string;
};
