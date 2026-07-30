import Image from 'next/image'
import { Container } from '@frontend/components/ui/Container'
import NavLink from '@frontend/components/ui/NavLink'

const QUICK_LINKS = [
  { label: 'Careers',       href: '/careers' },
  { label: 'Client Portal', href: '/portal'  },
]

const CERTS = ['ISO 27001', 'COBIT 5', 'B-BBEE L1']

export default function Footer() {
  return (
    <footer className="overflow-x-hidden border-t border-white/[0.06] bg-[#08050F] px-5 py-12 sm:px-10 sm:py-16 lg:px-24 lg:py-20">
      <Container className="max-w-[1280px]">
        <div className="mb-10 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:mb-14 lg:grid-cols-[2fr_1fr] lg:gap-16">

          <div>
            <Image src="/logo.png" alt="FlowTech Africa" width={140} height={38} className="mb-4 h-[38px] w-auto object-contain" />
            <p className="mb-4 max-w-md text-[13px] leading-relaxed text-white/55">
              A proudly South African ICT company with over 20 years of experience — powering enterprise digital transformation across Africa.
            </p>
            <div className="mb-4 flex flex-col gap-1.5">
              <span className="text-xs leading-relaxed text-white/55">
                Unit 3, Boardwalk office park, 107 Boardwalk Blvd, Faerie Glen, Pretoria, 0034
              </span>
              <a
                href="tel:0128811930"
                className="w-fit rounded-control text-xs text-white/55 transition-colors hover:text-brand-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
              >
                012 881 1930
              </a>
              <a
                href="mailto:michellef@flowtech.africa"
                className="w-fit rounded-control text-xs text-white/55 transition-colors hover:text-accent-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500"
              >
                michellef@flowtech.africa
              </a>
            </div>
            <div className="flex flex-wrap gap-2">
              {CERTS.map(b => (
                <span key={b} className="rounded-full border border-white/15 px-2.5 py-1 font-mono text-[10px] text-white/60">
                  {b}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-accent-500">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-2.5 list-none p-0 m-0">
              {QUICK_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <NavLink href={href} variant="footer" className="block !text-white/55 hover:!text-white">
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.06] pt-6">
          <p className="font-mono text-xs text-white/55">
            {new Date().getFullYear()} FlowTech Africa (Pty) Ltd. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  )
}
