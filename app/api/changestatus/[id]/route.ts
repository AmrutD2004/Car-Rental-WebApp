import { User } from "@/app/context/UserContext/user-context";
import { prisma } from "@/prisma/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(req: NextResponse, {params} : {params : Promise<{id : string}>}) {
    const {id} = await params
    const {status} = await req.json()
    const user = await User()

    const metadata = user.publicMetadata;
    const isAdmin = metadata.isAdmin ?? false
    if (!isAdmin) {
        return NextResponse.json({
            success: false,
            message: 'User not an admin'
        })
    }

    const data = await prisma.carBooking.update({
        data : {
            status : status!
        },
        where : {id : Number(id)}
    })

    return NextResponse.json({
        success : true,
        message : 'Status Updated Successfully'
    })

}