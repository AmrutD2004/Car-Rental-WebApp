import Layout from '@/components/admin-layout/layout'
import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from "@/components/ui/textarea"
import { cn } from '@/lib/utils'
import React from 'react'
import { addCarAction } from '../addcarServerAction/add-car-server-action'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import SubmitButton from '@/components/Buttons/submit-button'
import { toast } from 'sonner'

const AddCar = () => {

  return (
    <Layout>
      <div className='flex flex-col items-start justify-start'>

        <div className='flex flex-col items-start justify-start gap-1'>
          <h1 className='text-accent-foreground font-semibold tracking-tight text-3xl'>
            Add Car
          </h1>

          <p className='text-xs tracking-tight text-muted-foreground'>
            Add the cars
          </p>
        </div>

        <form action={addCarAction} className='mt-10 w-full'>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 w-full'>
            {/* Car Name */}
            <div className='flex flex-col items-start justify-start gap-1'>
              <Field>
                <FieldLabel>Car Name</FieldLabel>

                <Input
                  className={cn('w-full outline-none')}
                  name='carName'
                  placeholder='Enter car name'
                />
              </Field>
            </div>

            {/* Car Company */}
            <div className='flex flex-col items-start justify-start gap-1'>
              <Field>
                <FieldLabel>Car Company</FieldLabel>

                <Input
                  className={cn('w-full outline-none')}
                  name='carCompany'
                  placeholder='Enter car company'
                />
              </Field>
            </div>

            {/* Fuel Type */}
            <div className='flex flex-col items-start justify-start gap-1'>
              <Field>
                <FieldLabel>Fuel Type</FieldLabel>

                <Input
                  className={cn('w-full outline-none')}
                  name='fuelType'
                  placeholder='Petrol / Diesel / EV'
                />
              </Field>
            </div>

            {/* Price Per Day */}
            <div className='flex flex-col items-start justify-start gap-1'>
              <Field>
                <FieldLabel>Price Per Day</FieldLabel>

                <Input
                  className={cn('w-full outline-none')}
                  name='prizePerDay'
                  placeholder='Enter price per day'
                  type='number'
                />
              </Field>
            </div>

            {/* Car Mileage */}
            <div className='flex flex-col items-start justify-start gap-1'>
              <Field>
                <FieldLabel>Car Mileage</FieldLabel>

                <Input
                  className={cn('w-full outline-none')}
                  name='carMileage'
                  placeholder='Enter mileage'
                />
              </Field>
            </div>

            {/* Image 1 */}
            <div className='flex flex-col items-start justify-start gap-1'>
              <Field>
                <FieldLabel>Car Image 1</FieldLabel>

                <Input
                  className={cn('w-full outline-none py-0.5')}
                  name='image1'
                  accept='image/*'
                  type='file'
                />
              </Field>
            </div>

            {/* Image 2 */}
            <div className='flex flex-col items-start justify-start gap-1'>
              <Field>
                <FieldLabel>Car Image 2</FieldLabel>

                <Input
                  className={cn('w-full outline-none py-0.5')}
                  name='image2'
                  accept='image/*'
                  type='file'
                />
              </Field>
            </div>

            {/* Image 3 */}
            <div className='flex flex-col items-start justify-start gap-1'>
              <Field>
                <FieldLabel>Car Image 3</FieldLabel>

                <Input
                  className={cn('w-full outline-none py-0.5')}
                  accept='image/*'
                  name='image3'
                  type='file'
                />
              </Field>
            </div>

            {/* Description */}
            <div className='flex flex-col items-start justify-start gap-1 lg:col-span-2'>
              <Field>
                <FieldLabel>Car Description</FieldLabel>

                <Textarea
                  className={cn('w-full outline-none min-h-[150px]')}
                  name='carDesc'
                  placeholder='Enter car description'
                />
              </Field>
            </div>
          </div>
          <div className='w-full flex items-center justify-center mx-auto mt-5'>

            <SubmitButton />
          </div>
        </form>
      </div>
    </Layout>
  )
}

export default AddCar