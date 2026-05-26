"use client"
import { SignIn, SignInButton, SignUpButton, UserButton, Show, useUser } from '@clerk/nextjs';

import React, { useCallback } from 'react'
import { Button } from '../ui/button';
import { Sun, Moon, CarFront } from 'lucide-react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import whiteLogo from '@/app/images/drivio_light_theme_clear.png'
import darkLogo from '@/app/images/drivio_dark_theme_clear.png'
import { redirect, usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';



const Navbar = () => {
    const {user} = useUser()
    const isAdmin = user?.publicMetadata?.isAdmin as boolean
    const {resolvedTheme, setTheme} = useTheme()
    const links = [
        {
            name : 'Feature',
            path : '#feature'
        },
        {
            name : 'Work',
            path : "#path"
        },
        {
            name : 'About',
            path : '#about'
        }
    ]
    const toggleTheme = useCallback(() => {
        setTheme(resolvedTheme === "dark" ? "light" : "dark")
    }, [resolvedTheme, setTheme])
    const pathname = usePathname()
    const router = useRouter()
    return (
        <div className='w-full h-16 border-b-2 border-seconadry fixed top-0 backdrop-blur-2xl z-50'>
            <div className='max-w-7xl mx-auto py-4'>
                <div className='flex w-full items-center justify-between'>
                    <div className='flex items-center gap-1 w-5xl'>
                        <Image src={resolvedTheme === 'dark' ? darkLogo : whiteLogo} height={0} width={100} alt='logo'/>
                    </div>
                    {pathname.startsWith('/explore') ? null : <div className='flex items-center justify-center gap-10 w-full'>
                        {links.map((items, idx)=>(
                            <a key={idx} href={items.path} className='text-sm text-accent-foreground hover:text-muted-foreground transition-colors duration-200'>{items.name}</a>
                        ))}
                    </div>}
                
                    <div className='w-full'>
                        <div className='flex items-center justify-end gap-2 w-full'>
                            <Show when={'signed-out'}>
                                    <SignInButton />
                                    <SignUpButton>
                                        <Button className={'text-sm'}>SignUp</Button>
                                    </SignUpButton>
                            </Show>
                            <Show when={'signed-in'}>
                               {isAdmin ? (
                                <Button onClick={() => router.push('/admin')} variant={'outline'}>Dashboard</Button>
                               ) : <Button onClick={() => router.push('/explore/mybookings')} variant={'outline'}>My Bookings</Button>}
                                <UserButton />
                            </Show>
                            <Button onClick={toggleTheme} variant={'ghost'} type="button">
                                {resolvedTheme === "dark" ? <Moon /> : <Sun />}
                            </Button>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Navbar
