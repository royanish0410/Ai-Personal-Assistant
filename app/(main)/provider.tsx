"use client";
import Header from './_components/Header';
import React, { useContext, useEffect } from 'react'
import { GetAuthUserData } from '@/services/GlobalApi';
import { useRouter } from 'next/navigation';
import { useConvex } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { AuthContext } from '@/context/AuthContext';

function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const router = useRouter();
    const convex = useConvex();
    const {user,setUser} = useContext(AuthContext)


    useEffect(()=>{
        CheckUseAuth();
    },[])

    const CheckUseAuth=async()=>{
      const token =localStorage.getItem('user_token');

      const user= token && await GetAuthUserData(token);
      
      if (!user?.email){
          router.replace('/sign-in');
          return;
      }

      try{
          const result = await convex.query(api.users.GetUser,{
            email:user?.email 
          });
          setUser(result);
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



