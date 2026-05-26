import { CarType } from '@/app/types/Cartype'
import React from 'react'
import EditSubmit from './EditSubmit'
import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import BookCarButton from './BookCarButton'
import { bookCar } from './book-car-action'
import { toast } from 'sonner'

type Props = {
    car : CarType
    onClose : ()=>void
}

const BookingModal = ({car, onClose}: Props) => {

    const handleSubmit = async(formData : FormData) =>{
        const data = await bookCar(formData, car.prizeperday, car.id)
        if(data.success){
            toast.success(data?.data?.message || `Booking Created - ${data?.data?.bookingNumber}`)
        }
        else{
            toast.error(data?.data?.message || 'Somethingwent wrong')
        }
    }
  return (
    <div className='fixed inset-0 bg-black/30'>
        <div  onClick={onClose}className='flex items-center justify-center min-h-screen'>
             <div onClick={(e) => e.stopPropagation()} className='px-5 py-3 border w-100 overflow-hidden bg-background'>
                    <div className='flex flex-col items-start justify-start gap-1'>
                        <h1 className='text-accent-foreground font-semibold tracking-tight text-3xl'>
                            Book Car {car.carName}
                        </h1>

                        <p className='text-xs tracking-tight text-muted-foreground'>
                            Book car
                        </p>
                    </div>

                    <form action={handleSubmit}  className='mt-10 w-full'>

                        <div className='flex flex-col items-start justify-start gap-4 w-full'>
                            {/* Car Name */}
                            <div className='flex flex-col items-start justify-start gap-1 w-full'>
                                <Field>
                                    <FieldLabel>Start Date</FieldLabel>

                                    <Input
                                    required
                                        className={cn('w-full outline-none')}
                                        type='date'
                                        name='startdate'
                                    />
                                </Field>
                            </div>

                            {/* Car Company */}
                            <div className='flex flex-col items-start justify-start gap-1 w-full'>
                                <Field>
                                    <FieldLabel>End Date</FieldLabel>

                                    <Input
                                    required
                                        className={cn('w-full outline-none')}
                                        name='enddate'
                                        type='date'
                                    />
                                </Field>
                            </div>

                        </div>
                        <div className='w-full flex items-center justify-center mx-auto mt-5'>
                            <BookCarButton />
                        </div>
                    </form>
                </div>
        </div>
    </div>
  )
}

export default BookingModal