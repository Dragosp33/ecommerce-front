import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import Footer from '@/components/footer';
import { auth } from '@/auth';
import { SessionProvider } from 'next-auth/react';
import Navbar from '@/components/navbar';
import { CartContextProvider } from '@/hooks/cart-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: '%s | Shift',
    default: 'Shop Shift',
  },
  description: 'Shifting Shopping Experience',
  metadataBase: new URL(
    process.env.NEXTAUTH_URL_INTERNAL || 'http://shop.localhost:3000'
  ),
  generator: 'Next.js',
  applicationName: 'Shop Shifting',
  referrer: 'origin-when-cross-origin',
  keywords: [
    'Shopping',
    'Shop Shift',
    'Customizable',
    'Shop',
    'Shift Shopping',
    'Shift Shop',
    'Next.js',
    'React',
    'JavaScript',
    'auth.js',
    'mongodb',
    'next-auth',

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <SessionProvider session={session}>
          <CartContextProvider>
            <ThemeProvider
              attribute='class'
              defaultTheme='system'
              enableSystem
              disableTransitionOnChange
            >
              <Navbar />

              {children}
            </ThemeProvider>
          </CartContextProvider>
        </SessionProvider>
        <Footer />
      </body>
    </html>
  );
}
