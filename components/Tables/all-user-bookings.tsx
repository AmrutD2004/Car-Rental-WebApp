"use client"

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import dayjs from 'dayjs'
import { Check, Info } from 'lucide-react'
import Image from 'next/image'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import ChangeStatus from '@/app/admin/_modal/ChangeStatus'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '../ui/pagination'
import { ALL_USER_BOOKINGS_PAGE_SIZE } from '../pagination-component/pagination-constant'
import { spawn } from 'node:child_process'

type props={
    bookings : []
}
const AllUserBookingsTable = ({bookings} : props) => {
    const [open, setOpen] = useState<boolean>(false)
    const [selectedBooking, setSelectedBooking] = useState<null>(null)
    const [currentPage, setCurrentPage] = useState(0)
    const totalSearchBookings = bookings.length
        const noOfPage = Math.ceil(totalSearchBookings / ALL_USER_BOOKINGS_PAGE_SIZE)
    
        const start = currentPage * ALL_USER_BOOKINGS_PAGE_SIZE
        const end = start + ALL_USER_BOOKINGS_PAGE_SIZE
    
        const handlePreviousPage = () => {
            setCurrentPage(currentPage - 1)
        }
  return (
    <div className='w-full'>
      <Table className='border mt-10 w-full'>
                    <TableCaption>A list all car bookings</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Booking No.</TableHead>
                            <TableHead className='text-center'>User</TableHead>
                            <TableHead className='text-center'>Car</TableHead>
                            <TableHead className='text-center'>Dates</TableHead>
                            <TableHead className='text-center'>Total Price</TableHead>
                            <TableHead className='text-center'>Status</TableHead>
                            <TableHead className='text-center'>Booked On</TableHead>
                            <TableHead className='text-center'>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {[...bookings].slice(start, end).map((items: any, idx: number) => (
                            <TableRow key={items.id}>
                                <TableCell className=" text-xs tracking-tight font-medium text-accent-foreground">{items?.bookingNumber}</TableCell>
                                <TableCell className='text-center'>
                                    <div className='flex items-center justify-center gap-2'>
                                        <Image src={items?.user?.imageUrl} width={30} height={0} alt='user profile image' className='rounded-full'/>
                                        <div className='flex flex-col items-start justify-start gap-1'>
                                            <h1 className='inline-flex gap-1 items-center'><span>{items?.user?.firstName.charAt(0).toUpperCase() + items?.user?.firstName.slice(1)}</span>
                                                <span>{items?.user?.lastName.charAt(0).toUpperCase() + items?.user?.lastName.slice(1)}</span> </h1>
                                                <span className='text-xs text-muted-foreground tracking-tight'>{items?.user?.email}</span>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className='text-center'>
                                    <div className='flex items-center justify-start mx-auto gap-2'>
                                        <Image src={items?.car?.image1} width={70} height={0} alt='user profile image'/>
                                        <div className='flex flex-col items-start justify-start gap-1'>
                                            <h1 className='inline-flex gap-1 items-center'><span>{items?.car?.carName}</span></h1>
                                                <span className='text-xs text-muted-foreground tracking-tight'>{items?.car?.carCompany}</span>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className='text-center'>
                                    <div className='flex flex-col items-center justify-center gap-1 leading-5'>
                                        <div className='flex flex-col items-start justify-start gap-1'>
                                            <h1 className='inline-flex gap-1 items-center'><span>{dayjs(items?.startDate).format('DD MMM YYYY')}</span></h1>
                                        </div>
                                       <span className='w-full text-start px-4 text-muted-foreground'> to</span>
                                        <div className='flex flex-col items-start justify-start gap-1'>
                                             <h1 className='inline-flex gap-1 items-center'><span>{dayjs(items?.endDate).format('DD MMM YYYY')}</span></h1>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className='text-center flex items-center gap-1 justify-center'>₹ <span>{items?.totalPrize}</span></TableCell>
                                <TableCell className='text-start'>
                                    <div className={`text-center px-3 py-1 text-xs tracking-tight rounded-full font-medium ${items?.status === 'pending' ? ' text-green-500' : ''}
                                    ${items?.status === 'approved' ? ' text-blue-500' : ''}
                                    ${items?.status === 'reject' ? ' text-red-500' : ''}
                                    
                                    `}>
                                        <span>{items?.status}</span>
                                    </div>
                                </TableCell>
                                <TableCell className='text-center'>{dayjs(items?.created_at).format('DD MMM YYYY')}</TableCell>
                                <TableCell className='flex items-center justify-center my-auto text-center '>
                                    {items.status === 'pending' ? (
                                        <Button onClick={() => {
                                        setOpen(true)
                                        setSelectedBooking(items?.id)
                                    }} variant={'outline'} className={cn('mt-5 px-2.5 cursor-pointer')}><Info /></Button>
                                    ) : (
                                        <button disabled className='flex items-center justify-center mt-5 text-muted-foreground cursor-not-allowed'><Check /></button>
                                    )}
                                </TableCell>
                            </TableRow>
                        
                        ))}
                    </TableBody>
                </Table>
                  <div className='flex items-center justify-center w-full mt-10'>
                                <Pagination>
                                    <PaginationContent>
                
                                        <PaginationItem>
                                            <button disabled={currentPage === 0} onClick={handlePreviousPage}>
                                                <PaginationPrevious    />
                                            </button>
                                        </PaginationItem>
                
                                        {[...Array(noOfPage)].map((_, i) => (
                                            <PaginationItem key={i}>
                                                <PaginationLink href="#" onClick={() => setCurrentPage(i)} isActive={i === currentPage}>
                                                    {i + 1}
                                                </PaginationLink>
                                            </PaginationItem>
                                        ))}
                
                                        <PaginationItem>
                                            <PaginationEllipsis />
                                        </PaginationItem>
                                        <PaginationItem>
                                            <button disabled={currentPage === noOfPage - 1} onClick={() => setCurrentPage(currentPage + 1)} >
                                                <PaginationNext />
                                            </button>
                                        </PaginationItem>
                                    </PaginationContent>
                                </Pagination>
                            </div>
                {open && <ChangeStatus selectedBooking={selectedBooking} onClose={() => setOpen(false)}/>}
    
  </div>
  )
}

export default AllUserBookingsTable

