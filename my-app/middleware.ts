import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
    const token = req.cookies.get('token')?.value;
    
    
    if (!token) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    try {
        const secret: any = process.env.NEXT_JWT_SECRET_KEY;
        const key = new TextEncoder().encode(secret);
        const res = await jwtVerify(token, key);
        if (res) {
            return NextResponse.next();
        } else {
            return NextResponse.redirect(new URL('/login', req.url));
        }

    } catch (e) {
        console.log(e);
        return NextResponse.redirect(new URL('/login', req.url));
    }
}

export const config = {
    matcher: '/dashboard',
}