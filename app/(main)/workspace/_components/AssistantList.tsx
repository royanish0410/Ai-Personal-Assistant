"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthContext } from "@/context/AuthContext";
import { api } from "@/convex/_generated/api";
import { useConvex } from "convex/react";
import React, { useContext, useEffect, useState } from "react";
import { ASSISTANT } from "../../ai-assistants/page";
import Image from "next/image";
import { AssistantContext } from "@/context/AssistantContext";
import { BlurFade } from "@/components/magicui/blur-fade";
import AddNewAssistant from "./AddNewAssistant";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, UserCircle2, UserCircle2Icon } from "lucide-react";
import Profile from "./Profile";
import { useRouter } from "next/navigation";

function AssistantList() {
  const { user, logout } = useContext(AuthContext);
  const convex = useConvex();
  const router = useRouter();
  const [assistantList, setAssistantList] = useState<ASSISTANT[]>([]);
  const { assistant, setAssistant } = useContext(AssistantContext);
  const [loading, setLoading] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);

  useEffect(() => {
    user && GetUserAssistants();
  },[user && assistant == null])

  const GetUserAssistants = async () => {
      setLoading(true)
      setAssistantList([]);
    const result = await convex.query(
      api.userAiAssistants.GetAllUserAssistants,
      {
        uid: user._id,
      }
    );
    console.log(result);
    setAssistantList(result);
    setLoading(false);
  };

  const handleLogout = () => {
    // Clear assistant context
    setAssistant(null);
    // Call logout function from AuthContext
    if (logout) {
      logout();
    }
    // Redirect to sign-in page
    router.push("/sign-in");
  };

  return (
    <div className="relative p-3 sm:p-5 bg-secondary border-r-[1px] h-screen max-w-full sm:max-w-none overflow-hidden">
      <h2 className="font-bold text-base sm:text-lg">Your Personal AI Assistants</h2>

      <AddNewAssistant>
        <Button className="w-full mt-3 text-sm sm:text-base">+ Add New Assistant</Button>
      </AddNewAssistant>

      <Input className="bg-white mt-3 text-sm sm:text-base" placeholder="Search" />

      <div className="mt-5 overflow-y-auto max-h-[calc(100vh-200px)] sm:max-h-none">
        {assistantList.map((assistant_, index) => (
          <BlurFade key={index} delay={0.25 + index * 0.05} inView>
            <div
              className={`p-2 flex gap-2 sm:gap-3 items-center hover:bg-gray-200 hover:dark:bg-slate-700 rounded-xl cursor-pointer mt-2 ${
                assistant_.id === assistant?.id ? "bg-gray-200" : ""
              }`}
              onClick={() => setAssistant(assistant_)}
            >
              <Image
                src={assistant_.image}
                alt={assistant_.name}
                width={60}
                height={60}
                className="rounded-xl w-[40px] h-[40px] sm:w-[60px] sm:h-[60px] object-cover flex-shrink-0"
              />
              <div className="min-w-0 flex-1">
                <h2 className="font-bold text-sm sm:text-base truncate">{assistant_.name}</h2>
                <h2 className="text-gray-600 text-xs sm:text-sm dark:text-gray-300 truncate">
                  {assistant_.title}
                </h2>
              </div>
            </div>
          </BlurFade>
        ))}
      </div>

      {/* User profile with dropdown */}
      {user?.picture && (
        <div className="absolute bottom-5 sm:bottom-10 w-[calc(100%-1.5rem)] sm:w-[87%]">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex gap-2 sm:gap-3 items-center hover:bg-gray-200 p-2 rounded-xl cursor-pointer">
                <Image
                  src={user.picture}
                  alt="user"
                  width={35}
                  height={35}
                  className="rounded-full w-[30px] h-[30px] sm:w-[35px] sm:h-[35px] flex-shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <h2 className="font-bold text-sm sm:text-base truncate">{user?.name}</h2>
                  <h2 className="text-gray-400 text-xs sm:text-sm">
                    {user?.orderId ? "Pro Plan" : "Free Plan"}
                  </h2>
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-[200px]'>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setOpenProfile(true)}>
                <UserCircle2/> Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut/> Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Profile openDialog={openProfile} setOpenDialog={setOpenProfile} />
        </div>
      )}
    </div>
  );
}

export default AssistantList;