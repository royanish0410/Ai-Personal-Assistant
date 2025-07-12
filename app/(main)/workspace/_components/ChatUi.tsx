"use client"
import React, { useContext, useState } from 'react'
import EmptyChatState from './EmptyChatState'
import { AssistantContext } from '@/context/AssistantContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';

function ChatUi() {
    const [input,setInput] = useState<string>();
    const onSendMessage=()=>{

    }
  return (
    <div className='mt-20 p-6 relative h-[88vh]'>
        <EmptyChatState />
        <div className='flex justify-between p-5 gap-5 absolute bottom-5 w-[94%]'>
            <Input placeholder='Start Typing here...'
                onChange={(event)=>setInput(event.target.value)}
                onKeyPress={(e)=>e.key=='Enter'&&onSendMessage()}
            />
            <Button>
                <Send />
            </Button>
        </div>
    </div>
  )
}

export default ChatUi