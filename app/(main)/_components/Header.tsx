"use client"
import { AuthContext } from '@/context/AuthContext'
import Image from 'next/image'
import React, { useContext } from 'react'

function Header() {
    const { user } = useContext(AuthContext);
  return user&&(
    <div className='p-3 shadow-sm'>
        <Image src={'/logo.svg'} alt ='logo'
        width={40}
        height={40}
        />  
        <Image src={user?.image} alt ='logo'
        width={40}
        height={40}
        />  
    </div>
  )
}

export default Header