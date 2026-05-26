
import Navbar from '@/components/Navbar/navbar'
import { User } from '../../context/UserContext/user-context'
import MyBookingsTable from '@/components/Tables/my-bookings-table'

const MyBookings = async() => {
    

    const user = await User()
    const userId = user?.id
  return (
    <>
    <Navbar />
     <div className='max-w-7xl mx-auto mt-20'>
        <MyBookingsTable userId={userId}/>
    </div> 
    </>
  )
}

export default MyBookings
