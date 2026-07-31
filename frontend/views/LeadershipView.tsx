'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, User, Link2, Mail, Info } from 'lucide-react'
import Footer from '@frontend/components/Footer'
import { Container, Section } from '@frontend/components/ui/Container'
import Card from '@frontend/components/ui/Card'
import Button from '@frontend/components/ui/Button'
import { TEAM, TEAM_CATEGORIES, type TeamMember } from '@frontend/data/team'

function TeamCard({ member }: { member: TeamMember }) {
  return (
    <Card className="h-full text-center">
      <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full border-2 border-dashed border-brand-600/25 bg-ink-100 text-brand-600/50" aria-hidden="true">
        <User size={32} />
      </div>
      <p className="mb-1 font-display text-sm font-bold italic text-ink-950/40">Full Name</p>
      <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-accent-600">{member.roleTitle}</p>
      <p className="mb-4 text-xs leading-relaxed italic text-ink-400">
        Add {member.roleTitle.toLowerCase()}&apos;s professional biography here — background, experience, and role at FlowTech Africa.
      </p>
      <div className="mb-4 flex flex-wrap justify-center gap-1.5">
        {['Skill', 'Skill', 'Skill'].map((s, i) => (
          <span key={i} className="rounded-full border border-dashed border-ink-950/15 px-2.5 py-1 text-[10px] text-ink-400">{s}</span>
        ))}
      </div>
      <div className="flex justify-center gap-2 border-t border-ink-950/10 pt-4">
        <Button variant="ghost" size="sm" disabled aria-label="LinkedIn URL not yet added" icon={<Link2 size={14} />}>
          LinkedIn
        </Button>
        <Button variant="ghost" size="sm" disabled aria-label="Email address not yet added" icon={<Mail size={14} />}>
          Email
        </Button>
      </div>
    </Card>
  )
}

export default function LeadershipView() {
  return (
    <main className="min-h-screen bg-white">
      <Section className="!pb-10 !pt-28 sm:!pt-32">
        <Container className="max-w-3xl">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 rounded-control text-[13px] text-ink-400 transition-colors hover:text-brand-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Back to FlowTech Africa
          </Link>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center">
            <span className="mb-4 inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-accent-600">Our Team</span>
            <h1 className="mb-5 font-display text-[clamp(2.2rem,5vw,3.5rem)] font-bold leading-[1.08] tracking-tight text-ink-950">
              Leadership &amp; Team
            </h1>
            <p className="mx-auto max-w-xl text-base leading-relaxed text-ink-500 sm:text-lg">
              The people behind FlowTech Africa&apos;s delivery — from executive leadership to the engineers and support staff who keep client systems running.
            </p>
          </motion.div>

          <div className="mx-auto mt-8 flex max-w-xl items-start gap-3 rounded-control border border-accent-500/20 bg-accent-500/[0.06] p-4 text-left">
            <Info size={18} className="mt-0.5 flex-shrink-0 text-accent-600" aria-hidden="true" />
            <p className="text-[13px] leading-relaxed text-ink-700">
              <strong className="font-bold">This page is a structural placeholder.</strong> Names, photos, biographies, skills, LinkedIn profiles, and email addresses shown below are not real — replace every profile with actual team member information before publishing.
            </p>
          </div>
        </Container>
      </Section>

      {TEAM_CATEGORIES.map(({ category, desc }, sectionIndex) => {
        const members = TEAM.filter(m => m.category === category)
        if (members.length === 0) return null
        return (
          <Section key={category} bg={sectionIndex % 2 === 0 ? 'tint' : undefined} className="!py-12 sm:!py-14">
            <Container>
              <div className="mb-8">
                <h2 className="font-display text-xl font-bold tracking-tight text-ink-950">{category}</h2>
                <p className="mt-1 text-sm text-ink-500">{desc}</p>
              </div>
              <div className={`grid grid-cols-1 gap-5 sm:grid-cols-2 ${members.length >= 3 ? 'lg:grid-cols-3' : ''}`}>
                {members.map((member, i) => (
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: Math.min(i * 0.08, 0.4) }}
                  >
                    <TeamCard member={member} />
                  </motion.div>
                ))}
              </div>
            </Container>
          </Section>
        )
      })}

      <Footer />
    </main>
  )
}
