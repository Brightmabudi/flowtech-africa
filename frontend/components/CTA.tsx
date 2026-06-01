'use client'
import { motion } from 'framer-motion'
import { ArrowRight, Calendar } from 'lucide-react'

export default function CTA() {
  return (
    <section className="sec sec-darker" id="contact-cta">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="cta-block"
        >
          <div className="cta-inner">
            <span className="eyebrow" style={{ justifyContent: 'center', display: 'flex' }}>Start Today</span>
            <h2 className="cta-h">
              Ready to transform<br />
              <span className="hi">your business?</span>
            </h2>
            <p className="cta-p">
              Join 500+ organisations across Africa who trust FlowTech for their mission-critical ICT infrastructure. Our team is ready for a no-obligation consultation.
            </p>
            <div className="cta-acts">
              <a href="#contact" className="btn-primary">
                <Calendar size={16} /> Schedule a Demo
              </a>
              <a href="#solutions" className="btn-secondary">
                View Our Solutions <ArrowRight size={15} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
