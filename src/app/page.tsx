import Hero         from '@/components/Hero'
import Stats        from '@/components/Stats'
import Services     from '@/components/Services'
import About        from '@/components/About'
import Solutions    from '@/components/Solutions'
import ValueProp    from '@/components/ValueProp'
import Purpose      from '@/components/Purpose'
import WhyUs        from '@/components/WhyUs'
import Testimonials from '@/components/Testimonials'
import CTA          from '@/components/CTA'
import Contact      from '@/components/Contact'
import Footer       from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Hero />
      <Stats />
      <Services />
      <About />
      <Solutions />
      <ValueProp />
      <Purpose />
      <WhyUs />
      <Testimonials />
      <CTA />
      <Contact />
      <Footer />
    </main>
  )
}