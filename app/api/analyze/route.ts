import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const apiKey = process.env.GEMINI_API_KEY as string;

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

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

    const result = await model.generateContent(prompt);
    const response = result.response.text();

    return NextResponse.json({ analysis: response });
  } catch (error) {
    return NextResponse.json({ error: "Analysis failed" }, { status: 500 });
  }
}
