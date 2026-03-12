import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const apiKey = process.env.GEMINI_API_KEY as string;
const ai = new GoogleGenAI({ apiKey });

export async function POST(req: NextRequest) {
  try {
    const { message, history, findings } = await req.json();

    const chat = ai.chats.create({
      model: "gemini-2.5-flash",
      history: history, 
      config: {
        systemInstruction: `You are a security assistant that helps users understand vulnerabilities found in their code. 
        Here are the findings: ${JSON.stringify(findings, null, 2)}. 
        Be concise and helpful.`,
      },
    });

    const result = await chat.sendMessage({ message });
    const response = result.text;

    return NextResponse.json({ response: response });
  } catch (error) {
    return NextResponse.json({ error: "Chat failed" }, { status: 500 });
  }
}
