import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value;
  const { pathname } = request.nextUrl;

  // Защищённые
  const protectedRoutes = ['/dashboard', '/expenses', '/categories', '/items'];
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

  // Публичные
  const authRoutes = ['/login', '/register'];
  const isAuthRoute = authRoutes.includes(pathname);

  const isHomePage = pathname === '/';

  // Если защищённый роут и нет токена → редирект на главную
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Если есть токен и пытается зайти на главную → редирект на dashboard
  if (isHomePage && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Если есть токен и пытается зайти на login/register → редирект на dashboard
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|assets).*)',
  ],
};
