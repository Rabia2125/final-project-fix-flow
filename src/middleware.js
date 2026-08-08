import { NextResponse } from 'next/server';

export function middleware(request) {
  // Check karein ke user kis URL par ja raha hai
  const path = request.nextUrl.pathname;

  // Agar koi /admin ke path par ja raha hai
  if (path.startsWith('/admin')) {
    // Yahan cookie ya token check karein (jese aapki app mein token save hota hai)
    const token = request.cookies.get('token')?.value || request.cookies.get('next-auth.session-token')?.value;

    // Agar token nahi hai, toh usay foran home page par redirect kar dein
    if (!token) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

// Batayein ke middleware kahan kahan apply hona chahiye
export const config = {
  matcher: '/admin/:path*',
};