import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

export async function POST(req: NextRequest) {
  const body = await req.json();

  if (!body.messages || !Array.isArray(body.messages)) {
    return NextResponse.json({ error: "Messages are required and should be an array." }, { status: 400 });
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: body.messages,
    });

    return NextResponse.json({
      response: response.choices[0]?.message?.content || "No response",
    });
  } catch (error) {
    console.error("Error from OpenAI:", error);
    return NextResponse.json({ error: "Failed to fetch response from OpenAI" }, { status: 500 });
  }
}
