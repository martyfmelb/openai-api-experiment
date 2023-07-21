import { OpenAiMessages } from '@/types/OpenAiMessages';
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const postBody = await request.json() as { messages: OpenAiMessages };
  const messages = postBody.messages;

  const isAzure = `${process.env.OPENAI_API_ENDPOINT}`.includes("azure.com");
  const headers: Record<string, string> = !isAzure ? {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
    "OpenAI-Organization": "org-IHas545MzA37I7rtXXWZBQS1"
  } : {
    "Content-Type": "application/json",
    "api-key": `${process.env.OPENAI_API_KEY}`,
  };

  const res = await fetch(`${process.env.OPENAI_API_ENDPOINT}`, {
    "method": "POST",
    headers,
    body: JSON.stringify({
      "model": "gpt-3.5-turbo",
      "messages": messages,
      "temperature": 0.7
    })
  });

  const data = await res.json();

  return NextResponse.json({ data });
}
