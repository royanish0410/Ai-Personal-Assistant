"use client";

import React, { useState } from "react";
import AssistantList from "./_components/AssistantList";
import AssistantSettings from "./_components/AssistantSettings";
import ChatUi from "./_components/ChatUi";
import { Button } from "@/components/ui/button";
import { Menu, Settings, X } from "lucide-react";

function Workspace() {
  const [showAssistantList, setShowAssistantList] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  return (
    // Added flex flex-col so children distribute height properly
    <div className="h-screen fixed w-full flex flex-col">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-3 bg-secondary border-b">
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

      {/* Main Content Area */}
      <div
        className="md:h-full flex flex-col flex-1" // Added flex-1 for grow
        style={{ height: "calc(100vh - 48px)" }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 h-full">
          <div className="hidden md:block md:col-span-1">
            <AssistantList />
          </div>

          <div className="col-span-1 sm:col-span-3 md:col-span-4 lg:col-span-3 h-full">
            <ChatUi />
          </div>

          <div className="hidden lg:block lg:col-span-1">
            <AssistantSettings />
          </div>
        </div>
      </div>

      {/* Mobile assistant list overlay */}
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
            <div className="h-[calc(100%-60px)] overflow-auto">
              <AssistantList />
            </div>
          </div>
        </div>
      )}

      {/* Mobile settings overlay */}
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
            <div className="h-[calc(100%-60px)] overflow-auto">
              <AssistantSettings />
            </div>
          </div>
        </div>
      )}

      {/* Backdrop handlers */}
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
  );
}

export default Workspace;
