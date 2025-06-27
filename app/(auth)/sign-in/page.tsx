"use client"
import { Button } from '@/components/ui/button'
import { AuthContext } from '@/context/AuthContext';
import { api } from '@/convex/_generated/api';
import { GetAuthUserData } from '@/services/GlobalApi';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { log } from 'console';
import { useMutation } from 'convex/react';
import Image from 'next/image'
import { userAgent } from 'next/server';
import React, { useContext } from 'react'

function Signin() {

    const CreateUser=useMutation(api.users.CreateUser);
    const {user, setUser} = useContext(AuthContext);
    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            // console.log(tokenResponse);

            if (typeof window !== undefined){
                localStorage.setItem('user_token', tokenResponse.access_token);
            }
            const userInfo = await axios.get(
                'https://www.googleapis.com/oauth2/v3/userinfo',
                {
                    headers:{
                        Authorization: `Bearer `+ tokenResponse.access_token
                    }
                }
            );
            const user= await GetAuthUserData(tokenResponse.access_token);
            // console.log(user);
            // Save user info
            const result = await CreateUser({
                name:user?.name,
                email:user?.email,
                picture:user.picture
            });
            // console.log("--",result);
            setUser(result);
            
        },
        onError: errorResponse => console.log(errorResponse),
    });
    return (
        <div className='flex items-center flex-col justify-center h-screen' >
        <div className='flex flex-col items-center gap-10 border rounded-2xl p-10 shadow-md'>
            <Image src={'/logo.svg'} alt='logo'
                width={50}
                height={50}
            />
            <h2 className='text-2xl'>Sign in to AI Personal Assistant</h2>

            <Button onClick={()=>googleLogin()}>Sign in with Gmail</Button>
        </div>
        </div>
    )
}

export default Signin