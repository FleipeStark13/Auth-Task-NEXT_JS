import { NextRequest, NextResponse } from "next/server";
import homeMessage from "@/services/homeMessage";
import jwt from 'jsonwebtoken';
import ValidateJwtToken from "@/app/handlers/validate_jwt";
export async function GET(req: NextRequest) {
    try {
        const token: any = req.cookies.get('token')?.value;

        if (!token) {
            return NextResponse.json(
                { error: "Canot get the user token."},
                { status: 401 }
            )
        }

        const validate = await ValidateJwtToken(token);
        if (!validate) {
            const response = NextResponse.json(
                { error: "Invalid token!" },
                { status: 401 },
            )
            response.cookies.delete('token');
            return response;
        }
        const { email }: any = validate;
        if (!email) {
            return NextResponse.json(
                { error: "Canot get the user email."},
                { status: 500 }
            )
        } else {

            const home_message = await homeMessage(email);
            if (!home_message) {
                console.error(`Cant get message: ${home_message}`)
                return NextResponse.json(
                    { error: "Can't get user message! "},
                    { status: 500}
                )
            }
            
            console.log(home_message)

            const response = NextResponse.json(
                { body: home_message },
                { status: 200 },
            )
            return response;
        }

    } catch (err) {
        console.log(err);
        return NextResponse.json(
            { error: "Server error!" },
            { status: 500 }
        )
    }
}