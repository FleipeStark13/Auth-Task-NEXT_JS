import { checkUser, getUser } from '@/services/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const { email, password} = await req.json();

        const hashPassword = await getUser(email, password);

        if (hashPassword) {
            const compare = await bcrypt.compare(password, hashPassword);

            if (compare) {

                const secret: any = process.env.NEXT_JWT_SECRET_KEY;
                const token = jwt.sign({email}, secret, {expiresIn: '1h'});

                const response = NextResponse.json(
                    {message: "Success to login"},
                    {status: 200},
                );

                response.cookies.set({
                    name: 'token',
                    value: token,
                    httpOnly: true,
                    path: '/',
                    maxAge: 60 * 60
                });

                return response;
            } else {
                NextResponse.json(
                    { message: 'Cant login'},
                    { status: 500 }
                )
            }
        };

    } catch (e) {
        console.log(e);
        return NextResponse.json(
            {message: "Success!"},
            {status: 200},
        )
    }
}