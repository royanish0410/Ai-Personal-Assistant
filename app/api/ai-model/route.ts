import { NextRequest, NextResponse } from "next/server";

type ProviderConfig = {
  apiKey: string | undefined;
  url: string;
  payload: any;
  headers: HeadersInit;
  getText: (result: any) => string;
};

function missingKeyError(provider: string) {
  return NextResponse.json(
    { error: `${provider} API key is missing.` },
    { status: 500 }
  );
}

async function doRequest(
  url: string,
  payload: any,
  headers: HeadersInit,
  getText: (result: any) => string
) {
  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });

  const result = await response.json();
  if (!response.ok) {
    return {
      error: true,
      status: response.status,
      details: result,
    };
  }
  const text = getText(result) || "No response";
  return { error: false, text };
}

export async function POST(req: NextRequest) {
  const { provider, userInput } = await req.json();

  if (!provider || !userInput) {
    return NextResponse.json(
      { error: "Missing provider or userInput" },
      { status: 400 }
    );
  }

  // Define set up for each provider
  let config: ProviderConfig | null = null;
  switch (provider) {
    case "gemini": {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      if (!apiKey) return missingKeyError("Gemini");
      config = {
        apiKey,
        url: `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        payload: {
          contents: [{ role: "user", parts: [{ text: userInput }] }],
        },
        headers: { "Content-Type": "application/json" },
        getText: (result) =>
          result?.candidates?.[0]?.content?.parts?.[0]?.text,
      };
      break;
    }
    case "openai": {
      const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
      if (!apiKey) return missingKeyError("OpenAI");
      config = {
        apiKey,
        url: "https://api.openai.com/v1/chat/completions",
        payload: {
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: userInput }],
        },
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        getText: (result) => result?.choices?.[0]?.message?.content,
      };
      break;
    }
    case "groq": {
      const apiKey = process.env.NEXT_PUBLIC_GROQ_API_KEY;
      if (!apiKey) return missingKeyError("Groq");
      config = {
        apiKey,
        url: "https://api.groq.com/openai/v1/chat/completions",
        payload: {
          model: "mistral-saba-24b",
          messages: [{ role: "user", content: userInput }],
        },
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        getText: (result) => result?.choices?.[0]?.message?.content,
      };
      break;
    }
    case "anthropic": {
      const apiKey = process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY;
      if (!apiKey) return missingKeyError("Anthropic");
      config = {
        apiKey, 
        url: `https://api.anthropic.com/v1/messages`,
        payload: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1024,
          messages: [
            { role: 'user', content: 'Hello, world' }
          ]
        }),
        headers: {
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
          "content-type": "application/json",
        },
        getText: (result) => result?.content?.[0]?.text || "No response"
      };
      break;
    }
    default:
      return NextResponse.json(
        { error: `Provider '${provider}' is not supported.` },
        { status: 400 }
      );
  }

  try {
    const resp = await doRequest(
      config.url,
      config.payload,
      config.headers,
      config.getText
    );

    if (resp.error) {
      return NextResponse.json(
        { error: `API request failed`, details: resp.details },
        { status: resp.status }
      );
    }

    return NextResponse.json({ text: resp.text }, { status: 200 });
  } catch (error: any) {
    console.error("❌ AI API error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
