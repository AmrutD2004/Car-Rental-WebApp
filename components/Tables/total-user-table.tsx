

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'

import { BookText, Edit, Trash2 } from 'lucide-react'
import dayjs from 'dayjs'


const TotalUsers = async ({users} : {users : []}) => {
    
    return (
        <div className='w-full'>
            <Table className='border w-full'>
                <TableCaption>Total Users List</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className='text-center'>Sr No.</TableHead>
                        <TableHead className='text-center'>User</TableHead>
                        <TableHead className='text-center'>Email</TableHead>
                        <TableHead className='text-center'>Role</TableHead>
                        <TableHead className='text-center'>Provider</TableHead>
                        <TableHead className='text-center'>Last Login</TableHead>
                        <TableHead className='text-center'>Status</TableHead>
                        <TableHead className='text-center'>2FA</TableHead>
                        <TableHead className='text-center'>Joined</TableHead>
                        <TableHead className='text-end'>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users?.map((items: any, idx: number) => (

                        <TableRow key={items.id}>

                            <TableCell className="border text-center">{idx + 1}</TableCell>

                            <TableCell className="border text-start">
                                <div className='flex items-center justify-center gap-3'>

                                    <img
                                        src={items.imageUrl}
                                        alt='user'
                                        className='w-10 h-10 rounded-full object-cover'
                                    />

                                    <div className='flex flex-col'>
                                        <span className='font-medium'>
                                            {items.firstName} {items.lastName}
                                        </span>

                                        <span className='text-xs text-muted-foreground'>
                                            {items.id}
                                        </span>
                                    </div>

                                </div>
                            </TableCell>

                            <TableCell className="border text-center">
                                {items.emailAddresses[0]?.emailAddress}
                            </TableCell>

                            <TableCell className="border text-center">
                                {items.publicMetadata?.isAdmin ? (
                                    <span className='text-green-500 font-medium'>
                                        Admin
                                    </span>
                                ) : (
                                    <span>User</span>
                                )}
                            </TableCell>

                            <TableCell className="border text-center">
                                {items.externalAccounts[0]?.provider || "Email"}
                            </TableCell>

                            <TableCell className='border'>
                                {dayjs(items.lastSignInAt).format('DD MMM YYYY')}
                            </TableCell>

                            <TableCell className="border text-center">
                                {items.banned ? (
                                    <span className='text-red-500'>Banned</span>
                                ) : (
                                    <span className='text-green-500'>Active</span>
                                )}
                            </TableCell>

                            <TableCell className="border text-center">
                                {items.twoFactorEnabled ? "Enabled" : "Disabled"}
                            </TableCell>

                            <TableCell className="border text-center">
                                {dayjs(items.createdAt).format('DD MMM YYYY')}
                            </TableCell>

                            <TableCell className='flex items-center justify-center gap-2'>

                                <Button
                                    className='px-2'
                                    variant={'outline'}
                                >
                                    <BookText size={16} />
                                </Button>

                                {/* <Button
                                    className='px-2 bg-chart-4 hover:bg-chart-4/80'
                                >
                                    <Edit size={16} />
                                </Button>

                                <Button
                                    className='px-2 bg-destructive hover:bg-destructive/80'
                                >
                                    <Trash2 size={16} />
                                </Button> */}

                            </TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default TotalUsers
