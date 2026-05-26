"use client"
import React from 'react'
import { Button } from '../ui/button'
import { SignUpButton } from '@clerk/nextjs'
import { cn } from '@/lib/utils'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import HeroCar from '@/app/images/HeroCare.jpg'
import { motion } from "motion/react"
import { useRouter } from 'next/navigation'

const Hero = () => {
  const router = useRouter()
  return (
    <div className='max-w-7xl mx-auto mt-10'>
      <div className='flex items-center w-full'>
        <motion.div
        initial= {{
            filter : 'blur(10px)'
          }}
          animate ={{
            filter : 'blur(0px)'
          }}
          transition={{
            duration : 0.3,
            ease : 'easeInOut'
          }}
        className='flex flex-col items-start justify-start gap-2 lg:w-140'>
          <div

          className='flex flex-col items-start justify-start  tracking-tight relative'>
            <h1 className='text-5xl font-semibold tracking-tight'>Drive Smarter with Drivio <span className='bg-primary text-primary-foreground italic'>Premium Car</span> Rentals Designed for Modern Travel<span className='absolute underline h-1 bg-primary-foreground p-[2px] bg-primary/30 w-40 left-0 bottom-0 transform-3d -rotate-1  rounded-full' /><span className='absolute underline p-[1px] w-40 bg-primary/40 left-0 bottom-0 rounded-full' /></h1>
          </div>
          <div>
            <p className='lg:w-140 tracking-tight font-medium text-neutral-500'>Modern car rentals with seamless booking, premium vehicles, and total flexibility for every journey.</p>
          </div>
          <div className='flex items-center justify-start gap-2 mt-14'>

            <SignUpButton>
              <Button className={cn('shadow-sm flex items-center gap-1 ')}>Get Started<ArrowRight /></Button>
            </SignUpButton>
            <button onClick={() => router.push('/explore/cars')} className={'py-2 text-sm px-3 hover:border hover:border-primary transition-all duration-200'}>Book a ride</button>
          </div>
        </motion.div>
        <motion.div
        initial = {{
          x : 40,
          opacity : 0
        }}
        animate = {{
          x : 0,
          opacity : 1
          
        }}
        transition={{
          duration : 0.3,
          ease : 'easeInOut'
        }}
        className='relative  ms-auto w-full'>
          <Image
           className='translate-x-10' src={HeroCar} height={0} width={800} quality={100} alt='Hero Car image' />
          <motion.span
          initial = {{
          y : 40,
          opacity : 0
        }}
        animate = {{
          y : 0,
          opacity : 1
          
        }}
        transition={{
          duration : 0.3,
          delay : 0.2,
          ease : 'easeInOut'
        }}
          className='absolute lg:w-180 p-[3px] bg-primary rounded-full   left-10 bottom-35 blur-xl -z-40' />
        </motion.div>
      </div>
    </div>
  )
}

export default Hero

