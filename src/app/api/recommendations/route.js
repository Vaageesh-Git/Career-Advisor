import { NextResponse } from "next/server";
const jwt = require('jsonwebtoken');
import { cookies } from "next/headers";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(request) {
    try{
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

        return NextResponse.json(rec);

    } catch(err){
        console.log("Fetch Recommendation Error:", err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
};