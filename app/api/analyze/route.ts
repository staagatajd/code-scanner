import Groq from "groq-sdk";
//import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

// const apiKey = process.env.GEMINI_API_KEY as string;
// const ai = new GoogleGenAI({ apiKey });

const client = new Groq({ apiKey: process.env.GROQ_API_KEY as string });

export async function POST(req: NextRequest) {
  try {
    const { findings } = await req.json();

    const prompt = `You are a security expert reviewing a static code analysis report.

    Here are the vulnerabilities found:



    ${JSON.stringify(findings, null, 2)}



    For each finding, provide:

    1. A brief explanation of why it's dangerous

    2. A specific code fix



    Be concise and practical.`;

    // const result = await ai.models.generateContent({
    //   model: "gemini-2.5-flash",
    //   contents: prompt,
    // });

    //const response = result.text;

    const result = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
    });

    const response = result.choices[0].message.content;

    return NextResponse.json({ analysis: response });
  } catch (error: any) {
    if (error.status === 429) {
      return NextResponse.json(
        { error: "API Limit reached. Try again in a bit!" },
        { status: 429 },
      );
    }
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
