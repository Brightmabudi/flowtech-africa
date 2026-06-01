import Hero           from '@frontend/components/Hero'
import Stats          from '@frontend/components/Stats'
import Services       from '@frontend/components/Services'
import About          from '@frontend/components/About'
import Solutions      from '@frontend/components/Solutions'
import ValueProp      from '@frontend/components/ValueProp'
import Purpose        from '@frontend/components/Purpose'
import SolutionsDriven from '@frontend/components/SolutionsDriven'
import WhyUs          from '@frontend/components/WhyUs'
import Testimonials   from '@frontend/components/Testimonials'
import CTA            from '@frontend/components/CTA'
import Contact        from '@frontend/components/Contact'
import Footer         from '@frontend/components/Footer'

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
      <SolutionsDriven />
      <WhyUs />
      <Testimonials />
      <CTA />
      <Contact />
      <Footer />
    </main>
  )
}