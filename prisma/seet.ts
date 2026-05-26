import { prisma } from "./lib/prisma"

async function main() {
    const userData = await prisma.product.create({
        data : {
            name : 'I build this',
            slug : 'i-build-this',
            description : "Nice project",
            websiteUrl : "https://goolge.com",
            userId : "user_3DhiS8nJ32LucrBIs2svxh1w299"
        }
    })

    console.log(userData)
}

main()