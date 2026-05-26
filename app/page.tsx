import Hero from "@/components/Landing-Sections/hero-section"
import Navbar from "@/components/Navbar/navbar"
import { Button } from "@/components/ui/button"

export default function Page() {
  return (
    <div className="flex flex-col min-h-svh ">
      <Navbar />
      <section className="mt-20 px-2 lg:px-0">
        <Hero />
      </section>
    </div>
  )
}
