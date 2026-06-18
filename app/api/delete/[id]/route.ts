import { User } from "@/app/context/UserContext/user-context";
import { prisma } from "@/prisma/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const user = await User()
    const metadata = user.publicMetadata
    const isAdmin = metadata?.isAdmin ?? false

    if (!isAdmin) {
        return NextResponse.json({
            success: false,
            message: 'User Not an Admin'
        })
    }

    try {
        const data = await prisma.cars.delete({
            where: {
                id: Number(id)
            }
        })

        if(!data){
            return NextResponse.json({
                success : false,
                message : 'Something went wrong'
            })
        }

        return NextResponse.json({
            success: true,
            message: 'Delete Successfull'
        }, { status: 201 })
    } catch (err) {
        return NextResponse.json({
            success: false,
            message: `Delete Successfull : ${err}`
        }, { status: 500 })
    }
}   
