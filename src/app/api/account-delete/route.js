import { NextResponse } from "next/server";
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

export async function DELETE(request) {
    try{
        const {email} = await request.json();

        await prisma.user.delete({
            where : {
                email
            }
        })

        return NextResponse.json({message : "Account Deleted Successfully"}, {status : 200})

    } catch(err){
        console.error(err)
        return NextResponse.json({message : "Error Deleting Account"}, {status : 500})

    }
}