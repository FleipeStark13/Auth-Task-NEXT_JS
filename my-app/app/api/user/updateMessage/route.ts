import { NextRequest, NextResponse } from "next/server";
import ValidateJwtToken from "@/app/handlers/validate_jwt";
import CheckToken from "@/app/handlers/checkToken";
import UpdateHomeMessage from "@/services/updateMessage";
export async function PUT(req: NextRequest) {
    try {
        const validate = await CheckToken(req);
        if (!validate) {
            return NextResponse.json(
                { error: "Unauthorized! "},
                { status: 401 }
            )
        } else {
            const { email }: any = validate;

            if (!email) {
                return NextResponse.json(
                    { error: "Can't get email! "},
                    { status: 500 }
                )   
            } else {
                let message: any = null;
                await req.json()
                .then((data) => {
                    message = Object.values(data)[0];
                })
                console.log(message);
                if (!message) {
                    return NextResponse.json(
                        {message: "Invalid message!"},
                        {status: 406}
                    )
                } else {
                    const updated = await UpdateHomeMessage(email, message);
                    if (!updated) {
                        console.log(updated)
                        return NextResponse.json(
                            {message: "Can't get data!"},
                            {status: 500},
                        )
                    } else {
                        return NextResponse.json(
                            {message: "Success update message!"},
                            {status: 200}
                        )
                    }
                }
            }
        }
    } catch (err) {
        return NextResponse.json(
            {message: "Internal server error!"},
            {status: 500},
        )
    }
}