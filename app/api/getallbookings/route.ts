import { User } from "@/app/context/UserContext/user-context";
import { prisma } from "@/prisma/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";

export async function GET(req : NextRequest) {
    const user = await User()

    const metadata = user.publicMetadata;
    const isAdmin = metadata.isAdmin ?? false
    if(!isAdmin){
        return NextResponse.json({
            success : false,
            message : 'User not an admin'
        })
    }

    const data = await prisma.carBooking.findMany({
        include : {
            car : true
        }
    })

    const userIds = [...new Set(data.map((b) => b.userId))];

    // fetch clerk users
    const users = await Promise.all(
        userIds.map(async (id) => {
             const response = await clerkClient()
             const user = await response?.users?.getUser(id)

            return {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.emailAddresses[0]?.emailAddress,
                imageUrl: user.imageUrl
            };
        })
    );

    // merge user data into bookings
    const bookingsWithUsers = data.map((booking) => ({
        ...booking,
        user: users.find((u) => u.id === booking.userId)
    }));

    return NextResponse.json({
        success: true,
        data: bookingsWithUsers
    });
}
