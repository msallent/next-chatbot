'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';

export async function createUser(formData: FormData) {
  const name = formData.get('name') as string;

  try {
    const user = await prisma.user.create({ data: { name } });
    cookies().set('userId', String(user.id), { httpOnly: true });
  } catch (error) {
    console.error(error);
  }

  redirect('/chat');
}
