import { prisma } from "@/prisma/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const { carName, carDesc, carCompany, carMileage, fuelType, prizePerDay } = await req.json()

    if (!carName || !carDesc || !carCompany || !carMileage || !fuelType || !prizePerDay) {
        return NextResponse.json({
            success: false,
            message: 'All fields required'
        }, { status: 400 })
    }

    try {
        const data = await prisma.cars.update({
            data: {
                carName: carName!,
                carCompany: carCompany!,
                carMileage: carMileage!,
                carDesc: carDesc!,
                fuleType: fuelType!,
                prizeperday: prizePerDay!,
            },
            where: { id: Number(id) }
        })
        return NextResponse.json({
            success: true,
            data: data
        }, { status: 201 })
    } catch (err) {
        return NextResponse.json({
            success: false,
            message: `Something went wrong: ${err}`
        }, { status: 500 })
    }
}