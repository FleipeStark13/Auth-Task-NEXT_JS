import { NextRequest, NextResponse } from "next/server";
import ValidateJwtToken from "@/app/handlers/validate_jwt";
export async function GET(req: NextRequest) {
    try {
        const token = req.cookies.get('token')?.value;

        if (!token) {
            return NextResponse.json(
                { message: "Invalid Token!"},
                { status: 401 },
            )
        } else {
            const validate = await ValidateJwtToken(token);
            if (validate) {
                return NextResponse.json(
                    { status: 200 }
                )
            } else {
                return NextResponse.json(
                    { message: "Can't get the token" },
                    { status: 401 }
                )
            }
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { error: "Can't get data, server error." },
            { status: 500 }
        )
    }
}