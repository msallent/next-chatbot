import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createUser } from '@/app/actions';
import SendSVG from '@/assets/send.svg';

export default function Home() {
  const userId = cookies().get('userId');

  if (userId?.value) {
    redirect('/chat');
  }

  return (
    <main className="h-full flex flex-col justify-center items-center p-4">
      <form
        action={createUser}
        className="w-full flex items-center justify-center gap-2 p-4 border rounded-md border-neutral-800 bg-neutral-950"
      >
        <label htmlFor="name" className="border-b border-transparent">
          Welcome,
        </label>
        <input
          required
          autoFocus
          name="name"
          type="text"
          autoComplete="off"
          placeholder="what's your name?"
          className="outline-none bg-transparent border-b border-white/35 placeholder:text-white/35"
        />
        <button type="submit">
          <SendSVG aria-hidden="true" className="w-6 h-6 fill-white" />
          <span className="sr-only">Submit</span>
        </button>
      </form>
    </main>
  );
}
