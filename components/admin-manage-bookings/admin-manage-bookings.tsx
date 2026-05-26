"use client"
import { getallbookings } from '@/app/api/endpoints/endpoints'
import React, { useEffect, useState } from 'react'
import BookingsGrid from './grids/bookings-grid'
import AllUserBookingsTable from '../Tables/all-user-bookings'

const AdminManageBookings = () => {
     const [bookings, setBookings] = useState<[]>([])
  const fetchBookingsData = async ()=>{
    const data = await getallbookings()
    if(data?.success){
      setBookings(data?.data)
    }
  }
  useEffect(()=>{
    fetchBookingsData()
  }, [])
  return (
    <div className='w-full'>
      <BookingsGrid bookings={bookings}/>
      <AllUserBookingsTable bookings={bookings}/>
    </div>
  )
}

export default AdminManageBookings
