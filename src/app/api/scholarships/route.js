import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const body = await req.json();
    const scholarships = body.data?.scholarshipMatches ?? [];

    try{
        const limit = 8;
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;

        let paginatedData = scholarships.slice(startIndex, endIndex)

        if (body.filters.alpha){
            paginatedData = scholarships.slice(startIndex, endIndex).sort((a,b) => {
                return a.name.localeCompare(b.name);
            })
        }

        if (body.filters.country) {
            paginatedData = scholarships.slice(startIndex, endIndex).sort((a,b) => {
                return a.country.localeCompare(b.country);
            })
        }

        return NextResponse.json({
            page,
            totalPages: Math.ceil(scholarships.length / limit),
            totalItems: scholarships.length,
            items: paginatedData,
        });

    } catch(err){
        console.error(err);
        return NextResponse.json(
            { error: "Server Error" },
            { status: 500 }
        );
    }
}
