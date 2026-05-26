import { deleteCar } from '@/app/api/endpoints/endpoints'
import { CarType } from '@/app/types/Cartype'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { Just_Me_Again_Down_Here } from 'next/font/google'
import React, { useState } from 'react'
import { toast } from 'sonner'

type props = {
    car: null,
    onClose: () => void
}
const DeleteConfirm = ({ car, onClose }: props) => {
    const [loading, setLoading] = useState<boolean>(false)
    const handleDelete = async (car: number) => {
        const data = await deleteCar(Number(car))
        if (data?.success) {
            setLoading(true)
            toast.success(data.message)
            setTimeout(() => {
                onClose()
                window.location.reload()
            }, 2000)
            setLoading(false)
        }
    }
    return (
        <div className='fixed inset-0 bg-black/30 z-50'>
            <div className='flex items-center justify-center min-h-screen'>

                <div className='border px-6 py-5 bg-background w-130 rounded-lg shadow-lg'>

                    <div className='flex flex-col gap-2'>
                        <h1 className='text-2xl font-semibold tracking-tight'>
                            Confirm Delete
                        </h1>

                        <p className='text-sm text-muted-foreground'>
                            Are you sure you want to delete this car? This action cannot be undone.
                        </p>
                    </div>

                    <div className='flex items-center justify-end gap-3 mt-6'>

                        <Button onClick={onClose}
                            type='button'
                            variant={'outline'}
                        >
                            Cancel
                        </Button>

                        {loading ? (
                            <Button
                                disabled={loading}
                                className='px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition flex items-center gap-1'
                            >
                                <Loader2 className='animate-spin'/>Delete
                            </Button>
                        ) : (
                            <Button
                                onClick={() => handleDelete(car)}
                                type='button'
                                className='px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition'
                            >
                                Delete
                            </Button>
                        )}

                    </div>

                </div>

            </div>
        </div>
    )
}

export default DeleteConfirm
