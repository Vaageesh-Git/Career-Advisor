import { NextResponse } from "next/server";
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

export async function POST(request){
    const {name,email,password} = await request.json();

    try{
        if (!name || !email || !password){
            return NextResponse.json(
                {error : "All Fields Are Required"},
                {status : 400}
            )
        };
        const userData = await prisma.user.findUnique({
            where : {
                email
            }
        });
        if (userData) {
            return NextResponse.json(
                {error : "User Already Exists"},
                {status : 409}
            )
        };
        const hashedPassword = await bcrypt.hash(password,10);
        const createUser = await prisma.user.create({
            data : {
                name : name,
                email : email,
                password : hashedPassword
            }
        });

        return NextResponse.json(
            {data : createUser},
            {status : 201}
        );
    } catch(err) {
        console.log(err)
        return NextResponse.json(
            {error : err,message},
            {status : 500}
        )
    };
}