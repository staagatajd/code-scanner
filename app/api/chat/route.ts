//import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const client = new Groq({ apiKey: process.env.GROQ_API_KEY });
// const apiKey = process.env.GEMINI_API_KEY as string;
// const ai = new GoogleGenAI({ apiKey });

export async function POST(req: NextRequest) {
  try {
    const { message, history, findings } = await req.json();

    const result = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: `You are a security assistant that helps users understand vulnerabilities found in their code.
                    Here are the scan findings: ${JSON.stringify(findings, null, 2)}.

                    Response rules:
                  - Use markdown formatting since the UI renders it properly
                  - Use **bold** for vulnerability names and important terms
                  - Use bullet points for lists of fixes or multiple points
                  - Be concise and direct, 3-5 sentences max unless the user asks for more detail
                  - Focus on what the specific finding means and how to fix it
                  - Keep a professional but approachable tone`,
        },
        // spread previous history if it exists
        {
          role: "user",
          content: message,
        },
      ],
    });

    //const result = await chat.sendMessage({ message });
    const response = result.choices[0].message.content;

    //const response = result.text;

    return NextResponse.json({ response: response });
  } catch (error) {
    return NextResponse.json({ error: "Chat failed" }, { status: 500 });
  }
}
