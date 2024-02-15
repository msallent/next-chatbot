import OpenAI from 'openai';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
import type { ChatSessionMessage } from '@/types/chat-session';

export async function POST() {
  const userId = cookies().get('userId');

  if (!userId?.value) {
    return Response.json({ message: 'Unauthorized.' }, { status: 401 });
  }

  const chatSession = await prisma.chatSession.create({
    data: {
      userId: Number(userId.value),
    },
  });

  return Response.json(chatSession);
}

export async function PATCH(request: Request) {
  const userId = cookies().get('userId');

  if (!userId?.value) {
    return Response.json({ message: 'Unauthorized.' }, { status: 401 });
  }

  if (!process.env.OPENAI_API_KEY) {
    return Response.json({ message: 'Missing OpenAI API Key.' }, { status: 403 });
  }

  const { id, userMessage } = await request.json();

  const chatSession = await prisma.chatSession.findUniqueOrThrow({ where: { id } });
  const messages = [...((chatSession.messages as Array<ChatSessionMessage>) || []), userMessage];

  const openAI = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const completions = await openAI.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: messages.map(({ role, message }) => ({ role, content: message })),
  });

  const assistantMessage = {
    role: completions.choices[0].message.role,
    message: completions.choices[0].message.content,
    timestamp: Date.now(),
  };

  const updatedChatSession = await prisma.chatSession.update({
    data: { messages: [...messages, assistantMessage] },
    where: { id },
  });

  return Response.json(updatedChatSession);
}
