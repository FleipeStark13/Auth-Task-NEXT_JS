import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

export default async function ValidateJwtToken(token: string | undefined) {
    if (!token) {
        return false;
    }

    try {
        const secret: any = process.env.NEXT_JWT_SECRET_KEY;
        const key = new TextEncoder().encode(secret);
        const res = await jwtVerify(token, key);

        if (res) {
            return res.payload;
        } else {
            return false;
        }
    } catch (error) {
        console.log(`Can't validate the token ${error}`);
        return false;
    }
}