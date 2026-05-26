"use client"
import { useFormStatus } from 'react-dom'
import { Check, Loader2, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const EditSubmit = () => {
    const { pending } = useFormStatus()
    return (
        <div>
            {pending ? <Button disabled className={cn('bg-primary/30 flex items-center gap-1 cursor-not-allowed')} type='submit'><Loader2 size={18} className='animate-spin' />Saving Changes...</Button> : <Button className={cn('flex items-center gap-1')} type='submit'><Check />Save Changes</Button>}
        </div>
    )
}

export default EditSubmit
