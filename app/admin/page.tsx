
import Layout from '@/components/admin-layout/layout'
import { auth, clerkClient } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'
import { User } from '../context/UserContext/user-context'

const AdminPage = async() => {
    // const {userId} = await auth()

    // if(!userId){
    //     redirect(`${process.env.SIGN_IN_URL}`)
    // }

    // const response = await clerkClient()
    // const user = await response?.users?.getUser(userId as string)
    // const metadata = user.publicMetadata
    // const isAdmin = metadata.isAdmin ?? false
    
    // if(!isAdmin)[
    //     redirect('/')
    // ]
    // console.log(user)

    // const userData = await User()
    // console.log(userData)
  return (
        <Layout>
            hi
        </Layout>
  )
}

export default AdminPage
