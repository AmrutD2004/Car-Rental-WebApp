import { CarType } from '@/app/types/Cartype'
import SubmitButton from '@/components/Buttons/submit-button'
import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import React from 'react'
import EditSubmit from './EditSubmit'
import { editCarAction } from '../editcar/edit-car-server-action'
import { toast } from 'sonner'
type props = {
    car: CarType
    onClose: () => void
}
const EditCar = ({ car, onClose }: props) => {

    const handleSubmit = async (formData: FormData) => {
        const data = await editCarAction(car.id, formData)
        if (data?.success) {
            toast(`Edit Successfull ${car.carName}`)
            setTimeout(() => {
                onClose()
                window.location.reload()
            }, 3000)
        }
    }
    if (!car) {
        return (
            <>
                Loding ...
            </>
        )
    }
    return (
        <div className='fixed inset-0 bg-black/30 w-full z-50'>
            <div onClick={onClose} className='flex items-center justify-center min-h-screen'>
                <div onClick={(e) => e.stopPropagation()} className='px-5 py-3 border w-150 overflow-hidden bg-background'>
                    <div className='flex flex-col items-start justify-start gap-1'>
                        <h1 className='text-accent-foreground font-semibold tracking-tight text-3xl'>
                            Edit Car {car.carName}
                        </h1>

                        <p className='text-xs tracking-tight text-muted-foreground'>
                            Edit the car
                        </p>
                    </div>

                    <form action={handleSubmit} className='mt-10 w-full'>

                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 w-full'>
                            {/* Car Name */}
                            <div className='flex flex-col items-start justify-start gap-1'>
                                <Field>
                                    <FieldLabel>Car Name</FieldLabel>

                                    <Input
                                        required
                                        className={cn('w-full outline-none')}
                                        name='carName'
                                        placeholder='Enter car name'
                                        defaultValue={car.carName}
                                    />
                                </Field>
                            </div>

                            {/* Car Company */}
                            <div className='flex flex-col items-start justify-start gap-1'>
                                <Field>
                                    <FieldLabel>Car Company</FieldLabel>

                                    <Input
                                        required
                                        className={cn('w-full outline-none')}
                                        name='carCompany'
                                        placeholder='Enter car company'
                                        defaultValue={car.carCompany}
                                    />
                                </Field>
                            </div>

                            {/* Fuel Type */}
                            <div className='flex flex-col items-start justify-start gap-1'>
                                <Field>
                                    <FieldLabel>Fuel Type</FieldLabel>

                                    <Input
                                        required
                                        className={cn('w-full outline-none')}
                                        name='fuelType'
                                        placeholder='Petrol / Diesel / EV'
                                        defaultValue={car.fuleType}
                                    />
                                </Field>
                            </div>

                            {/* Price Per Day */}
                            <div className='flex flex-col items-start justify-start gap-1'>
                                <Field>
                                    <FieldLabel>Price Per Day</FieldLabel>

                                    <Input
                                        required
                                        className={cn('w-full outline-none')}
                                        name='prizePerDay'
                                        placeholder='Enter price per day'
                                        type='number'
                                        defaultValue={car.prizeperday}
                                    />
                                </Field>
                            </div>

                            {/* Car Mileage */}
                            <div className='flex flex-col items-start justify-start gap-1'>
                                <Field>
                                    <FieldLabel>Car Mileage</FieldLabel>

                                    <Input
                                        required
                                        className={cn('w-full outline-none')}
                                        name='carMileage'
                                        placeholder='Enter mileage'
                                        defaultValue={car.carMileage}
                                    />
                                </Field>
                            </div>

                            {/* Image 1 */}
                            {/* <div className='flex flex-col items-start justify-start gap-1'>
                                <Field>
                                    <FieldLabel>Car Image 1</FieldLabel>

                                    <Input
                                        className={cn('w-full outline-none py-0.5')}
                                        name='image1'
                                        accept='image/*'
                                        type='file'
                                    />
                                </Field>
                            </div> */}

                            {/* Image 2 */}
                            {/* <div className='flex flex-col items-start justify-start gap-1'>
                                <Field>
                                    <FieldLabel>Car Image 2</FieldLabel>

                                    <Input
                                        className={cn('w-full outline-none py-0.5')}
                                        name='image2'
                                        accept='image/*'
                                        type='file'
                                    />
                                </Field>
                            </div> */}

                            {/* Image 3 */}
                            {/* <div className='flex flex-col items-start justify-start gap-1'>
                                <Field>
                                    <FieldLabel>Car Image 3</FieldLabel>

                                    <Input
                                        className={cn('w-full outline-none py-0.5')}
                                        accept='image/*'
                                        name='image3'
                                        type='file'
                                    />
                                </Field>
                            </div> */}

                            {/* Description */}
                            <div className='flex flex-col items-start justify-start gap-1 lg:col-span-2'>
                                <Field>
                                    <FieldLabel>Car Description</FieldLabel>

                                    <Textarea
                                        required
                                        className={cn('w-full outline-none min-h-[150px]')}
                                        name='carDesc'
                                        placeholder='Enter car description'
                                        defaultValue={car.carDesc}
                                    />
                                </Field>
                            </div>
                        </div>
                        <div className='w-full flex items-center justify-center mx-auto mt-5'>
                            <EditSubmit />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditCar
