"use client"
import { getCarById } from '@/app/api/endpoints/endpoints'
import { Building2, Calendar, ChevronLeft, Fuel, Gauge, History, IndianRupee, Star, Tag } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { Button } from '../ui/button'
import Image from 'next/image'
import { CarType } from '@/app/types/Cartype'
import Link from 'next/link'

const CarDetials = ({id} : {id : number}) => {
    const [car, setcar] = useState<CarType | null>(null)
    const fetchCarDetails = async(id : number)=>{
        const data = await getCarById(id)
        if(data.success){
            setcar(data.data)
        }
    }
    useEffect(()=>{
        fetchCarDetails(id)
    }, [id])

    const [image, setImage] = useState('')

   if (!car) {
  return (
    <div className='max-w-7xl px-4 py-6 animate-pulse'>

      {/* Breadcrumb */}
      <div className='flex items-center gap-2 mb-6'>
        <div className='h-4 w-16 rounded bg-muted'></div>
        <div className='h-4 w-4 rounded bg-muted'></div>
        <div className='h-4 w-20 rounded bg-muted'></div>
        <div className='h-4 w-4 rounded bg-muted'></div>
        <div className='h-4 w-24 rounded bg-muted'></div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>

        {/* LEFT SIDE */}
        <div className='flex flex-col gap-4'>

          {/* Main Image Skeleton */}
          <div className='w-full h-[450px] rounded-2xl bg-muted'></div>

          {/* Thumbnail Skeletons */}
          <div className='grid grid-cols-3 gap-3'>
            <div className='h-[120px] rounded-xl bg-muted'></div>
            <div className='h-[120px] rounded-xl bg-muted'></div>
            <div className='h-[120px] rounded-xl bg-muted'></div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className='flex flex-col gap-6'>

          {/* Header Skeleton */}
          <div className='border-b pb-5 space-y-3'>
            <div className='h-10 w-52 rounded bg-muted'></div>
            <div className='h-5 w-28 rounded bg-muted'></div>

            <div className='flex items-center gap-2'>
              <div className='h-4 w-4 rounded bg-muted'></div>
              <div className='h-4 w-12 rounded bg-muted'></div>
              <div className='h-4 w-24 rounded bg-muted'></div>
            </div>
          </div>

          {/* Info Grid Skeleton */}
          <div className='grid grid-cols-2 gap-6'>

            {Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className='flex items-start gap-3'
              >
                <div className='size-10 rounded-full bg-muted'></div>

                <div className='space-y-2'>
                  <div className='h-4 w-20 rounded bg-muted'></div>
                  <div className='h-5 w-24 rounded bg-muted'></div>
                </div>
              </div>
            ))}
          </div>

          {/* Button Skeleton */}
          <div className='h-11 w-40 rounded-xl bg-muted'></div>
        </div>
      </div>

      {/* Bottom Sections */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10'>

        {/* About Skeleton */}
        <div className='border rounded-2xl p-6 space-y-4'>
          <div className='h-6 w-40 rounded bg-muted'></div>

          <div className='space-y-3'>
            <div className='h-4 w-full rounded bg-muted'></div>
            <div className='h-4 w-[90%] rounded bg-muted'></div>
            <div className='h-4 w-[80%] rounded bg-muted'></div>
          </div>
        </div>

        {/* Features Skeleton */}
        <div className='border rounded-2xl p-6 space-y-4'>
          <div className='h-6 w-32 rounded bg-muted'></div>

          <div className='space-y-3'>
            <div className='h-4 w-40 rounded bg-muted'></div>
            <div className='h-4 w-48 rounded bg-muted'></div>
            <div className='h-4 w-36 rounded bg-muted'></div>
            <div className='h-4 w-44 rounded bg-muted'></div>
          </div>
        </div>
      </div>

      {/* CTA Skeleton */}
      <div className='mt-8 border rounded-2xl p-6 flex flex-col lg:flex-row items-center justify-between gap-4'>

        <div className='space-y-3 w-full'>
          <div className='h-7 w-60 rounded bg-muted'></div>
          <div className='h-4 w-80 rounded bg-muted'></div>
        </div>

        <div className='h-11 w-48 rounded-xl bg-muted'></div>
      </div>
    </div>
  )
}
  return (
    <div className='max-w-7xl px-4 py-6 overflow-hidden'>

  {/* Breadcrumb */}
  <div className='flex items-center gap-2 text-sm text-muted-foreground mb-6'>
    <button className='cursor-pointer hover:text-neutral-500 transition-colors duration-200 flex items-center gap-3' onClick={() => window.history.back()}><ChevronLeft />Go Back</button>
  </div>

  <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>

    {/* LEFT SIDE */}
    <div className='flex flex-col gap-4'>

      {/* Main Image */}
      <div className='relative w-full h-[450px] rounded-2xl overflow-hidden border bg-muted flex items-center justify-center'>
        <Image
          src={image ? image : car.image1}
          alt={car.carName}
          className='object-cover '
          width={500}
          height={0}
        />
      </div>

      {/* Thumbnails */}
      <div className='grid grid-cols-3 gap-3'>
        {[car.image1, car.image2, car.image3].map((img, idx) => (
          <div
            key={idx}
            className='relative  h-[120px] rounded-xl overflow-hidden border cursor-pointer hover:opacity-80 transition flex items-center justify-center'
          >
            <Image
              src={img}
              onClick={() => setImage(img)}
              alt={`Car Image ${idx + 1}`}
              width={180}
              height={0}
              className='object-cover'
            />
          </div>
        ))}
      </div>
    </div>

    {/* RIGHT SIDE */}
    <div className='flex flex-col gap-6'>

      {/* Header */}
      <div className='border-b pb-5'>
        <h1 className='text-4xl font-bold tracking-tight'>
          {car.carName}
        </h1>

        <p className='text-muted-foreground mt-1'>
          {car.carCompany}
        </p>

        <div className='flex items-center gap-1 mt-3'>
          <Star size={16} className='fill-yellow-400 text-yellow-400' />

          <span className='font-medium'>
            4.5
          </span>

          <span className='text-muted-foreground text-sm'>
            (120 reviews)
          </span>
        </div>
      </div>

      {/* Info Grid */}
      <div className='grid grid-cols-2 gap-6'>

        <div className='flex items-start gap-3'>
          <Gauge className='text-primary mt-1' />
          <div>
            <p className='text-sm text-muted-foreground'>
              Mileage
            </p>

            <h4 className='font-semibold'>
              {car.carMileage} Km/Kg
            </h4>
          </div>
        </div>

        <div className='flex items-start gap-3'>
          <Building2 className='text-primary mt-1' />

          <div>
            <p className='text-sm text-muted-foreground'>
              Company
            </p>

            <h4 className='font-semibold'>
              {car.carCompany}
            </h4>
          </div>
        </div>

        <div className='flex items-start gap-3'>
          <Fuel className='text-primary mt-1' />

          <div>
            <p className='text-sm text-muted-foreground'>
              Fuel Type
            </p>

            <h4 className='font-semibold'>
              {car.fuleType}
            </h4>
          </div>
        </div>

        <div className='flex items-start gap-3'>
          <Calendar className='text-primary mt-1' />

          <div>
            <p className='text-sm text-muted-foreground'>
              Available Since
            </p>

            <h4 className='font-semibold'>
              {dayjs(car.created_at).format('DD MMM YYYY')}
            </h4>
          </div>
        </div>

        <div className='flex items-start gap-3'>
          <Tag className='text-primary mt-1' />

          <div>
            <p className='text-sm text-muted-foreground'>
              Price Per Day
            </p>

            <h4 className='font-semibold flex items-center'>
              <IndianRupee size={16} />
              {car.prizeperday}
            </h4>
          </div>
        </div>

        <div className='flex items-start gap-3'>
          <History className='text-primary mt-1' />

          <div>
            <p className='text-sm text-muted-foreground'>
              Last Updated
            </p>

            <h4 className='font-semibold'>
              {dayjs(car.updated_at).format('DD MMM YYYY')}
            </h4>
          </div>
        </div>
      </div>

      {/* Buttons */}
    </div>
  </div>

  {/* Bottom Sections */}
  <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10'>

    {/* Description */}
    <div className='border rounded-2xl p-6'>
      <h2 className='text-xl font-semibold mb-4'>
        About This Car
      </h2>

      <p className='text-muted-foreground leading-7'>
        {car.carDesc}
      </p>
    </div>

    {/* Features */}
    <div className='border rounded-2xl p-6'>
      <h2 className='text-xl font-semibold mb-4'>
        Features
      </h2>

      <ul className='space-y-3 text-muted-foreground'>
        <li>• Air Conditioning</li>
        <li>• Power Steering</li>
        <li>• Bluetooth Connectivity</li>
        <li>• Music System</li>
        <li>• Comfortable Seats</li>
      </ul>
    </div>
  </div>

  {/* CTA */}
  <div className='mt-8 border rounded-2xl p-6 flex flex-col lg:flex-row items-center justify-between gap-4'>
    <div>
      <h2 className='text-2xl font-semibold'>
        Ready to Book this Car?
      </h2>

      <p className='text-muted-foreground mt-1'>
        Choose your dates and reserve your ride now.
      </p>
    </div>

    <Button className='h-11 px-8 rounded-xl'>
      Check Availability
    </Button>
  </div>
</div>
  )
}

export default CarDetials
