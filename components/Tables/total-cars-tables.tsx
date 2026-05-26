"use client"
import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { BookText, Delete, Edit, List, Search, Trash2 } from 'lucide-react'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { CarType } from '@/app/types/Cartype'
import { Input } from '../ui/input'
import EditCar from '@/app/admin/_modal/EditCar'
import DeleteConfirm from '@/app/admin/_modal/DeleteConfirm'
import { TOTAL_CARS_PAGE_SIZE } from '../pagination-component/pagination-constant'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '../ui/pagination'

type props = {
    cars: CarType[]
}
const TotalCarsTable = ({ cars }: props) => {
    const [selectedCar, setSelectedCar] = useState<CarType[] | null>(null)
    const [searchedCar, setSearchedCar] = useState<CarType[]>([])
    const [carId, setIscarId] = useState<null>(null)
    const router = useRouter()

    useEffect(() => {
        setSearchedCar(cars)
    }, [cars])
    const handleSerach = (e: React.ChangeEvent<HTMLInputElement>) => {
        const keywords = e.target.value.toLowerCase()
        if (!keywords) {
            setSearchedCar(cars)
        }
        const filterd = cars.filter((f: any) => f.carName.toLowerCase().includes(keywords))
        setSearchedCar(filterd)
    }
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isConfirm, setIsConfirm] = useState<boolean>(false)
    const [currentPage, setCurrentPage] = useState(0)
    const totalSearchCars = searchedCar.length
        const noOfPage = Math.ceil(totalSearchCars / TOTAL_CARS_PAGE_SIZE)
    
        const start = currentPage * TOTAL_CARS_PAGE_SIZE
        const end = start + TOTAL_CARS_PAGE_SIZE
    
        const handlePreviousPage = () => {
            setCurrentPage(currentPage - 1)
        }

    return (
        <div className='w-full'>
            <div className='w-full '>
                <div className='lg:w-80 lg:ms-auto flex items-end justify-end border relative mb-10'>
                    <Search className='absolute left-2 text-muted-foreground top-3 lg:top-2 text-sm' size={16} />
                    <Input className='px-8 outline-none' onChange={(e) => handleSerach(e)} placeholder='Search Car' />
                </div>
                <div className='overflow-x-auto w-full'>
                <Table className='border w-full min-w-[900px]'>
                    <TableCaption>A list all Cars</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Sr no.</TableHead>
                            <TableHead>Car Name</TableHead>
                            <TableHead>Car Mileage</TableHead>
                            <TableHead>Car Company</TableHead>
                            <TableHead>Fule Type</TableHead>
                            <TableHead className='text-center'>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {searchedCar.slice(start, end).map((items: any, idx: number) => (
                            <TableRow key={items.id}>
                                <TableCell className="font-medium">{idx + 1}</TableCell>
                                <TableCell>{items.carName}</TableCell>
                                <TableCell>{items.carMileage}</TableCell>
                                <TableCell>{items.carCompany}</TableCell>
                                <TableCell>{items.fuleType}</TableCell>
                                <TableCell className='flex items-center justify-center gap-2 text-center '>
                                    <Button className={cn('px-2 relative group ')} onClick={() => {

                                        router.push(`/admin/car/${items.id}`)
                                    }}><BookText /> <span className='absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200 -top-5 text-xs font-medium tracking-tight bg-accent text-accent-foreground px-3 py-1'>Deatils</span></Button>
                                    <Button onClick={() => {
                                        setSelectedCar(items)
                                        setIsOpen(true)
                                    }} className={cn('bg-chart-4 hover:bg-chart-4/50 px-2 relative group')}><Edit /> <span className='absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200 -top-5 text-xs font-medium tracking-tight bg-accent text-accent-foreground px-3 py-1'>Edit</span></Button>
                                    <Button onClick={() => {
                                        setIsConfirm(true)
                                        setIscarId(items.id)
                                    }} className={cn('bg-destructive hover:bg-destructive/50 px-2 relative group')}><Trash2 /><span className='absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200 -top-5 text-xs font-medium tracking-tight bg-accent text-accent-foreground px-3 py-1'>Delete</span> </Button>
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
            </div>
            {isOpen && <EditCar car={selectedCar} onClose={() => setIsOpen(false)} />}
            {isConfirm && <DeleteConfirm car={carId} onClose={() => setIsConfirm(false)} />}
                </div>
        </div>
    )
}

export default TotalCarsTable
