"use client";
import React, { useContext, useState } from "react";
import EmptyChatState from "./EmptyChatState";
import { AssistantContext } from "@/context/AssistantContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Bot, User } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { AuthContext } from "@/context/AuthContext";
import { ASSISTANT } from "../../ai-assistants/page";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const MODEL_MAP: Record<string, string> = {
  "groq mistral": "groq",
  "openai gpt-3.5": "openai",
  "google gemini": "gemini",
  "gemini 1.5 flash": "gemini",
  "google: gemini 1.5 flash": "gemini",
  "mistral: saba": "mistral",
  "anthropic claude": "anthropic",
};

function normalizeModelName(name: string): string {
  return name.trim().toLowerCase();
}

function ChatUi() {
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { assistant } = useContext(AssistantContext);
  const { user, setUser } = useContext(AuthContext);
  const UpdateTokens = useMutation(api.users.UpdateTokens);

  // Map UI model names (case-insensitive) to backend provider keys
  const getProviderName = (modelName: string): string => {
    const normalized = normalizeModelName(modelName);
    return MODEL_MAP[normalized] || normalized;
  };

  // Calculate token count simply by whitespace splitting (can replace with tokenizer lib if needed)
  const updateUserToken = async (responseText: string) => {
    if (!user) return;
    const tokenCount = responseText.trim() ? responseText.trim().split(/\s+/).length : 0;
    const newCredits = Math.max(0, (user.credits || 0) - tokenCount);

    try {
      await UpdateTokens({
        credits: newCredits,
        uid: user._id,
      });
      setUser((prev: ASSISTANT) => ({
        ...prev,
        credits: newCredits,
      }));
    } catch (err) {
      console.error("Failed to update user tokens:", err);
    }
  };

  const onSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setInput("");

    try {
      const providerKey = getProviderName(assistant?.aiModelId || "groq");

      const response = await fetch("/api/ai-model", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          provider: providerKey,
          userInput: input,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errMsg = data.error || "Something went wrong.";
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: `🤖 Error: ${errMsg}${data.details ? " - " + JSON.stringify(data.details) : ""}`,
            timestamp: new Date(),
          },
        ]);
        setIsLoading(false);
        return;
      }

      const assistantMessage: Message = {
        role: "assistant",
        content: data.text,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);

      await updateUserToken(data.text);
    } catch (error: any) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, something went wrong. Please try again.",
          timestamp: new Date(),
        },
      ]);
      console.error("Error in onSendMessage:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSendMessage();
    }
  };

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-900" style={{ minHeight: '100%' }}>
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 space-y-2" style={{ height: 'calc(100% - 80px)' }}>
        {messages.length === 0 ? (
          <EmptyChatState />
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              className={`flex items-start gap-2 ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {message.role === "assistant" && (
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-3 h-3" />
                </div>
              )}
              <div
                className={`max-w-[85%] rounded-lg p-2 ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground ml-auto"
                    : "bg-muted"
                }`}
              >
                <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
                <span className="text-xs opacity-70 mt-1 block">
                  {message.timestamp.toLocaleTimeString()}
                </span>
              </div>
              {message.role === "user" && (
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <User className="w-3 h-3" />
                </div>
              )}
            </div>
          ))
        )}
        {/* Loading indicator */}
        {isLoading && (
          <div className="flex items-start gap-2">
            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Bot className="w-3 h-3" />
            </div>
            <div className="bg-muted rounded-lg p-2">
              <div className="flex space-x-1">
                <div className="w-1.5 h-1.5 bg-current rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-1.5 h-1.5 bg-current rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-1.5 h-1.5 bg-current rounded-full animate-bounce"></div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Input Area - Fixed at bottom with explicit height */}
      <div 
        className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 p-3 sm:p-4" 
        style={{ height: '80px', minHeight: '80px' }}
      >
        <div className="flex gap-2 h-full items-center">
          <Input
            placeholder="Start Typing here..."
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            className="flex-1 text-sm h-10"
          />
          <Button 
            onClick={onSendMessage} 
            disabled={isLoading || !input.trim()} 
            className="px-3 h-10 w-12 flex-shrink-0"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ChatUi;