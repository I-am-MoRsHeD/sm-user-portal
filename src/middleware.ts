import { jwtDecode } from 'jwt-decode';
import { getToken } from 'next-auth/jwt';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const roleBasedPrivateRoutes = {
    USER: [/^\/dashboard\/user/],
    AGENT: [/^\/dashboard\/agent/],
    ADMIN: [/^\/dashboard\/admin/],
    SUPER_ADMIN: [/^\/dashboard\/super_admin/],
};

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const accessToken = request.cookies.get('accessToken')?.value;

    if (!accessToken) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }
    let decodedData = null;
    if (accessToken) {
        decodedData = jwtDecode(accessToken) as any;
    }
    const role = decodedData?.role;
    type Role = keyof typeof roleBasedPrivateRoutes;

    if (roleBasedPrivateRoutes[role as Role]) {
        const routes = roleBasedPrivateRoutes[role as Role];
        if (routes.some((route) => pathname.match(route))) {
            return NextResponse.next();
        }
    }

    return NextResponse.redirect(new URL('/user/dashboard', request.url));
}

export const config = {
    matcher: ['/user/:path*', '/dashboard/:path*'],
};
