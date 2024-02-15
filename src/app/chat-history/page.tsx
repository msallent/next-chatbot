import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { ChatHistory } from '@/components/ChatHistory';
import { ChatHeader } from '@/components/ChatHeader';
import { LinkButton } from '@/components/LinkButton';

export default async function History() {
  const userId = cookies().get('userId');

  if (!userId?.value) {
    redirect('/');
  }

  const chatSessions = await prisma.chatSession.findMany({
    where: { userId: Number(userId.value) },
  });

  return (
    <main className="h-full flex flex-col items-center p-4 gap-4">
      <ChatHeader page="history" />

      {chatSessions.length > 0 ? (
        <ChatHistory chatSessions={chatSessions} />
      ) : (
        <div className="flex flex-col items-center gap-2 my-auto">
          <span>No chat sessions exist yet.</span>
          <LinkButton href="/chat">Go back</LinkButton>
        </div>
      )}
    </main>
  );
}
