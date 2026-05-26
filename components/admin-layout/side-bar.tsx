"use client"

import React, { useEffect, useState } from 'react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '../ui/sidebar'

import Link from 'next/link'
import Image from 'next/image'

import darklogo from '../../app/images/drivio_dark_theme_clear.png'
import whitelogo from '../../app/images/drivio_light_theme_clear.png'

import {
  User2,
  CalendarCheck,
  CarFront,
  LayoutDashboard,
  Settings,
  Users,
  Plus
} from 'lucide-react'

import { useTheme } from 'next-themes'
import { usePathname } from 'next/navigation'

type Props = {
  adminEmail: string
}

const SideBar = ({ adminEmail }: Props) => {

  const { resolvedTheme } = useTheme()
  const pathname = usePathname()

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const menuGroups = [
    {
      title: 'Main',
      items: [
        {
          link: 'Dashboard',
          path: '/admin/dashboard',
          icon: LayoutDashboard,
        },
      ],
    },
    {
      title: 'Management',
      items: [
        {
          link: 'Bookings',
          path: '/admin/bookings',
          icon: CalendarCheck,
        },
        {
          link: 'Add Car',
          path: '/admin/addcar',
          icon: Plus,
        },
        {
          link: 'Car',
          path: '/admin/cars',
          icon: CarFront,
        },
        {
          link: 'Customers',
          path: '/admin/customers',
          icon: Users,
        },
      ],
    },
    {
      title: 'Settings',
      items: [
        {
          link: 'Settings',
          path: '/admin/settings',
          icon: Settings,
        },
      ],
    },
  ]

  return (
    <Sidebar collapsible='icon'>
      <SidebarHeader className="flex flex-col gap-5">
         <div onClick={() => window.location.replace('/')} className="flex items-center justify-center w-full border-b py-[16.5px] cursor-pointer">
          <Image
            src={resolvedTheme === 'dark' ? darklogo : whitelogo}
            alt="logo"
            width={150}
          />
        </div>
        <div className='group-data-[collapsible=icon]:hidden'>
        <div className="flex items-center justify-center gap-2">
          <User2 />
          <span className="text-accent-foreground font-semibold text-lg tracking-tight">
            Admin Panel
          </span>
        </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {menuGroups.map((group, idx) => (
          <SidebarGroup key={idx}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item, index) => {
                  const Icon = item.icon

                  return (
                    <SidebarMenuItem key={index}>
                      <SidebarMenuButton
                        isActive={pathname === item.path}
                        tooltip={item.link}
                      >
                        <Link
                          href={item.path}
                          className="flex items-center gap-3"
                        >
                          <Icon size={18} />
                          <span>{item.link}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <div className="p-3 flex items-center justify-center border-t gap-2">
          <span className="py-2 px-3 rounded-full uppercase bg-muted-foreground text-muted">
            {adminEmail?.[0]}
          </span>

          <span className="text-sm">{adminEmail}</span>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

export default SideBar