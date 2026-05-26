import { Geist, Geist_Mono, Public_Sans, Playfair_Display } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";

const playfairDisplayHeading = Playfair_Display({subsets:['latin'],variable:'--font-heading'});

const publicSans = Public_Sans({subsets:['latin'],variable:'--font-sans'})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})
export const metadata : Metadata = {
  icons: {
    icon: "/drivio_app_icon_clear.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", publicSans.variable, playfairDisplayHeading.variable)}
    >
      <body>
        <ClerkProvider>
        <ThemeProvider>{children}</ThemeProvider>
        </ClerkProvider>
        <Toaster position="bottom-right"/>
      </body>
    </html>
  )
}
