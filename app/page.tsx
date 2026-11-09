import { Download } from '@/components/site/download'
import { Features } from '@/components/site/features'
import { Footer } from '@/components/site/footer'
import { Hero } from '@/components/site/hero'
import { HowItWorks } from '@/components/site/how-it-works'
import { LanguageProvider } from '@/components/site/i18n'
import { Navbar } from '@/components/site/navbar'

export default function Page() {
  return (
    <LanguageProvider>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Download />
      </main>
      <Footer />
    </LanguageProvider>
  )
}
