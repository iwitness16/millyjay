import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow the shutdown page itself and its static assets through
  if (
    pathname === '/shutdown' ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/images/') ||
    pathname === '/favicon.ico' ||
    pathname === '/file.svg' ||
    pathname === '/globe.svg'
  ) {
    return NextResponse.next();
  }

  // Redirect every other route to the shutdown notice
  const url = request.nextUrl.clone();
  url.pathname = '/shutdown';
  return NextResponse.redirect(url, { status: 302 });
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
