import React, { useContext, useEffect, useState } from 'react'
import { 
  Dialog, 
  DialogClose, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
} from "@/components/ui/dialog"
import { AuthContext } from '@/context/AuthContext'
import Image from 'next/image'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { WalletCardsIcon } from 'lucide-react'

interface ProfileProps {
  openDialog: boolean
  onOpenChange: (open: boolean) => void
}

function Profile({ openDialog, setOpenDialog }: any) {
  const {user, updateUserCredits} = useContext(AuthContext);

  const [maxToken,setMaxtoken] = useState<number>(0);

  useEffect(()=>{
    if(user?.orderId)
    {
      setMaxtoken(50000)
    }
    else{
      setMaxtoken(10000)
    }
  },[user])

  // Function to calculate tokens based on word count
  const calculateTokens = (text: string): number => {
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    // Rough estimation: 1 token ≈ 0.75 words (OpenAI's approximation)
    return Math.ceil(words.length / 0.75);
  };

  // Function to deduct tokens after assistant interaction
  const deductTokens = (userMessage: string, assistantResponse: string) => {
    const userTokens = calculateTokens(userMessage);
    const assistantTokens = calculateTokens(assistantResponse);
    const totalTokens = userTokens + assistantTokens;
    
    if (user?.credits && user.credits >= totalTokens) {
      updateUserCredits(user.credits - totalTokens);
    }
  };

  // Calculate remaining tokens
  const remainingTokens = user?.credits || 0;
  const usedTokens = maxToken - remainingTokens;
  const progressValue = (usedTokens / maxToken) * 100;

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Profile</DialogTitle>
          <DialogDescription asChild>
            <div>
              <div className='flex gap-4 items-center'>
                    <Image src={user?.picture} alt='user'width={150} height={150}
                      className='w-[60px] h-[60px] rounded-full'
                    />
                    <div>
                      <h2 className='font-bold text-lg'>{user?.name}</h2>
                      <h2 className='text-gray-500'>{user?.email}</h2>
                    </div>
              </div>
              <hr className='my-3'></hr>
              <div className='flex flex-col gap-2'>
                <h2 className='font-bold'>Token Usage</h2>
                <h2>{remainingTokens}/{maxToken}</h2>
                <Progress value={progressValue} />
                <p className='text-sm text-gray-500'>
                  Used: {usedTokens} tokens | Remaining: {remainingTokens} tokens
                </p>
            <h2 className='flex justify-between font-bold mt-3 text-lg'>Current Plan
               <span className='p-1 bg-gray-100 rounded-md px-2 font-normal'>{!user?.orderId?'Free Plan':'Pro Plan'}</span></h2>
                  </div>
                             
              <div className='p-4 border rounded-xl'>
                <div className='flex justify-between'>
                  <div>
                    <h2 className='font-bold text-lg'>Pro Plan</h2>
                    <h2>500,000 Tokens</h2>
                  </div>
                  <h2 className='font-bold text-lg'>$10/month</h2>
                </div>
                <hr className='my-3'/>
                <Button className='w-full'> <WalletCardsIcon />Upgrade (10$)</Button>
              </div>
             </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default Profile