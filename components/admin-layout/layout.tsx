
import React from 'react'
import SideBar from './side-bar'
import { SidebarInset, SidebarProvider } from '../ui/sidebar'
import InAppNavbar from './inapp-navbar'
import { User } from '@/app/context/UserContext/user-context'
import Protected from '@/app/Protected/Protected'

const Layout = async ({children} : {children : React.ReactNode}) => {
  const user = await User()
  const email = user.emailAddresses[0].emailAddress
  return (
    <Protected>
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen w-full">
        <SideBar adminEmail={email}/>
        
        <SidebarInset>
          <InAppNavbar />
          <main className="flex flex-1 flex-col p-6 w-full">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
    </Protected>
  )
}

export default Layout
