"use client"

import { getAllMyBookings } from '@/app/api/endpoints/endpoints'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import {
    Calendar,
    CarFront,
    ChevronLeft,
    ChevronsLeft,
    CircleCheck,
    Clock3,
    Search,
    XCircle
} from 'lucide-react'
import { spawn } from 'node:child_process'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '../ui/pagination'
import { USER_BOOKINGS_PAGE_SIZE } from '../pagination-component/pagination-constant'

const MyBookingsTable = ({ userId }: { userId: string }) => {
    const [myBookings, setMyBookings] = useState<any[]>([])
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(0)

    const fetchBookingsData = async (userId: string) => {
        try {
            setLoading(true)

            const data = await getAllMyBookings(userId)

            if (data?.success) {
                setMyBookings(data.data)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchBookingsData(userId)
    }, [userId])

    const totalBookings = myBookings.length

    const upcomingBookings = myBookings.filter(
        (item) => item.status === 'pending'
    ).length

    const completedBookings = myBookings.filter(
        (item) => item.status === 'approved'
    ).length

    const cancelledBookings = myBookings.filter(
        (item) => item.status === 'reject'
    ).length

    const [searchBookings, setSearchedBookings] = useState<[] | {}>([])

    useEffect(() => {
        setSearchedBookings(myBookings)
    }, [myBookings])
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const keyword = e.target.value.toLowerCase()
        if (!keyword) {
            setSearchedBookings(myBookings)
            return
        }
        const filtered = myBookings.filter((f: any) =>
            f?.bookingNumber.toLowerCase().includes(keyword)
            || f?.car?.carName.toLowerCase().includes(keyword)
        )
        setSearchedBookings(filtered)

    }

    const totalSearchBookings = searchBookings.length
    const noOfPage = Math.ceil(totalSearchBookings / USER_BOOKINGS_PAGE_SIZE)

    const start = currentPage * USER_BOOKINGS_PAGE_SIZE
    const end = start + USER_BOOKINGS_PAGE_SIZE

    const handlePreviousPage = () => {
        setCurrentPage(currentPage - 1)
    }
    return (
        <div className='w-full flex flex-col gap-6'>
            <button onClick={() => window.history.back()} className='flex items-center gap-1 text-xs text-muted-foreground hover:text-accent-foreground/80 cursor-pointer transition-colors duration-300'><ChevronLeft size={18} />Back</button>

            {/* Header */}
            <div className='flex items-start justify-between w-full'>
                <div className='flex flex-col gap-1'>
                    <h1 className='text-3xl font-bold tracking-tight'>
                        My Car Bookings
                    </h1>

                    <p className='text-sm text-muted-foreground'>
                        Manage all your bookings
                    </p>
                </div>
            </div>

            {/* Stats */}
            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 w-full'>

                <div className='border rounded-xl px-5 py-4 bg-background shadow-sm'>
                    <div className='flex items-center gap-4'>
                        <div className='bg-blue-100 p-3 rounded-full'>
                            <Calendar className='size-5 text-blue-600' />
                        </div>

                        <div>
                            <h1 className='text-2xl font-bold'>
                                {totalBookings}
                            </h1>

                            <p className='text-sm text-muted-foreground'>
                                Total Bookings
                            </p>
                        </div>
                    </div>
                </div>

                <div className='border rounded-xl px-5 py-4 bg-background shadow-sm'>
                    <div className='flex items-center gap-4'>
                        <div className='bg-green-100 p-3 rounded-full'>
                            <Clock3 className='size-5 text-green-600' />
                        </div>

                        <div>
                            <h1 className='text-2xl font-bold'>
                                {upcomingBookings}
                            </h1>

                            <p className='text-sm text-muted-foreground'>
                                Upcoming
                            </p>
                        </div>
                    </div>
                </div>

                <div className='border rounded-xl px-5 py-4 bg-background shadow-sm'>
                    <div className='flex items-center gap-4'>
                        <div className='bg-emerald-100 p-3 rounded-full'>
                            <CircleCheck className='size-5 text-emerald-600' />
                        </div>

                        <div>
                            <h1 className='text-2xl font-bold'>
                                {completedBookings}
                            </h1>

                            <p className='text-sm text-muted-foreground'>
                                Completed
                            </p>
                        </div>
                    </div>
                </div>

                <div className='border rounded-xl px-5 py-4 bg-background shadow-sm'>
                    <div className='flex items-center gap-4'>
                        <div className='bg-red-100 p-3 rounded-full'>
                            <XCircle className='size-5 text-red-600' />
                        </div>

                        <div>
                            <h1 className='text-2xl font-bold'>
                                {cancelledBookings}
                            </h1>

                            <p className='text-sm text-muted-foreground'>
                                Cancelled
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search */}
            <div className='w-full border rounded-xl p-4 flex items-center gap-3 bg-background shadow-sm'>
                <div className='relative w-full'>
                    <Search className='absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground' />

                    <Input
                        placeholder='Search by booking number or car name'
                        className='pl-10 outline-none'
                        onChange={(e) => handleSearch(e)}
                    />
                </div>
            </div>

            {/* Booking List */}
            <div className='flex flex-col gap-4 w-full'>

                {loading && (
                    <div className='w-full border rounded-xl p-10 flex items-center justify-center'>
                        <p className='text-sm text-muted-foreground'>
                            Loading bookings...
                        </p>
                    </div>
                )}

                {!loading && myBookings.length === 0 && (
                    <div className='w-full border rounded-xl p-10 flex flex-col items-center justify-center gap-3'>
                        <CarFront className='size-10 text-muted-foreground' />

                        <h1 className='font-semibold text-lg'>
                            No bookings found
                        </h1>

                        <p className='text-sm text-muted-foreground'>
                            You have not booked any cars yet
                        </p>
                    </div>
                )}

                {searchBookings.slice(start, end).map((items: any) => (
                    <div
                        key={items.id}
                        className='w-full border rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200 bg-background'
                    >
                        <div className='flex flex-col xl:flex-row xl:items-center gap-5'>

                            {/* Image */}
                            <div className='relative w-full xl:w-52 h-40 overflow-hidden rounded-xl border flex items-center justify-center'>
                                <Image
                                    src={items.car.image1}
                                    alt='car-image'
                                    width={180}
                                    height={0}

                                />
                            </div>

                            {/* Car Info */}
                            <div className='flex flex-col gap-2 min-w-[220px]'>
                                <h1 className='text-xl font-semibold'>
                                    {items.car.carName}
                                </h1>

                                <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                                    <span>{items.car.carType}</span>
                                    <span>•</span>
                                    <span>{items.car.fuleType}</span>
                                </div>

                                <div className='flex items-center gap-2 text-sm'>
                                    <span className='font-medium'>
                                        Booking No:
                                    </span>

                                    <span className='text-muted-foreground'>
                                        {items.bookingNumber}
                                    </span>
                                </div>
                            </div>

                            {/* Dates */}
                            <div className='flex flex-col gap-2 xl:ms-auto'>
                                <div>
                                    <p className='text-xs text-muted-foreground'>
                                        Start Date
                                    </p>

                                    <h1 className='font-medium'>
                                        {new Date(items.startDate).toDateString()}
                                    </h1>
                                </div>

                                <div>
                                    <p className='text-xs text-muted-foreground'>
                                        End Date
                                    </p>

                                    <h1 className='font-medium'>
                                        {new Date(items.endDate).toDateString()}
                                    </h1>
                                </div>
                            </div>

                            {/* Price */}
                            <div className='flex flex-col gap-2'>
                                <p className='text-xs text-muted-foreground'>
                                    Total Price
                                </p>

                                <h1 className='text-2xl font-bold'>
                                    ₹{items.totalPrize}
                                </h1>
                            </div>

                            {/* Status */}
                            <div>
                                <div
                                    className={cn(
                                        'px-4 py-2 rounded-full text-sm font-medium w-fit',
                                        items.status === 'pending' &&
                                        'bg-green-100 text-green-700',
                                        items.status === 'approved' &&
                                        'bg-blue-100 text-blue-700',
                                        items.status === 'reject' &&
                                        'bg-red-100 text-red-700'
                                    )}
                                >
                                    {items.status}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className='flex items-center gap-3'>
                                <Link href={`/my-bookings/${items.id}`}>
                                    <Button>
                                        View Details
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className='flex items-center justify-center w-full'>
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
        </div>
    )
}

export default MyBookingsTable  