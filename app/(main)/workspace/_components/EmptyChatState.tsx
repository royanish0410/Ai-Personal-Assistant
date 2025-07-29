import { BlurFade } from '@/components/magicui/blur-fade';
import { SparklesText } from '@/components/magicui/sparkles-text'
import { AssistantContext } from '@/context/AssistantContext';
import { ChevronRight } from 'lucide-react';
import React, { useContext } from 'react'

function EmptyChatState() {
    const { assistant, setAssistant } = useContext(AssistantContext);
  return (
    <div className='flex flex-col items-center px-2 sm:px-4 md:px-6'>
       <SparklesText className='text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center'>How Can I Assist You?</SparklesText>
       <div className='mt-4 sm:mt-5 md:mt-6 lg:mt-7 w-full max-w-4xl'>
            {assistant?.sampleQuestions.map((suggestion:string,index:number)=>(
                <BlurFade delay={0.25*index} key={suggestion}>
                <div key={index}>
                    <h2 className='p-2 sm:p-3 md:p-4 text-sm sm:text-base md:text-lg border mt-1 rounded-xl hover:bg-gray-100 cursor-pointer flex items-center justify-between gap-2 sm:gap-4 md:gap-6 lg:gap-10'
                        >{suggestion}
                        <ChevronRight className='w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 flex-shrink-0' />
                    </h2>
                </div>
                </BlurFade>
            ))}
        </div>
    </div>
  )
}

export default EmptyChatState