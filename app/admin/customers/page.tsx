
import { AllUser } from '@/app/context/UserContext/user-context'
import Layout from '@/components/admin-layout/layout'
import TotalUsers from '@/components/Tables/total-user-table'
import { clerkClient } from '@clerk/nextjs/server'
import { use } from 'react'


const Users = async() => {
    const users = await AllUser()
  return (
    <Layout>
        <div className='max-w-7xl flex flex-col items-start gap-2 mb-8'>
            <h1 className='text-4xl text-accent-foreground font-medium tracking-tight'>Customers</h1>
            <p className='text-xs text-muted-foreground'>Total Customers : {users.length}</p>
        </div>
        <TotalUsers users={users}/>
    </Layout>
  )
}

export default Users
