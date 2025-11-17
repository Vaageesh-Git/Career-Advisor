import { NextResponse } from 'next/server';

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
export async function GET(request) {
    try{
    const users = await prisma.user.findMany();
    return NextResponse.json(users)
    } catch(err){
        return NextResponse.json(
            {error : err},
            {success : false}
        )
    }
};