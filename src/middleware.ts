import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

const privatePaths = ['/me']
const authPaths = ['/login', '/register']
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const {pathname} = request.nextUrl
  const sessionToken = request.cookies.get('sessionToken')?.value

  // neu chua login thi chuyen ve trang login
  if (privatePaths.some(path => pathname.startsWith(path)) && !sessionToken) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // neu login roi thi khong vao duoc trang register/login nua
  if (authPaths.some(path => pathname.startsWith(path)) && sessionToken) {
    return NextResponse.redirect(new URL('/me', request.url))
  }

  // return NextResponse.redirect(new URL('/home', request.url))
  return NextResponse.next()
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/me', '/login', '/register']
}
