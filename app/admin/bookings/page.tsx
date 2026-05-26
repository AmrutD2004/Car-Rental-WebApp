

import { User } from '@/app/context/UserContext/user-context'
import Layout from '@/components/admin-layout/layout'
import AdminManageBookings from '@/components/admin-manage-bookings/admin-manage-bookings'
import BookingsGrid from '@/components/admin-manage-bookings/grids/bookings-grid'
import AllUserBookingsTable from '@/components/Tables/all-user-bookings'

import { Calendar, CircleCheck, Clock3, XCircle } from 'lucide-react'


const Bookings = async() => {

 
  return (
    <Layout>
        <div className=''>
          <div className='flex flex-col items-start justify-start gap-2'>
              <h1 className='text-4xl tracking-tight text-accent-foreground font-semibold'>All Bookings</h1>
              <p className='text-xs tracking-tight text-muted-foreground font-medium'>View and manage all car bookings made by users.</p>
          </div>
           <AdminManageBookings />
        </div>
    </Layout>
  )
}

export default Bookings
