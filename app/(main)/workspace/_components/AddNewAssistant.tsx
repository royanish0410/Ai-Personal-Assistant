import React, { useContext, useState } from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import AiAssistantsList from '@/services/AiAssistantsList'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { ASSISTANT } from '../../ai-assistants/page'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import AiModelOptions from '@/services/AiModelOptions'
import { Textarea } from '@/components/ui/textarea'
import AssistantAvatar from './AssistantAvatar'
import { toast } from 'sonner'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { AuthContext } from '@/context/AuthContext'
import { AssistantContext } from '@/context/AssistantContext'
import { Loader2Icon } from 'lucide-react'
const DEFAULT_ASSISTANT={
    image: '/bug-fixer.avif',
        name: '',
        title: '',
        instruction: '',
        id: 0,
        sampleQuestions: [],
        userInstruction: '',
        aiModelId: ''
}

function AddNewAssistant({ children }: any) {

    const [selectedAssistant, setSelectedAssistant] = useState<ASSISTANT>(DEFAULT_ASSISTANT);
    const AddAssistant=useMutation(api.userAiAssistants.InsertSelectedAssistants)
    const {user}= useContext(AuthContext)
    const [loading, setLoading] = useState(false);
    const { assistant, setAssistant } = useContext(AssistantContext);

    const onHandleInputChange = (field: string, value: string) => {
        setSelectedAssistant((prev: any) => ({
            ...prev,
            [field]: value
        }))
    }
    const onSave=async()=>{
        if(!selectedAssistant?.name||!selectedAssistant.title||!selectedAssistant.userInstruction)
        {
            toast('Please enter all details')
            return ;
        }
        setLoading(true);
        const result = await AddAssistant({
            records:[selectedAssistant],
            uid:user?._id
        })
        toast('New Assistant Added!');
        setAssistant(null);
        setLoading(false);
    }

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="max-w-[95vw] sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-lg sm:text-xl">Add New Assistant</DialogTitle>
                    <DialogDescription asChild>
                        <div>
                            <div className='grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-5 mt-3 sm:mt-5'>
                                <div className='lg:mt-5 border-b lg:border-b-0 lg:border-r p-3 order-2 lg:order-1'>
                                    <Button variant={'secondary'} size={'sm'}
                                    onClick={()=>setSelectedAssistant(DEFAULT_ASSISTANT)}
                                     className='w-full text-xs sm:text-sm'>+ Create New Assistant</Button>
                                    <div className='mt-2 max-h-[200px] lg:max-h-none overflow-y-auto lg:overflow-visible'>
                                        {AiAssistantsList.map((assistant, index) => (
                                            <div className='p-2 hover:bg-secondary flex gap-2 items-center rounded-xl cursor-pointer' key={index}
                                                onClick={() => setSelectedAssistant(assistant)}
                                            >
                                                <Image src={assistant.image} width={60} height={60} alt={assistant.name} className='w-[30px] h-[30px] sm:w-[35px] sm:h-[35px] object-cover rounded-lg' />
                                                <h2 className='text-xs sm:text-sm'>{assistant.title}</h2>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className='col-span-1 lg:col-span-2 order-1 lg:order-2'>
                                    <div className='flex flex-col sm:flex-row gap-3 sm:gap-5'>
                                        {selectedAssistant &&
                                        <div className="flex justify-center sm:justify-start">
                                            <AssistantAvatar selectedImage={(v:string)=>onHandleInputChange('image',v)}>
                                                <Image src={selectedAssistant?.image} alt='assistant' width={150} height={150}
                                                    className='w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] rounded-xl cursor-pointer object-cover'
                                                />
                                            </AssistantAvatar>
                                        </div>
                                        }
                                        <div className='flex flex-col gap-3 w-full'>
                                            <Input placeholder='Name of Assistant' className='w-full text-sm'
                                                value={selectedAssistant?.name}
                                                onChange={(event) => onHandleInputChange('name', event.target.value)}
                                            />
                                            <Input
                                                placeholder='Title of Assistant'
                                                value={selectedAssistant?.title}
                                                onChange={(event) => onHandleInputChange('title', event.target.value)}
                                                className='w-full text-sm'
                                            />

                                        </div>
                                    </div>
                                    <div className="mt-4">
                                            <h2 className="text-gray-500 text-sm sm:text-base">Model:</h2>
                                            <Select
                                                defaultValue={selectedAssistant?.aiModelId}
                                                onValueChange={(value) => onHandleInputChange("aiModelId", value)}
                                            >
                                                <SelectTrigger className="w-full bg-white text-sm">
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
                                                                    className="rounded-md"
                                                                />
                                                                <h2 className="text-sm">{model.name}</h2>
                                                            </div>
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                    </div>
                                    <div className='mt-5'>
                                        <h2 className="text-gray-500 text-sm sm:text-base">Instruction:</h2>
                                        <Textarea placeholder='Add Instructions' 
                                        value={selectedAssistant.userInstruction}
                                        className='h-[150px] sm:h-[200px] text-sm'
                                        onChange={(event)=>onHandleInputChange('userInstruction',event.target.value)}
                                        />
                                    </div>

                                    <div className='flex flex-col sm:flex-row gap-3 sm:gap-5 justify-end mt-6 sm:mt-10'>
                                        <DialogClose asChild>
                                            <Button variant={'secondary'} className="w-full sm:w-auto text-sm">Cancel</Button>
                                        </DialogClose>
                                        <Button disabled={loading}
                                            onClick={onSave}
                                            className="w-full sm:w-auto text-sm"
                                        >{loading && <Loader2Icon className="animate-spin" />} Add</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default AddNewAssistant