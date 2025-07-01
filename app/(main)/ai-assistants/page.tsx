import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import AiAssistantsList from '@/services/AiAssistantsList'
import Image from 'next/image'
import React from 'react'

function AIAssistants() {
  
  return (
    <div className='px-10 mt-20 md:px-28 lg:px-36 xl:px-48'>
      <div className='flex justify-between items-center'>
        <div>
          <h2 className='text-3xl font-bold'>Welcome to the World of AI Assistants 🤖</h2>
          <p className='text-xl mt-2'>Choose your AI companion to Simplify Your Tasks 🚀</p>
        </div>
        <Button>Continue</Button>
      </div>

      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-5'>
        {AiAssistantsList.map((assistant, index) => (
          <div
            key={assistant.id || index}
            className='hover:border p-3 rounded-xl hover:scale-105 transition-all ease-in-out cursor-pointer relative'
          >
            <Checkbox className='absolute m-2' />
            <Image
              src={assistant.image}
              alt={assistant.name}
              width={600}
              height={600}
              className='rounded-xl w-full h-[200px] object-cover'
            />
            <h2 className='text-center font-bold text-lg'>{assistant.name}</h2>
            <h2 className='text-center text-gray-600 dark:text-gray-300'>{assistant.title}</h2>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AIAssistants
