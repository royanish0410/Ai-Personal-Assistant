"use client";

import React, { useState } from 'react'
import AssistantList from './_components/AssistantList'
import AssistantSettings from './_components/AssistantSettings'
import ChatUi from './_components/ChatUi'
import { Button } from "@/components/ui/button"
import { Menu, Settings, X } from "lucide-react"

function Workspace() {
  const [showAssistantList, setShowAssistantList] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  return (
    <div className='h-screen fixed w-full'>
      {/* Mobile Header */}
      <div className='md:hidden flex items-center justify-between p-3 bg-secondary border-b'>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowAssistantList(true)}
          className="flex items-center gap-2"
        >
          <Menu className="w-4 h-4" />
          Assistants
        </Button>
        
        <h1 className="font-semibold text-lg">AI Chat</h1>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowSettings(true)}
          className="flex items-center gap-2"
        >
          <Settings className="w-4 h-4" />
          Settings
        </Button>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 h-full md:h-full'>
        {/* Assistant List - Desktop: Always visible, Mobile: Slide-out panel */}
        <div className='hidden md:block md:col-span-1'>
          <AssistantList />
        </div>

        {/* Mobile Assistant List Overlay */}
        {showAssistantList && (
          <div className="md:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
            <div className="w-80 max-w-[85vw] h-full bg-white dark:bg-gray-900 transform transition-transform duration-300 ease-in-out">
              <div className="flex items-center justify-between p-3 border-b">
                <h2 className="font-semibold">Your Assistants</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAssistantList(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div className="h-[calc(100%-60px)]">
                <AssistantList />
              </div>
            </div>
          </div>
        )}

        {/* Chat UI - Takes full width on mobile, shared space on larger screens */}
        <div className='col-span-1 sm:col-span-3 md:col-span-4 lg:col-span-3 h-[calc(100vh-48px)] md:h-full'>
          <ChatUi />
        </div>

        {/* Settings - Desktop: Always visible, Mobile: Slide-out panel */}
        <div className='hidden lg:block lg:col-span-1'>
          <AssistantSettings />
        </div>

        {/* Mobile Settings Overlay */}
        {showSettings && (
          <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
            <div className="ml-auto w-80 max-w-[85vw] h-full bg-white dark:bg-gray-900 transform transition-transform duration-300 ease-in-out">
              <div className="flex items-center justify-between p-3 border-b">
                <h2 className="font-semibold">Settings</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowSettings(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div className="h-[calc(100%-60px)]">
                <AssistantSettings />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile overlay backdrop handlers */}
      {showAssistantList && (
        <div 
          className="md:hidden fixed inset-0 bg-transparent z-40"
          onClick={() => setShowAssistantList(false)}
        />
      )}
      {showSettings && (
        <div 
          className="lg:hidden fixed inset-0 bg-transparent z-40"
          onClick={() => setShowSettings(false)}
        />
      )}
    </div>
  )
}

export default Workspace