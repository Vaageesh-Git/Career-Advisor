import { NextResponse } from "next/server";
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

export async function POST(request) {
    const {email,password} = await request.json();
    try {
        if (!email || !password){
            return NextResponse.json(
                {error : "All Fields Are Required"},
                {status : 401}
            )
        };

        const userData = await prisma.user.findUnique({
            where : {
                email
            }
        });

        if (!userData){
            return NextResponse.json(
                {error : "User Does Not Exists"},
                {status : 404}
            )
        }

        const isPasswordValid = await bcrypt.compare(password,userData.password)
        if (!isPasswordValid){
            return NextResponse.json(
                {error : "Incorrect Credentials"},
                {status : 401}
            )
        };

        const payload = {
            id : userData.id,
            email : userData.email
        }

        const secret = process.env.SECRET_KEY;

        const token = jwt.sign(payload,secret,{expiresIn : '1h'})
        return NextResponse.json(
            {token : token},
            {status : 200}
        );

    } catch(err) {
        return NextResponse.json(
            {error : err.message},
            {status : 500}
        )
    };
}