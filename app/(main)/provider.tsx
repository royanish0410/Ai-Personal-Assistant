"use client";
import Header from './_components/Header';
import React, { useEffect } from 'react'
import { GetAuthUserData } from '@/services/GlobalApi';
import { useRouter } from 'next/navigation';

function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const router = useRouter();


    useEffect(()=>{
        CheckUseAuth();
    },[])

    const CheckUseAuth=async()=>{
      const token =localStorage.getItem('user_token');

      const user= token && await GetAuthUserData(token);
      console.log(user);
      
      if (!user?.email){
          router.replace('/sign-in');
          return;
      }

      try{

      }catch(e)
      {

      }
    }
  return (
    <div>
        <Header />
      {children}</div>
  )
}

export default Provider



