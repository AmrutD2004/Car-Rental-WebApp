"use server"

import { prisma } from "@/prisma/lib/prisma"

export const addCarAction = async (formData: FormData) => {
    const carName = formData.get("carName") as string
    const carDesc = formData.get("carDesc") as string
    const carCompany = formData.get("carCompany") as string
    const carMileage = formData.get("carMileage") as string
    const fuelType = formData.get("fuelType") as string
    const prizePerDay = formData.get("prizePerDay") as string

    const image1 = formData.get('image1') as File
    const image2 = formData.get('image2') as File
    const image3 = formData.get('image3') as File

    if (!carName || !carDesc || !carCompany || !carMileage || !fuelType || !prizePerDay) {
        console.log('All fields required')
        return false
    }

    try {
        const uploadImage = new FormData()
        uploadImage.append('files', image1)
        uploadImage.append('files', image2)
        uploadImage.append('files', image3)
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/upload/car`, {
            method: 'POST',
            body: uploadImage
        })
        const images = await response.json()
        if(!response.ok){
            console.log(images)
            return
        }

        const data = await prisma.cars.create({
            data: {
                carName: carName!,
                carCompany: carCompany!,
                carMileage: carMileage!,
                carDesc: carDesc!,
                fuleType: fuelType!,
                prizeperday: prizePerDay!,
                image1: images.imageUrls[0] as string,
                image2: images.imageUrls[1] as string,
                image3: images.imageUrls[2] as string,
            }
        })
        return {
            success : true,
            message : `${data.carName} car added successfully`
        }
    } catch (err) {
        console.log(err)
        return {
            success : false,
            message : `Something went wrong ${err}`
        }
    }
}