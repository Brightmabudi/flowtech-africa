import Hero            from '@frontend/components/Hero'
import Stats            from '@frontend/components/Stats'
import About            from '@frontend/components/About'
import Services         from '@frontend/components/Services'
import TechStack        from '@frontend/components/TechStack'
import Solutions        from '@frontend/components/Solutions'
import HowWeWork        from '@frontend/components/HowWeWork'
import Industries       from '@frontend/components/Industries'
import Purpose          from '@frontend/components/Purpose'
import WhyChooseUs      from '@frontend/components/WhyChooseUs'
import FeaturedProjects from '@frontend/components/FeaturedProjects'
import Testimonials     from '@frontend/components/Testimonials'
import CTA              from '@frontend/components/CTA'
import Newsletter       from '@frontend/components/Newsletter'
import Contact          from '@frontend/components/Contact'
import Footer           from '@frontend/components/Footer'

export default function Home() {
  return (
    <main>
      <Hero />
      <Stats />
      <About />
      <Services />
      <WhyChooseUs />
      <TechStack />
      <Solutions />
      <HowWeWork />
      <Industries />
      <Purpose />
      <FeaturedProjects />
      <Testimonials />
      <CTA />
      <Newsletter />
      <Contact />
      <Footer />
    </main>
  )
}
