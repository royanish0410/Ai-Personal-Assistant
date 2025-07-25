"use client"
import React, { useContext, useState } from 'react'
import EmptyChatState from './EmptyChatState'
import { AssistantContext } from '@/context/AssistantContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { Send, Bot, User } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

function ChatUi() {
  const [input, setInput] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { assistant } = useContext(AssistantContext);

  // Map display names to backend provider names
  const getProviderName = (modelName: string): string => {
    const modelMap: { [key: string]: string } = {
      'Groq Mistral': 'groq',
      'OpenAI GPT-3.5': 'openai',
      'Google Gemini': 'gemini',
      'Mistral AI': 'mistral',
      'Anthropic Claude': 'anthropic',
      // Add more mappings as needed based on your AiModelOptions
    };
    
    return modelMap[modelName] || modelName.toLowerCase();
  };

  const onSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setInput('');

    try {
      const response = await fetch('/api/ai-model', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          provider: getProviderName(assistant?.aiModelId || 'groq'),
          userInput: input
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.text,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Sorry, something went wrong. Please try again.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSendMessage();
    }
  };

  return (
    <div className='mt-20 p-6 relative h-[88vh] flex flex-col'>
      {/* Messages Container */}
      <div className='flex-1 overflow-y-auto mb-4 space-y-4'>
        {messages.length === 0 ? (
          <EmptyChatState />
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              className={`flex items-start gap-3 ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.role === 'assistant' && (
                <div className='w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center'>
                  <Bot className='w-4 h-4' />
                </div>
              )}
              
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground ml-auto'
                    : 'bg-muted'
                }`}
              >
                <p className='text-sm whitespace-pre-wrap'>{message.content}</p>
                <span className='text-xs opacity-70 mt-1 block'>
                  {message.timestamp.toLocaleTimeString()}
                </span>
              </div>

              {message.role === 'user' && (
                <div className='w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center'>
                  <User className='w-4 h-4' />
                </div>
              )}
            </div>
          ))
        )}
        
        {/* Loading indicator */}
        {isLoading && (
          <div className='flex items-start gap-3'>
            <div className='w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center'>
              <Bot className='w-4 h-4' />
            </div>
            <div className='bg-muted rounded-lg p-3'>
              <div className='flex space-x-1'>
                <div className='w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                <div className='w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:-0.15s]'></div>
                <div className='w-2 h-2 bg-current rounded-full animate-bounce'></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className='flex justify-between p-5 gap-5 border-t'>
        <Input 
          placeholder='Start Typing here...'
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
          className='flex-1'
        />
        <Button 
          onClick={onSendMessage} 
          disabled={isLoading || !input.trim()}
        >
          <Send className='w-4 h-4' />
        </Button>
      </div>
    </div>
  )
}

export default ChatUi