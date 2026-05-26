import { User } from "@/app/context/UserContext/user-context";
import { prisma } from "@/prisma/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    const data = await prisma.cars.findMany()
    return NextResponse.json({
        success : true,
        data : data
    })
}