"use client"
import { getCars } from '@/app/api/endpoints/endpoints'
import { CarType } from '@/app/types/Cartype'
import Navbar from '@/components/Navbar/navbar'
import { BOOK_CARS_PAGE_SIZE } from '@/components/pagination-component/pagination-constant'
import { Button } from '@/components/ui/button'
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import { Input } from '@/components/ui/input'
import { ChevronLeft, Search } from 'lucide-react'

const ExploreCars = () => {
    const [cars, setCars] = useState<CarType | []>([])
    const  [currentPage, setCurrentPage] = useState(0)
    const fetchData = async () => {
        const data = await getCars()
        if (data.success) {
            setCars(data.data)
        }
    }
    const totalCars = cars.length
    const noOfPages = Math.ceil( totalCars / BOOK_CARS_PAGE_SIZE)
    const start = currentPage * BOOK_CARS_PAGE_SIZE
    const end = start + BOOK_CARS_PAGE_SIZE
    const handlePreviousPage = () => {
            setCurrentPage(currentPage - 1)
        }

    const router = useRouter()
    useEffect(() => {
        fetchData()
    }, [])
    useEffect(()=>{
        setSearchedCars(cars)
    }, [cars])

    const [searchedCars, setSearchedCars] = useState<[] | any | CarType>([])

    const handleSearch = (e : React.ChangeEvent <HTMLInputElement>)=>{
        const keyword = e.target.value.toLowerCase()
        if(!keyword){
            setSearchedCars(cars)
        }
        const filterd = cars.filter((f : any)=> f?.carName.toLowerCase().includes(keyword))
        setSearchedCars(filterd)
    }
    return (
        <>
            <Navbar />
            <div className='mt-20 max-w-7xl mx-auto'>
                <div className='mb-4'>
                    <button onClick={() => window.history.back()} className=' text-xs font-medium flex items-center justify-start gap-2 text-muted-foreground hover:text-amber-50 cursor-pointer '><ChevronLeft size={16}/> Back</button>
                </div>
                <div className='flex items-start justify-start flex-col gap-1'>
                    <h1 className='text-2xl sm:text-3xl md:text-4xl tracking-tight font-semibold'>List of cars</h1>
                    <p className='text-xs sm:text-sm tracking-tight text-muted-foreground'>list of all cars</p>
                </div>
                <div className='w-full border rounded-xl p-3 sm:p-4 flex items-center gap-3 bg-background shadow-sm mt-8 sm:mt-10'>
                <div className='relative w-full'>
                    <Search className='absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground' />

                    <Input
                        placeholder='Search by booking number or car name'
                        className='pl-10 outline-none'
                        onChange={(e) => handleSearch(e)}
                    />
                </div>
            </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-5'>
                    {searchedCars.slice(start, end).map((items: any, idx: number) => (
                        <Card key={items.id} className="relative w-full max-w-full pt-0">
                            <div className="absolute inset-0 z-30 aspect-video bg-background/35" />
                            <img
                                src={items.image1}
                                alt="Event cover"
                                className="relative z-20 aspect-video w-full object-cover scale-90 mask-b-from-50%"
                            />
                            <CardHeader>
                                <CardAction>
                                </CardAction>
                                <div className='flex flex-col items-start justify-start gap-1'>
                                    <CardTitle>{items.carName}</CardTitle>
                                    <span className='text-xs  text-muted-foreground font-medium'>{items.carCompany}</span>
                                </div>
                                <CardDescription className='mt-2'>
                                    {items.carDesc}
                                </CardDescription>
                            </CardHeader>
                            <CardFooter className='flex items-end justify-end mt-auto'>
                                <Button onClick={() => router.push(`/explore/bookcar/${items.id}`)} className="w-full">Book Now</Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
                     <div className='flex items-center justify-center w-full mt-10'>
                                <Pagination>
                                    <PaginationContent>
                
                                        <PaginationItem>
                                            <button disabled={currentPage === 0} onClick={handlePreviousPage}>
                                                <PaginationPrevious    />
                                            </button>
                                        </PaginationItem>
                
                                        {[...Array(noOfPages)].map((_, i) => (
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
                                            <button disabled={currentPage === noOfPages - 1} onClick={() => setCurrentPage(currentPage + 1)} >
                                                <PaginationNext />
                                            </button>
                                        </PaginationItem>
                                    </PaginationContent>
                                </Pagination>
                            </div>
            </div>
        </>
    )
}

export default ExploreCars
