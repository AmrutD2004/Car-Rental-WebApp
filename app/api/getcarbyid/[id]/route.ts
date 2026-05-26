import { User } from "@/app/context/UserContext/user-context";
import { prisma } from "@/prisma/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req : NextRequest, {params} : {params : Promise<{id : number}>}) {
    const {id} = await params

    const data = await prisma.cars.findUnique({
        where : {id : Number(id)}
    })
    return NextResponse.json({
        success : true,
        data : data
    })
}