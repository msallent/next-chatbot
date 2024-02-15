import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ChatHeader } from '@/components/ChatHeader';
import { ChatContainer } from '@/components/ChatContainer';

export default function Chat() {
  const userId = cookies().get('userId');

  if (!userId?.value) {
    redirect('/');
  }

  return (
    <main className="h-full flex flex-col items-center justify-end gap-4 p-4">
      <ChatHeader page="chat" />
      <ChatContainer />
    </main>
  );
}
