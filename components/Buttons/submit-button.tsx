"use client"
import { useFormStatus } from 'react-dom'
import { Button } from '../ui/button'
import { Loader2, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'

const SubmitButton = () => {
    const {pending} = useFormStatus()
  return (
    <div>
      {pending ? <Button disabled className={cn('bg-primary/30 flex items-center gap-1 cursor-not-allowed')} type='submit'><Loader2 size={18} className='animate-spin'/>Adding Car...</Button> :  <Button className={cn('flex items-center gap-1')} type='submit'><Plus />Add Car</Button>}
    </div>
  )
}

export default SubmitButton
