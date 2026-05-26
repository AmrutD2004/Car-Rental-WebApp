import { User } from "@/app/context/UserContext/user-context";
import { prisma } from "@/prisma/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest) {
    const user = await User()
    const {startdate, enddate, totalprize, carId} = await req.json()
    if(!user){
        return NextResponse.json({
            success : false,
            message : 'User Not authorized'
        })
    }
    if(!startdate || !enddate || !totalprize || !carId){
        return NextResponse.json({
            success : false,
            message : 'All fields are required'
        })
    }
    const userId = user?.id

    const bookingNumber = `CAR-${Date.now()}`

    const data = await prisma.carBooking.create({
        data : {
            userId : userId as string,
            carId : Number(carId),
            bookingNumber : bookingNumber,
            startDate : new Date(startdate),
            endDate : new Date(enddate),
            totalPrize : String(totalprize),
            status : "pending"
        }
    })

    return NextResponse.json({
        success : true,
        message : `Booking Created - ${data.bookingNumber}`,
        data : data
    })


}