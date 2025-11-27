import { NextResponse } from 'next/server';
const {PrismaClient, Prisma} = require('@prisma/client');
const prisma = new PrismaClient();
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";


export async function GET(request) {
    try{
        const { searchParams } = new URL(request.url);
        const q = searchParams.get("q")?.toLowerCase() || "";

        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;
        if (!token){
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        const userId = decoded.id

        const rec = await prisma.userRecommendation.findUnique({
            where : {
                userId
            }
        });

        if (!rec) {
            return NextResponse.json({ error: "No recommendations found" }, { status: 404 });
        };

        const filtered = rec.scholarshipMatches.filter((sch) => 
            sch.name?.toLowerCase().includes(q)
        )

        return NextResponse.json(filtered);

    } catch(err){
        return NextResponse.json( {error: err.message }, { status: 500 })
    }
}