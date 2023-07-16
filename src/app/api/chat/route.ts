import { OpenAiMessages } from '@/types/OpenAiMessages';
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const postBody = await request.json() as { messages: OpenAiMessages };
  const messages = postBody.messages;

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    "method": "POST",
    "headers": {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      "OpenAI-Organization": "org-IHas545MzA37I7rtXXWZBQS1"
    },
    body: JSON.stringify({
      "model": "gpt-3.5-turbo",
      "messages": messages,
      "temperature": 0.7
    })
  });

  const data = await res.json();

  return NextResponse.json({ data });
}
