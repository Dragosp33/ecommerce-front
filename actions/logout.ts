'use server';

import { signOut } from '@/auth';
import { redirect } from 'next/navigation';

export const logout = async () => {
  await signOut();
};

export const SwitchAccounts = async () => {
  await signOut();
  //redirect('/auth/login?callbackUrl=localhost:3001');
};
