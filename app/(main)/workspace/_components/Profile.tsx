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
      <DialogContent className='max-w-[95vw] sm:max-w-md md:max-w-lg lg:max-w-xl max-h-[90vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle className='text-lg sm:text-xl'>Profile</DialogTitle>
          <DialogDescription asChild>
            <div className='space-y-3 sm:space-y-4'>
              <div className='flex gap-2 sm:gap-3 md:gap-4 items-center'>
                    <Image src={user?.picture} alt='user'width={150} height={150}
                      className='w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] md:w-[60px] md:h-[60px] rounded-full flex-shrink-0'
                    />
                    <div className='min-w-0 flex-1'>
                      <h2 className='font-bold text-sm sm:text-base md:text-lg truncate'>{user?.name}</h2>
                      <h2 className='text-gray-500 text-xs sm:text-sm truncate'>{user?.email}</h2>
                    </div>
              </div>
              <hr className='my-2 sm:my-3'></hr>
              <div className='flex flex-col gap-1 sm:gap-2'>
                <h2 className='font-bold text-sm sm:text-base'>Token Usage</h2>
                <h2 className='text-sm sm:text-base'>{remainingTokens}/{maxToken}</h2>
                <Progress value={progressValue} className='h-2 sm:h-3' />
                <p className='text-xs sm:text-sm text-gray-500'>
                  Used: {usedTokens} tokens | Remaining: {remainingTokens} tokens
                </p>
            <h2 className='flex justify-between items-center font-bold mt-2 sm:mt-3 text-sm sm:text-base md:text-lg'>
              <span>Current Plan</span>
               <span className='p-1 bg-gray-100 rounded-md px-2 font-normal text-xs sm:text-sm'>{!user?.orderId?'Free Plan':'Pro Plan'}</span>
            </h2>
                  </div>
                             
              <div className='p-3 sm:p-4 border rounded-xl'>
                <div className='flex justify-between items-start'>
                  <div>
                    <h2 className='font-bold text-sm sm:text-base md:text-lg'>Pro Plan</h2>
                    <h2 className='text-xs sm:text-sm md:text-base'>500,000 Tokens</h2>
                  </div>
                  <h2 className='font-bold text-sm sm:text-base md:text-lg'>$10/month</h2>
                </div>
                <hr className='my-2 sm:my-3'/>
                <Button className='w-full text-xs sm:text-sm flex items-center gap-1 sm:gap-2'> 
                  <WalletCardsIcon className='w-3 h-3 sm:w-4 sm:h-4' />
                  Upgrade (10$)
                </Button>
              </div>
             </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default Profile