import { prisma } from "@/prisma/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req : NextRequest, {params} : {params : Promise<{id : string}>}) {
    const {id} = await params;

    const data = await prisma.carBooking.findMany({
        where : {userId : id},
        include : {
            car : true
        }
    })

    return NextResponse.json({
        success : true,
        data : data
    })

}