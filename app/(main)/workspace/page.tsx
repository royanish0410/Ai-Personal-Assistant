import React from 'react'
import AssistantList from './_components/AssistantList'
import AssistantSettings from './_components/AssistantSettings'
import ChatUi from './_components/ChatUi'

function Workspace() {
  return (
        <div className='h-screen fixed w-full'>
            <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 h-full'>
                <div className='hidden md:block md:col-span-1'>
                    {/*Assistant List */}
                    <AssistantList />
                </div>
                <div className='col-span-1 sm:col-span-3 md:col-span-4 lg:col-span-3'>
                    {/* Chat ui */}
                    <ChatUi />
                </div>
                <div className='hidden lg:block lg:col-span-1'>
                    {/*Settings */} 
                    <AssistantSettings />
                </div>
            </div>
        </div>
   )
}

export default Workspace