
import { getCarById } from '@/app/api/endpoints/endpoints'
import Layout from '@/components/admin-layout/layout'
import CarDetials from '@/components/cars-components/car-details'

const CarDetailPage = async({params} : {params : Promise<{id : number}>}) => {
    const {id} = await (params)
  return (
    <Layout>
        <CarDetials id={id}/>
    </Layout>
  )
}

export default CarDetailPage
