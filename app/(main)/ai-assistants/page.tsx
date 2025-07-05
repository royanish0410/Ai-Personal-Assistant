"use client";
import { BlurFade } from "@/components/magicui/blur-fade";
import { RainbowButton } from "@/components/magicui/rainbow-button";
import { Checkbox } from "@/components/ui/checkbox";
import { AuthContext } from "@/context/AuthContext";
import { api } from "@/convex/_generated/api";
import AiAssistantsList from "@/services/AiAssistantsList";
import { useConvex, useMutation } from "convex/react";
import { Loader2Icon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

export type ASSISTANT = {
  id: number;
  name: string;
  title: string;
  image: string;
  instruction: string;
  userInstruction: string;
  sampleQuestions: string[];
};

function AIAssistants() {
  const [selectedAssistants, setSelectedAssistants] = useState<ASSISTANT[]>([]);
  const insertAssistant = useMutation(api.userAiAssistants.InsertSelectedAssistants);
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const convex = useConvex();
  const router = useRouter();

  useEffect(()=>{
      user && GetUserAssistants();
  },[user])

  const GetUserAssistants=async()=>{
      const result= await convex.query(api.userAiAssistants.GetAllUserAssistants,{
        uid:user._id
      });
      console.log(result);
      if(result.length>0)
      {
        router.replace('/workspace')
        return;
      }
  }

  const onSelect = (assistant: ASSISTANT) => {
    const isSelected = selectedAssistants.some(a => a.id === assistant.id);
    if (isSelected) {
      setSelectedAssistants(prev => prev.filter(a => a.id !== assistant.id));
    } else {
      setSelectedAssistants(prev => [...prev, assistant]);
    }
  };

  const isAssistantSelected = (assistant: ASSISTANT) =>
    selectedAssistants.some(a => a.id === assistant.id);

  const onClickContinue = async () => {
    if (!user?._id) return;
    setLoading(true);
    try {
      const result = await insertAssistant({
        records: selectedAssistants,
        uid: user._id, 
      });
      console.log("Inserted:", result);
    } catch (error) {
      console.error("Error inserting assistants:", error);
    }
    setLoading(false);
  };

  return (
    <div className="px-10 mt-20 md:px-28 lg:px-36 xl:px-48">
      <div className="flex justify-between items-center">
        <div>
          <BlurFade delay={0.25} inView>
            <h2 className="text-3xl font-bold">
              Welcome to the World of AI Assistants 🤖
            </h2>
          </BlurFade>
          <BlurFade delay={0.5} inView>
            <p className="text-xl mt-2">
              Choose your AI companion to Simplify Your Tasks 🚀
            </p>
          </BlurFade>
        </div>
        <RainbowButton
          disabled={selectedAssistants.length === 0 || loading}
          onClick={onClickContinue}
        >
          {loading && <Loader2Icon className="animate-spin mr-2" />}
          Continue
        </RainbowButton>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-5">
        {AiAssistantsList.map((assistant, index) => (
          <BlurFade key={assistant.id} delay={0.25 + index * 0.05} inView>
            <div
              className="hover:border p-3 rounded-xl hover:scale-105 transition-all ease-in-out cursor-pointer relative"
              onClick={() => onSelect(assistant)}
            >
              <Checkbox
                className="absolute m-2 z-10"
                checked={isAssistantSelected(assistant)}
                onCheckedChange={() => onSelect(assistant)}
              />
              <Image
                src={assistant.image}
                alt={assistant.name}
                width={600}
                height={600}
                className="rounded-xl w-full h-[200px] object-cover"
              />
              <h2 className="text-center font-bold text-lg">
                {assistant.name}
              </h2>
              <h2 className="text-center text-gray-600 dark:text-gray-300">
                {assistant.title}
              </h2>
            </div>
          </BlurFade>
        ))}
      </div>
    </div>
  );
}

export default AIAssistants;
