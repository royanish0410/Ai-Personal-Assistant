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
  aiModelId?: string;
};

function AIAssistants() {
  const [selectedAssistants, setSelectedAssistants] = useState<ASSISTANT[]>([]);
  const insertAssistant = useMutation(api.userAiAssistants.InsertSelectedAssistants);
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const convex = useConvex();
  const router = useRouter();

  useEffect(() => {
    if (user) GetUserAssistants();
  }, [user]);

  const GetUserAssistants = async () => {
    const result = await convex.query(api.userAiAssistants.GetAllUserAssistants, {
      uid: user._id,
    });
    console.log(result);
    if (result.length > 0) {
      router.replace("/workspace");
      return;
    }
  };

  const onSelect = (assistant: ASSISTANT) => {
    const isSelected = selectedAssistants.some((a) => a.id === assistant.id);
    if (isSelected) {
      setSelectedAssistants((prev) => prev.filter((a) => a.id !== assistant.id));
    } else {
      setSelectedAssistants((prev) => [...prev, assistant]);
    }
  };

  const isAssistantSelected = (assistant: ASSISTANT) =>
    selectedAssistants.some((a) => a.id === assistant.id);

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
    <div className="px-2 sm:px-6 md:px-10 xl:px-48 mt-4 sm:mt-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
        <div>
          <BlurFade delay={0.25} inView>
            <h2 className="text-lg sm:text-2xl font-bold leading-tight text-gray-900 dark:text-white">
              Welcome to the World of AI Assistants 🤖
            </h2>
          </BlurFade>
          <BlurFade delay={0.5} inView>
            <p className="text-base sm:text-lg mt-1 text-gray-700 dark:text-gray-200">
              Choose your AI companion to Simplify Your Tasks 🚀
            </p>
          </BlurFade>
        </div>
        <RainbowButton
          disabled={selectedAssistants.length === 0 || loading}
          onClick={onClickContinue}
          className="w-full sm:w-auto"
        >
          {loading && <Loader2Icon className="animate-spin mr-2" />}
          Continue
        </RainbowButton>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-5 mt-5">
        {AiAssistantsList.map((assistant, index) => (
          <BlurFade key={assistant.id} delay={0.25 + index * 0.05} inView>
            <div
              className="hover:border p-3 rounded-xl bg-white dark:bg-gray-900 relative transition-all cursor-pointer flex flex-col gap-1"
              style={{
                minHeight: 230, // ensures consistent card height for image + text
                boxShadow: "0 1px 6px 0 rgba(0,0,0,.04)",
              }}
              onClick={() => onSelect(assistant)}
            >
              <Checkbox
                className="absolute top-2 left-2 z-10"
                checked={isAssistantSelected(assistant)}
                onCheckedChange={() => onSelect(assistant)}
              />
              <div className="w-full rounded-xl overflow-hidden mb-2">
                <Image
                  src={assistant.image}
                  alt={assistant.name}
                  width={300}
                  height={128}
                  className="w-full h-32 sm:h-40 object-cover object-top"
                  priority
                />
              </div>
              <h2 className="text-center font-bold text-sm sm:text-base truncate">
                {assistant.name}
              </h2>
              <h3 className="text-center text-gray-600 dark:text-gray-300 text-xs sm:text-sm mt-0.5 truncate">
                {assistant.title}
              </h3>
            </div>
          </BlurFade>
        ))}
      </div>
    </div>
  );
}

export default AIAssistants;
