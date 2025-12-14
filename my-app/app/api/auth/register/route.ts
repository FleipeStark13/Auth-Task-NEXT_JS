import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';
import addUser, { checkUser } from '@/services/db';

interface IRequestBody {
    email: string;
    password: string;
}

export async function POST(req: NextRequest) {
    try {
        const { email, password }: IRequestBody = await req.json();
        
        const user = await checkUser(email);
        console.log(user);
        if (user) {
            return NextResponse.json({error: 'User already exist!'}, { status: 401});
        } else {
            const salt = await bcrypt.genSalt();
            const hashPassword = await bcrypt.hash(password, salt);
        
            const secret: any = process.env.NEXT_JWT_SECRET_KEY;
            const token = jwt.sign(
                { email: email},
                secret,
                { expiresIn: '1h' }
            )
        
            try {
                const data = {
                    email: email,
                    password: hashPassword
                }
                const res = await addUser(data);
                if (res) {
                    const response = NextResponse.json(
                        { message: "Success to login"},
                        { status: 200 },
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
                    const response = NextResponse.json(
                        { message: 'Cant create the user.' },
                        { status: 500 },
                    );
    
                    return response
                }
            } catch (err) {
                return NextResponse.json(
                    { error: 'Ocorreu um erro no servidor.' },
                    { status: 500 }
                )
            }
        }

    } catch (err) {
        return NextResponse.json(
            {error: 'Ocorreu um erro no servidor.'},
            {status: 500}
        )
    }
}