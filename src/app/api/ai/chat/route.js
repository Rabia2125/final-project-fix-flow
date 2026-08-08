import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { messages } = await req.json();
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ success: false, reply: "API Key not configured on server." }, { status: 500 });
    }

    const apiResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: messages,
      }),
    });

    const data = await apiResponse.json();
    let reply = "Sorry, I couldn't process that.";
    if (data.choices && data.choices[0]?.message?.content) {
      reply = data.choices[0].message.content;
    }

    return NextResponse.json({ success: true, reply }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, reply: "Server error occurred." }, { status: 500 });
  }
}