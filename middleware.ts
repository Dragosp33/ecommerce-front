// Optionally, don't invoke Middleware on some paths
import NextAuth from 'next-auth';

import {
  authApiPrefix,
  apiPrefix,
  publicRoutes,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
} from '@/routes';

import authConfig from './auth.config';

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;
  console.log('route: ', nextUrl.pathname);
  const callback = nextUrl.searchParams.get('callbackUrl');
  // console.log('LOGGED: ', isLoggedIn);
  const isApiRoute = nextUrl.pathname.startsWith(authApiPrefix);
  //const isApiRoute = nextUrl.pathname.startsWith(apiPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiRoute) {
    console.log('middleware is api auth route: ', nextUrl.pathname);
    return;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      //console.log('params: ', nextUrl.searchParams.getAll('callbackUrl'));
      console.log({ AUTHPath: nextUrl.pathname });
      if (
        process.env.ADMIN_DOMAIN_URL &&
        callback &&
        callback?.startsWith(process.env.ADMIN_DOMAIN_URL)
      ) {
        return Response.redirect(
          new URL(`/verify-session?callbackUrl=${callback}/dashboard`, nextUrl)
        );
      }
      console.log('REDIRECTED TO: ', DEFAULT_LOGIN_REDIRECT);
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return;
  }

  if (!isLoggedIn && !isPublicRoute) {
    let newURL = '/auth/login';
    if (callback) {
      newURL = newURL.concat(`?callback=${callback}`);
    }
    return Response.redirect(new URL(newURL, nextUrl));
  }
  return;
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
