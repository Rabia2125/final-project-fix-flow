 import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { message } = await req.json();

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ success: true, reply: "Groq API Key not configured." }, { status: 200 });
    }

    const apiResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant', // <--- Yahan updated model name dal diya hai
        messages: [{ role: 'user', content: message }],
      }),
    });

    const data = await apiResponse.json();

    let reply = "Sorry, I couldn't get a response right now.";
    if (data && data.choices && data.choices[0]?.message?.content) {
      reply = data.choices[0].message.content;
    } else if (data.error) {
      console.error('Groq API Error:', data.error.message);
      reply = `API Error: ${data.error.message}`;
    }

    return NextResponse.json({ success: true, reply }, { status: 200 });
  } catch (error) {
    console.error('Server Error:', error.message);
    return NextResponse.json({ success: false, reply: "Network or server error occurred." }, { status: 500 });
  }
}