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
                {status : 409}
            )
        };

        const payload = {
            id : userData.id,
            email : userData.email,
            name : userData.name
        }

        const secret = process.env.SECRET_KEY;

        const token = jwt.sign(payload, secret, { expiresIn : '1d' });


        const refreshToken = jwt.sign(
            { id: userData.id },
            process.env.REFRESH_KEY,
            { expiresIn: "7d" }
        );

        const response = NextResponse.json(
            { success: true, hasCompletedOnboarding : userData.hasCompletedOnboarding },
            { status : 200 }
        );

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60 * 24
        });

        response.cookies.set("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60 * 24 * 7
        });

        return response;

    } catch(err) {
        return NextResponse.json(
            {error : err.message},
            {status : 500}
        )
    };
};