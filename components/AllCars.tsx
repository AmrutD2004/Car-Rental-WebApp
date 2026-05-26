"use client"
import { getCars } from '@/app/api/endpoints/endpoints'
import React, { useEffect, useState } from 'react'
import TotalCarsTable from './Tables/total-cars-tables'

// type props = {
//     fetchCarData : ()=>
// }
const AllCars = () => {
    const [cars, setCars] = useState<[] | any>([])
const fetchData = async ()=>{
    const data = await getCars()
    console.log(data)
    if(data.success) {
        setCars(data.data)
    }
}
useEffect(()=>{
    fetchData()
}, [])
  return (
    <div className='w-full'>
        <div className='flex flex-col items-start justify-start gap-1'>
            <h1 className='text-4xl font-medium tracking-tight text-accent-foreground'>Cars</h1>
            <p className='text-xs tracking-tighter text-muted-foreground'>Total Cars : {cars.length}</p>
        </div>
        <div className='mt-4'>
            <TotalCarsTable cars={cars}/>
        </div>
    </div>
  )
}

export default AllCars
