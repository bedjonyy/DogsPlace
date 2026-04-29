import { HeroSection } from '../components/home/HeroSection'
import { CountdownStrip } from '../components/home/CountdownStrip'
import { CategoryGrid } from '../components/home/CategoryGrid'
import { FeaturedProduct } from '../components/home/FeaturedProduct'
import { UGCStrip } from '../components/home/UGCStrip'
import { Testimonials } from '../components/home/Testimonials'
import { AboutSection } from '../components/home/AboutSection'
import { InfoSection } from '../components/home/InfoSection'
import { FAQSection } from '../components/home/FAQSection'
import { Newsletter } from '../components/home/Newsletter'
export function HomePage() {
  return (
    <main>
      <HeroSection />
      <CountdownStrip />
      <CategoryGrid />
      <FeaturedProduct />
      <UGCStrip />
      <Testimonials />
      <AboutSection />
      <InfoSection />
      <FAQSection />
      <Newsletter />
    </main>
  )
}
