import { jwtVerify } from "jose";
import { NextRequest } from "next/server";
import ValidateJwtToken from "./validate_jwt";
export default async function CheckToken(req: NextRequest) {

    const token = req.cookies.get('token')?.value;

    if (!token) {
        return false;
    }

    try {
        const validate = await ValidateJwtToken(token);
        if (!validate) {
            return false;
        } else {
            return validate;
        }
    } catch (err) {
        return false;
    }

}