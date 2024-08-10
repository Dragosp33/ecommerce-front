import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
export async function GET(request: NextRequest) {
  //const response = NextResponse.json({ message: 'hey' });
  //const cookies = request.headers.get('cookie');
  const cookies = request.cookies.getAll();
  console.log('cookies sent: ', cookies);
  const response = NextResponse.redirect(
    `${process.env.ADMIN_DOMAIN_URL}/verified-session` ||
      'http://localhost:3001/verified-session',
    {
      status: 302,
    }
  );
  // Set a cookie
  response.cookies.set('myCookie', 'cookieValue', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });

  // Set the cookies from the request in the response
  cookies.forEach((cookie) => {
    response.cookies.set(cookie.name, cookie.value, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      //sameSite: 'none', // Allows the cookie to be sent cross-origin
      //maxAge: 60 * 60 * 24 * 7, // 1 week
    });
  });

  // Redirect to another site or page
  /*response.cookies.set(
    {
      
    }
  );*/
  response.headers.set(
    'Location',
    process.env.ADMIN_DOMAIN_URL || 'http://localhost:3001'
  );
  //response.

  //console.log(response);
  return response;

  //return response;
}
