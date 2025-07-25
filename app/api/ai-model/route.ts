import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { provider, userInput } = await req.json();

  console.log("🧠 Provider:", provider);
  console.log("🧠 Input:", userInput);

  if (!provider || !userInput) {
    return NextResponse.json(
      { error: "Missing provider or userInput" },
      { status: 400 }
    );
  }

  try {
    // GEMINI
    if (provider === "gemini") {
      const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

      const payload = {
        contents: [{ role: "user", parts: [{ text: userInput }] }],
      };

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      console.log(result);
      const text =
        result?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
      return NextResponse.json({ text });
    }

    // OPENAI
    if (provider === "openai") {
      const OPENAI_API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
      const url = "https://api.openai.com/v1/chat/completions";

      const payload = {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: userInput }],
      };

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      
      const text = result?.choices?.[0]?.message?.content || "No response";
      return NextResponse.json({ text });
    }

    // GROQ
    if (provider === "groq") {
      const GROQ_API_KEY = process.env.NEXT_PUBLIC_GROQ_API_KEY;
      const url = "https://api.groq.com/openai/v1/chat/completions";

      const payload = {
        model: "mistral-saba-24b",
        messages: [{ role: "user", content: userInput }],
      };

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      
      
      
      const text = result?.choices?.[0]?.message?.content || "No response";
      return NextResponse.json({ text });
    }

    // MISTRAL
    if (provider === "mistral") {
      const MISTRAL_API_KEY = process.env.NEXT_PUBLIC_MISTRAL_API_KEY;
      const url = "https://api.mistral.ai/v1/chat/completions";

      const payload = {
        model: "mistral-small",
        messages: [{ role: "user", content: userInput }],
      };

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${MISTRAL_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      const text = result?.choices?.[0]?.message?.content || "No response";
      return NextResponse.json({ text });
    }

    // ANTHROPIC (Claude)
    if (provider === "anthropic") {
      const ANTHROPIC_API_KEY = process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY;
      const url = "https://api.anthropic.com/v1/messages";

      const payload = {
        model: "claude-3-opus-20240229",
        max_tokens: 1024,
        messages: [{ role: "user", content: userInput }],
      };

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "x-api-key": ANTHROPIC_API_KEY!,
          "anthropic-version": "2023-06-01",
          "Content-Type": "application/json",
        } as HeadersInit, // ✅ Fixes TypeScript header typing error
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      
      const text = result?.content?.[0]?.text || "No response";
      return NextResponse.json({ text });
    }

    return NextResponse.json(
      { error: `Provider '${provider}' is not supported.` },
      { status: 400 }
    );
  } catch (error) {
    console.error("❌ AI API error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
