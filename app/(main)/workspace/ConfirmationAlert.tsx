import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"

function ConfirmationAlert({children, OnDelete}:any) {
  return (
        <AlertDialog>
            <AlertDialogTrigger>{children}</AlertDialogTrigger>
            <AlertDialogContent className='max-w-[95vw] sm:max-w-md md:max-w-lg mx-auto'>
                <AlertDialogHeader className='space-y-2 sm:space-y-3'>
                <AlertDialogTitle className='text-base sm:text-lg md:text-xl leading-tight'>Are you really want to Delete this Assistant?</AlertDialogTitle>
                <AlertDialogDescription className='text-sm sm:text-base leading-relaxed'>
                    This action cannot be undone. This will permanently delete your account
                    and remove your data from our servers.
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className='flex-col sm:flex-row gap-2 sm:gap-3 mt-4 sm:mt-6'>
                <AlertDialogCancel className='w-full sm:w-auto text-sm sm:text-base order-2 sm:order-1'>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={OnDelete} className='w-full sm:w-auto text-sm sm:text-base order-1 sm:order-2'>Yes, Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
   )
}

export default ConfirmationAlert