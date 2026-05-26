import React from 'react'
import { User } from '../context/UserContext/user-context'
import { redirect } from 'next/navigation'

export const Protected = async ({ children }: { children: React.ReactNode }) => {

    const user = await User()
    const metadata = user.publicMetadata
    const isAdmin = metadata?.isAdmin ?? false
    if (!isAdmin) {
        return redirect('/')
    }
    return children

}

export default Protected
