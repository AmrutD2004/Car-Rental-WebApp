import { editCar } from "@/app/api/endpoints/endpoints"

export const editCarAction = async (id: number, formData: FormData) => {
    const carName = formData.get("carName") as string
    const carDesc = formData.get("carDesc") as string
    const carCompany = formData.get("carCompany") as string
    const carMileage = formData.get("carMileage") as string
    const fuelType = formData.get("fuelType") as string
    const prizePerDay = formData.get("prizePerDay") as string

    if (!carName || !carDesc || !carCompany || !carMileage || !fuelType || !prizePerDay) {
        console.log('All fields required')
        return false
    }

    try {
        const payload = {
            carName: carName!,
            carCompany: carCompany!,
            carMileage: carMileage!,
            carDesc: carDesc!,
            fuelType: fuelType!,
            prizePerDay: prizePerDay!,
        }

        const data = await editCar(id, payload)
        if(data.success){
            return {
                success : true,
                data
            }
        }
    } catch (err) {
        console.log(err)
        return {
            success : false,
            message : err
        }
    }

}