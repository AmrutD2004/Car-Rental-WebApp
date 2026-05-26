import { checkConnection } from "./prisma/prisma-connected.ts"
import chalk from "picocolors"

async function start() {
    console.log("\n🔌 Checking database connection...\n")
    
    const connected = await checkConnection()
    if (!connected) {
        console.error(chalk.red("❌ Failed to connect to database. Please check your DATABASE_URL in .env"))
        process.exit(1)
    }

    console.log(chalk.green("✅ Database connected successfully!\n"))

    const { spawn } = await import("child_process")
    const dev = spawn("npx", ["next", "dev", "--turbopack"], {
        stdio: "inherit",
        shell: true
    })

    dev.on("close", (code) => process.exit(code ?? 0))
}

start()