import { NextResponse, NextRequest } from 'next/server';
import { jwtVerify } from 'jose';
export async function middleware(request: NextRequest) {
  const MyToken = request.cookies.get('MyToken');

  if (MyToken === undefined) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    const { payload } = await jwtVerify(
      MyToken.value,
      new TextEncoder().encode('ASODFNASIOPFNIOASNFIOASN123134ASNIOF')
    );
    return NextResponse.next();
  } catch (err) {
    console.error(err);

    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/profile', '/match'],
};
