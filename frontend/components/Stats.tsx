'use client'
import { motion } from 'framer-motion'
import { Clock, Award, Banknote, Monitor } from 'lucide-react'
import { Container, Section } from '@frontend/components/ui/Container'
import StatTile from '@frontend/components/ui/StatTile'

const STATS = [
  { icon: <Clock size={22} />,    value: 20,  suffix: '+', label: 'Years in ICT Industry', sub: 'Proven experience since 2004'        },
  { icon: <Award size={22} />,    value: 1,   suffix: '',  label: 'B-BBEE Certified',       sub: 'Level 1 certified SME'               },
  { icon: <Banknote size={22} />, value: 0,   suffix: '%', label: 'Licensing Fees',         sub: 'No restrictive licensing costs ever' },
  { icon: <Monitor size={22} />,  value: 100, suffix: '+', label: 'Systems Delivered',      sub: 'Across Africa and globally'          },
]

export default function Stats() {
  return (
    <Section bg="tint" className="border-y border-brand-600/10 !py-12 sm:!py-16">
      <Container>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <StatTile {...s} />
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
