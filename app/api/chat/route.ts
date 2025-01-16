import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

export async function POST(req: NextRequest) {
  const origin = req.headers.get("origin");
  const allowedOrigin = ["http://localhost:3000", "https://scarlet7.net"];

  if (!origin || !allowedOrigin.includes(origin)) {
    return NextResponse.json(
      { error: "CORS policy does not allow access from this origin." },
      { status: 403 }
    );
  }

  const body = await req.json();

  if (!body.messages || !Array.isArray(body.messages)) {
    return NextResponse.json(
      { error: "Messages are required and should be an array." },
      { status: 400 }
    );
  }

  console.log("Received messages:", body.messages);

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: body.messages,
    });

    return NextResponse.json(
      {
        response: response.choices[0]?.message?.content || "No response",
      },
      {
        headers: {
          "Access-Control-Allow-Origin": origin, // リクエスト元を許可
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      }
    );
  } catch (error) {
    console.error("Error from OpenAI:", error);
    return NextResponse.json(
      { error: "Failed to fetch response from OpenAI" },
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": origin,
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      }
    );
  }
}

export async function OPTIONS(req: NextRequest) {
  const origin = req.headers.get("origin");
  const allowedOrigin = ["http://localhost:3000", "https://scarlet7.net"];

  if (!origin || !allowedOrigin.includes(origin)) {
    return NextResponse.json(
      { error: "CORS policy does not allow access from this origin." },
      { status: 403 }
    );
  }

  return NextResponse.json(
    {},
    {
      headers: {
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    }
  );
}
