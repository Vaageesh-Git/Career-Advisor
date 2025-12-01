import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();
import jwt from "jsonwebtoken";


export async function PATCH(request) {
    const data = await request.json();
    const existingEmail = data.existingEmail
    const updatedEmail = data.updatedEmail

    try{
        const userData = await prisma.user.findUnique({
            where : {
                email : updatedEmail
            }
        });

        if (userData) {
            return NextResponse.json({message : "Email Already Registered With Another Account"}, {status : 409})
        }

        const updated = await prisma.user.update({
            where : {
                email : existingEmail
            },
            data : {
                email : updatedEmail
            }
        });

        const newToken = jwt.sign(
            {
                id: updated.id,
                email: updated.email,
            },
            process.env.SECRET_KEY,
            { expiresIn: "1h" }
        );


        const response = NextResponse.json({message : "Updated Successfully", data : updated}, {status : 200})

        response.cookies.set("token", newToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60 * 24,
        });
        return response
    } catch (err){
        console.log(err)
        return NextResponse.json({message : "Internal Server Error"}, {status : 500})
    }


}