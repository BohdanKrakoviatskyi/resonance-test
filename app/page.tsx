import { Download } from '@/components/site/download'
import { Features } from '@/components/site/features'
import { Footer } from '@/components/site/footer'
import { Hero } from '@/components/site/hero'
import { HowItWorks } from '@/components/site/how-it-works'
import { Intro } from '@/components/site/intro'
import { Navbar } from '@/components/site/navbar'
import { Showcase } from '@/components/site/showcase'

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Intro />
        <Showcase />
        <HowItWorks />
        <Features />
        <Download />
      </main>
      <Footer />
    </>
  )
}
