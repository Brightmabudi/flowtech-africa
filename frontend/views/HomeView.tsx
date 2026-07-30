import Hero        from '@frontend/components/Hero'
import Stats       from '@frontend/components/Stats'
import Partners    from '@frontend/components/Partners'
import Services    from '@frontend/components/Services'
import About       from '@frontend/components/About'
import Solutions   from '@frontend/components/Solutions'
import HowWeWork   from '@frontend/components/HowWeWork'
import Purpose     from '@frontend/components/Purpose'
import WhyUs       from '@frontend/components/WhyUs'
import Testimonials from '@frontend/components/Testimonials'
import CTA          from '@frontend/components/CTA'
import Contact      from '@frontend/components/Contact'
import Footer       from '@frontend/components/Footer'

export default function Home() {
  return (
    <main>
      <Hero />
      <Stats />
      <Partners />
      <Services />
      <About />
      <Solutions />
      <HowWeWork />
      <Purpose />
      <WhyUs />
      <Testimonials />
      <CTA />
      <Contact />
      <Footer />
    </main>
  )
}
