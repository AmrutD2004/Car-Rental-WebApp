"use client"
import { SignIn, SignInButton, SignUpButton, UserButton, Show } from '@clerk/nextjs';

import React, { useCallback, useEffect, useState } from 'react'
import { Button } from '../ui/button';
import { Sun, Moon, CarFront } from 'lucide-react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import whiteLogo from '@/app/images/drivio_light_theme_clear.png'
import darkLogo from '@/app/images/drivio_dark_theme_clear.png'
import { SidebarTrigger } from '../ui/sidebar';
import Link from 'next/link';


const InAppNavbar = () => {
    const {resolvedTheme, setTheme} = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const toggleTheme = useCallback(() => {
        setTheme(resolvedTheme === "dark" ? "light" : "dark")
    }, [resolvedTheme, setTheme])
    
    return (
        <div className='w-full h-16 border-b-2 border-seconadry backdrop-blur-2xl bg-sidebar sticky top-0 z-50'>
             <div className='fixed bottom-0 p-3 z-50'>
                 <SidebarTrigger />
             </div>
            <div className='max-w-7xl mx-auto py-4 relative'>
                <div className='flex w-full items-center justify-between px-5 lg:px-15'>
                    <div className='w-full'>
                        <div className='flex items-center justify-end gap-2 w-full'>
                            <Button onClick={toggleTheme} variant={'ghost'} type="button" className="w-9 h-9">
                                {mounted ? (resolvedTheme === "dark" ? <Moon /> : <Sun />) : <Sun />}
                            </Button>
                              
                            <Show when={'signed-out'}>
                                    <SignInButton />
                                    <SignUpButton>
                                        <Button className={'text-sm'}>SignUp</Button>
                                    </SignUpButton>
                            </Show>
                            <Show when={'signed-in'}>
                                
                                <UserButton />
                            </Show>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default InAppNavbar
