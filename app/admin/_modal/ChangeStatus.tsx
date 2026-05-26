"use client"
import { changeStatus } from '@/app/api/endpoints/endpoints'
import { Button } from '@/components/ui/button'
import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import strict from 'node:assert/strict'
import React from 'react'
import { useFormStatus } from 'react-dom'
import { toast } from 'sonner'

type props = {
    onClose: () => void,
    selectedBooking: number
}
const ChangeStatus = ({ selectedBooking, onClose }: props) => {
    const {pending} = useFormStatus()
    const handleSubmit = async(formData : FormData) => {
        const status = formData.get('status') as string

        const data = await changeStatus(status, selectedBooking)
        if(data.success){
            toast.success(data.message || 'Status Updated')

            setTimeout(()=>{
                onClose()
                window.location.reload()
            }, 3000)
        }
    }
    return (
        <div className='fixed inset-0 bg-black/30 z-50'>
            <div onClick={onClose} className='flex items-center justify-center min-h-screen'>
                <div onClick={(e) => e.stopPropagation()} className='px-5 py-3 border w-100 overflow-hidden bg-background'>
                    <div className='flex flex-col items-start justify-start gap-1'>
                        <h1 className='text-accent-foreground font-semibold tracking-tight text-3xl'>
                            Change Status
                        </h1>

                        <p className='text-xs tracking-tight text-muted-foreground'>
                            Change status
                        </p>
                    </div>

                    <form action={handleSubmit} className='mt-10 w-full'>

                        <div className='flex flex-col items-start justify-start gap-4 w-full'>
                            {/* Car Name */}
                            <div className='flex flex-col items-start justify-start gap-1 w-full'>
                                <Field>
                                    <FieldLabel>Status</FieldLabel>

                                    <Select name='status'>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue  placeholder="Select Status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value="pending">Pending</SelectItem>
                                                <SelectItem value="approved">Approved</SelectItem>
                                                <SelectItem value="reject">Reject</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </Field>
                            </div>

                        </div>
                        <Button disabled={pending} type="submit" className={`w-full flex items-center justify-center mx-auto mt-5 ${pending ? 'bg-primary/80' : 'bg-primary'}`}>
                            {pending ? <span className='flex items-center gap-2'><Loader2 size={16} className='animate-spin'/>Changing Status</span> : <>Change Status</>}
                        </Button>
                    </form>
                </div>


            </div>
        </div>
    )
}

export default ChangeStatus
