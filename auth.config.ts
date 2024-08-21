import bcrypt from 'bcryptjs';
import type { NextAuthConfig } from 'next-auth';
import Twitter from 'next-auth/providers/twitter';
import Google from 'next-auth/providers/google';
import GitHub from 'next-auth/providers/github';

import { LoginSchema } from '@/lib/schemas';
import { getUserByEmail } from '@/data/User';

const authConfig = {
  providers: [
    Google({
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      clientId: process.env.AUTH_GOOGLE_ID,
      allowDangerousEmailAccountLinking: true,
    }),
    GitHub({
      clientSecret: process.env.GITHUB_SECRET,
      clientId: process.env.GITHUB_ID,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  session: { strategy: 'jwt', maxAge: 60 * 60 * 24 * 7 },
  jwt: { maxAge: 60 * 60 * 24 },
  cookies: {
    sessionToken: {
      name:
        process.env.NODE_ENV == 'production'
          ? '__Secure-authjs.session-token'
          : `authjs.session-token`,
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production' ? true : false, // Ensure cookies are sent over HTTPS in production
        //sameSite: 'none', // Allow cookies to be sent cross-site
        domain:
          process.env.NODE_ENV === 'production'
            ? '.shop.dragospolifronie.com'
            : '.shop.localhost', // Adjust as needed for your domain
      },
    },
    /* csrfToken: {
      name:
        process.env.NODE_ENV == 'production'
          ? `__Host-authjs.csrf-token`
          : 'authjs.csrf-token',
      options: {
        httpOnly: true,
        // sameSite: 'lax',
        path: '/',
        secure: true,
        domain:
          process.env.NODE_ENV === 'production'
            ? '.shop.dragospolifronie.com'
            : '.shop.localhost', // Adjust as needed for your domain
      },
    },*/
  },
} satisfies NextAuthConfig;

export default authConfig;
