"use client";

import { AssistantContext } from "@/context/AssistantContext";
import Image from "next/image";
import React, { useContext, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AiModelOptions from "@/services/AiModelOptions";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2Icon, Save, Trash } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import ConfirmationAlert from "../ConfirmationAlert";
import { BlurFade } from "@/components/magicui/blur-fade";

function AssistantSettings() {
  const { assistant, setAssistant } = useContext(AssistantContext);
  const UpdateAssistant = useMutation(api.userAiAssistants.UpdateUserAiAssistant);
  const DeleteAssistant = useMutation(api.userAiAssistants.DeleteAssistant);
  const [loading, setLoading] = useState(false);

  const onHandleInputChange = (field: string, value: string) => {
    setAssistant((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  const OnSave = async () => {
    if (!assistant?._id || !assistant?.userInstruction) return;

    setLoading(true);
    try {
      await UpdateAssistant({
        id: assistant._id,
        userInstruction: assistant.userInstruction,
        ...(assistant.aiModelId && { aiModelId: assistant.aiModelId }),
      });
      toast("Saved!");
    } catch (err) {
      console.error("Error saving assistant:", err);
    } finally {
      setLoading(false);
    }
  };

  const OnDelete = async () => {
    setLoading(true);
    await DeleteAssistant({ id: assistant?._id });
    setAssistant(null);
    setLoading(false);
  };

  return assistant ? (
    <div className="p-3 sm:p-5 bg-secondary border-l-[1px] h-screen overflow-y-auto">
      <h2 className="font-bold text-lg sm:text-xl">Settings</h2>

      <BlurFade delay={0.25}>
        <div className="mt-4 flex gap-2 sm:gap-3">
          <Image
            src={assistant.image}
            alt="assistant"
            width={100}
            height={100}
            className="rounded-xl h-[60px] w-[60px] sm:h-[80px] sm:w-[80px] object-cover flex-shrink-0"
          />
          <div className="min-w-0 flex-1">
            <h2 className="font-bold text-sm sm:text-base truncate">{assistant.name}</h2>
            <p className="text-gray-700 dark:text-gray-300 text-xs sm:text-sm truncate">{assistant.title}</p>
          </div>
        </div>
      </BlurFade>

      <BlurFade delay={0.25 * 2 }>
        <div className="mt-4">
          <h2 className="text-gray-500 text-sm sm:text-base">Model:</h2>
          <Select
            defaultValue={assistant.aiModelId}
            onValueChange={(value) => onHandleInputChange("aiModelId", value)}
          >
            <SelectTrigger className="w-full bg-white text-sm sm:text-base">
              <SelectValue placeholder="Select Model" />
            </SelectTrigger>
            <SelectContent>
              {AiModelOptions.map((model) => (
                <SelectItem key={model.name} value={model.name}>
                  <div className="flex gap-2 items-center m-1">
                    <Image
                      src={model.logo}
                      alt={model.name}
                      width={20}
                      height={20}
                      className="rounded-md w-[16px] h-[16px] sm:w-[20px] sm:h-[20px]"
                    />
                    <h2 className="text-sm sm:text-base">{model.name}</h2>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </BlurFade>

      <BlurFade delay={0.75}>
        <div className="mt-4 pb-20 sm:pb-24">
          <h2 className="text-gray-500 text-sm sm:text-base">Instruction:</h2>
          <Textarea
            placeholder="Add instruction"
            className="h-[120px] sm:h-[180px] bg-white text-sm sm:text-base resize-none"
            value={assistant.userInstruction}
            onChange={(e) =>
              onHandleInputChange("userInstruction", e.target.value)
            }
          />
        </div>
      </BlurFade>

      <div className="fixed bottom-4 right-3 sm:absolute sm:bottom-10 sm:right-5 flex gap-2 sm:gap-5 z-10">
        <ConfirmationAlert OnDelete={OnDelete}>
          {/* Button must not be nested — it will be passed as child */}
          <Button asChild disabled={loading} variant="ghost" size="sm" className="sm:size-default">
            <span className="flex items-center gap-1 sm:gap-2">
              <Trash className="w-4 h-4" /> <span className="hidden sm:inline">Delete</span>
            </span>
          </Button>
        </ConfirmationAlert>

        <Button onClick={OnSave} disabled={loading} size="sm" className="sm:size-default">
          <span className="flex items-center gap-1 sm:gap-2">
            {loading ? <Loader2Icon className="animate-spin w-4 h-4" /> : <Save className="w-4 h-4" />} 
            <span className="hidden sm:inline">Save</span>
          </span>
        </Button>
      </div>
    </div>
  ) : null;
}

export default AssistantSettings;