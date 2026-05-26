import { Calendar, CircleCheck, Clock3, XCircle } from 'lucide-react'
import React from 'react'

type props={
    bookings : []
}
const BookingsGrid = ({bookings} : props) => {
    const totalBookings = bookings.length
    const upcoming = bookings.filter((f : any)=> f?.status === 'pending').length
    const completed = bookings.filter((f : any)=> f?.status === 'approved').length
    const cancelled = bookings.filter((f : any)=> f?.status === 'reject').length
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 w-full mt-10'>

                <div className='border rounded-xl px-5 py-4 bg-background shadow-sm'>
                    <div className='flex items-center gap-4'>
                        <div className='bg-blue-100 p-3 rounded-full'>
                            <Calendar className='size-5 text-blue-600' />
                        </div>

                        <div>
                            <h1 className='text-2xl font-bold'>
                                {totalBookings}
                            </h1>

                            <p className='text-sm text-muted-foreground'>
                                Total Bookings
                            </p>
                        </div>
                    </div>
                </div>

                <div className='border rounded-xl px-5 py-4 bg-background shadow-sm'>
                    <div className='flex items-center gap-4'>
                        <div className='bg-green-100 p-3 rounded-full'>
                            <Clock3 className='size-5 text-green-600' />
                        </div>

                        <div>
                            <h1 className='text-2xl font-bold'>
                                {upcoming}
                            </h1>

                            <p className='text-sm text-muted-foreground'>
                                Upcoming
                            </p>
                        </div>
                    </div>
                </div>

                <div className='border rounded-xl px-5 py-4 bg-background shadow-sm'>
                    <div className='flex items-center gap-4'>
                        <div className='bg-emerald-100 p-3 rounded-full'>
                            <CircleCheck className='size-5 text-emerald-600' />
                        </div>

                        <div>
                            <h1 className='text-2xl font-bold'>
                                {completed}
                            </h1>

                            <p className='text-sm text-muted-foreground'>
                                Completed
                            </p>
                        </div>
                    </div>
                </div>

                <div className='border rounded-xl px-5 py-4 bg-background shadow-sm'>
                    <div className='flex items-center gap-4'>
                        <div className='bg-red-100 p-3 rounded-full'>
                            <XCircle className='size-5 text-red-600' />
                        </div>

                        <div>
                            <h1 className='text-2xl font-bold'>
                                {cancelled}
                            </h1>

                            <p className='text-sm text-muted-foreground'>
                                Cancelled
                            </p>
                        </div>
                    </div>
                </div>
            </div>
  )
}

export default BookingsGrid
