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
  setOpenDialog: (open: boolean) => void
}

function Profile({ openDialog, setOpenDialog }: ProfileProps) {
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
      <DialogContent className='w-[95vw] max-w-md max-h-[90vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle className='text-base sm:text-lg'>Profile</DialogTitle>
          <DialogDescription asChild>
            <div className='space-y-3'>
              <div className='flex gap-3 items-center'>
                {user?.picture && (
                  <Image 
                    src={user.picture} 
                    alt='user'
                    width={50} 
                    height={50}
                    className='w-12 h-12 rounded-full flex-shrink-0'
                  />
                )}
                <div className='min-w-0 flex-1'>
                  <h2 className='font-bold text-sm truncate'>{user?.name}</h2>
                  <h2 className='text-gray-500 text-xs truncate'>{user?.email}</h2>
                </div>
              </div>
              
              <hr className='my-3'></hr>
              
              <div className='space-y-2'>
                <h2 className='font-bold text-sm'>Token Usage</h2>
                <h2 className='text-sm'>{remainingTokens}/{maxToken}</h2>
                <Progress value={progressValue} className='h-2' />
                <p className='text-xs text-gray-500'>
                  Used: {usedTokens} tokens | Remaining: {remainingTokens} tokens
                </p>
                
                <div className='flex justify-between items-center mt-3'>
                  <span className='font-bold text-sm'>Current Plan</span>
                  <span className='p-1 bg-gray-100 rounded-md px-2 text-xs'>
                    {!user?.orderId ? 'Free Plan' : 'Pro Plan'}
                  </span>
                </div>
              </div>
                             
              <div className='p-3 border rounded-xl'>
                <div className='flex justify-between items-start'>
                  <div>
                    <h2 className='font-bold text-sm'>Pro Plan</h2>
                    <h2 className='text-xs'>500,000 Tokens</h2>
                  </div>
                  <h2 className='font-bold text-sm'>$10/month</h2>
                </div>
                <hr className='my-2'/>
                <Button className='w-full text-xs flex items-center gap-2'> 
                  <WalletCardsIcon className='w-3 h-3' />
                  Upgrade ($10)
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