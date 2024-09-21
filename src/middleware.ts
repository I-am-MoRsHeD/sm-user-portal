import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// src > middleware.ts 

export function middleware(request: NextRequest) {
  
    const accessToken = request.cookies.get('accessToken')?.value
    if(!accessToken){
        return NextResponse.redirect(new URL('/auth/login', request.url))
    }
    if(accessToken){
        return NextResponse.next();
    }

}

export const config = {
    matcher: ['/user/:path*'],
    // matcher: ['/'],
}