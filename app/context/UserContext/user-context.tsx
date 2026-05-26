import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export async function User() {
    const {userId} = await auth()

    if(!userId) {
        return {
            success : false,
            message : 'User id not found'
        }
    }

    const response = await clerkClient()
    const user = await response?.users?.getUser(userId as string)
    return user

}

export async function AllUser() {
    const {userId} = await auth()

    if(!userId) {
        return {
            success : false,
            message : 'User id not found'
        }
    }

    const response = await clerkClient()
    const user = await response?.users?.getUser(userId as string)
    const metadata = user?.publicMetadata
    const isAdmin = metadata?.isAdmin ?? false

    if(!isAdmin){
        return{
            success : false,
            message : 'User Not Authorized'
        }
    }

    const allUser = await response?.users?.getUserList()
    return allUser.data
}
