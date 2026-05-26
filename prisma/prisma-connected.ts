import { NextRequest } from "next/server";
import { prisma } from "./lib/prisma";

export async function checkConnection(): Promise<boolean> {
    try {
        await prisma.$queryRaw`select 1`
        console.log('Database is connected')
        return true
    } catch (err) {
        console.log('Database not connected', err)
        return false
    }
}