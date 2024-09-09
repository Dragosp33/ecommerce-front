import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { SessionProvider } from 'next-auth/react';
import { auth } from '@/auth';
import Navbar from '@/components/navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: '%s | Shift Settings',
    default: 'Authenticated',
  },
  description: 'Authenticated page',
  metadataBase: new URL(
    process.env.NEXTAUTH_URL || 'http://shop.localhost:3000'
  ),
  generator: 'Next.js',
  applicationName: 'Shop Shift',
  referrer: 'origin-when-cross-origin',
  keywords: [
    'Next.js',
    'React',
    'JavaScript',
    'auth.js',
    'mongodb',
    'next-auth',
    'Shopping',
    'Settings',
    'DPC',
    'Dashboard',
  ],
  authors: [{ name: 'Dragos Polifronie', url: 'https://github.com/Dragosp33' }],
  creator: 'Dragos Polifronie',
  publisher: 'Dragos Polifronie',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='relative flex min-h-screen flex-col bg-background'>
      <main className='flex-1 border-b'>
        <div className=' relative py-6 lg:py-8 md:mx-6'>{children}</div>
      </main>
    </div>
  );
}
