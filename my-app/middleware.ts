import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";
import ValidateJwtToken from "./app/handlers/validate_jwt";
export default async function middleware(req: NextRequest) {
    const token = req.cookies.get('token')?.value;
    
    
    if (!token) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    try {

        const validate = await ValidateJwtToken(token);
        
        if (validate) {
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