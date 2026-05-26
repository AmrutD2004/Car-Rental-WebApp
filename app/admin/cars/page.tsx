
import { getCars } from '@/app/api/endpoints/endpoints'
import Layout from '@/components/admin-layout/layout'
import AllCars from '@/components/AllCars'

const Cars = () => {

  return (
    <Layout>
      <div className='w-full'>
        <AllCars />
      </div>
    </Layout>
  )
}

export default Cars
