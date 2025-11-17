import { getGeminiPrompt } from "@/data/geminiPrompt";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(request) {
    try{
        const {answers} = await request.json();
        const prompt = getGeminiPrompt(answers);

        const model = genAi.getGenerativeModel({model : "gemini-2.5-flash"});
        const result = await model.generateContent(prompt)

        const json = result.response.text()
        console.log(json)
        return NextResponse.json(json)

    } catch(err){
        console.error("Gemini Error" , err)
    }
};