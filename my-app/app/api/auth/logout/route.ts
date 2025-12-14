import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
    try {        
        let response =  NextResponse.json(
            { message: "Success Log out" },
            { status: 200 }
        )

        response.cookies.delete('token');

        return response;    

    } catch (e) {
        return NextResponse.json(
            { message: "Can't delete the json. "},
            { status: 500 }
        )
    }
}