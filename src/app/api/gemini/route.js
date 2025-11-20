import { getGeminiPrompt } from "@/data/geminiPrompt";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

export async function POST(request) {
    try{
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        if (!token) {
            return NextResponse.json({ error: "Not logged in" }, { status: 401 })
        };

        const {answers} = await request.json();
        const prompt = getGeminiPrompt(answers);

        const model = genAi.getGenerativeModel({model : "gemini-2.5-flash"});
        const result = await model.generateContent(prompt)

        const text = await result.response.text();
        const cleanText = text
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        const json = JSON.parse(cleanText);
        console.log(json)

        const userId = decoded.id;

        const recommendation = await prisma.userRecommendation.upsert({
            where: {
                userId: userId,
            },
            update: {
                careerPathSummary: json.career_path_summary,
                recommendedJobs: json.recommended_jobs,
                recommendedLearning: json.recommended_learning_paths,
                progressInsights: json.progress_insights,
                scholarshipMatches: json.scholarship_matches,
                topPicks: json.top_picks
            },
            create: {
                userId: userId,
                careerPathSummary: json.career_path_summary,
                recommendedJobs: json.recommended_jobs,
                recommendedLearning: json.recommended_learning_paths,
                progressInsights: json.progress_insights,
                scholarshipMatches: json.scholarship_matches,
                topPicks: json.top_picks
            }
        });


        const updatedUser = await prisma.user.update({
            where : {
                id : userId
            },
            data : {
                hasCompletedOnboarding : true
            }
        })

        console.log(updatedUser)

        return NextResponse.json(json);

    } catch(err){
        console.error("Gemini Error" , err)
        return NextResponse.json({ error: err }, { status: 500 });
    }
};