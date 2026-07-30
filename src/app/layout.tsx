import type { Metadata } from 'next'
import { Space_Grotesk, Instrument_Sans, JetBrains_Mono } from 'next/font/google'
import '@frontend/styles/globals.css'
import Navbar       from '@frontend/components/Navbar'
import Loader       from '@frontend/components/Loader'
import CustomCursor from '@frontend/components/CustomCursor'

const displayFont    = Space_Grotesk({ subsets: ['latin'], weight: ['500','600','700'], variable: '--font-cabinet-grotesk' })
const instrumentSans = Instrument_Sans({ subsets: ['latin'], weight: ['400','500','600'], style: ['normal','italic'], variable: '--font-instrument-sans' })
const jetbrainsMono  = JetBrains_Mono({ subsets: ['latin'], weight: ['400','500'], variable: '--font-jetbrains-mono' })

export const metadata: Metadata = {
  title:       'FlowTech Africa - Powering Africa Digital Future',
  description: 'Enterprise cloud, cybersecurity, managed IT services, and network connectivity across 14 African countries. ISO 27001 certified. 500+ clients.',
  keywords:    'ICT South Africa, managed IT services Africa, cloud Africa, cybersecurity Africa, FlowTech',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${displayFont.variable} ${instrumentSans.variable} ${jetbrainsMono.variable}`} style={{ scrollBehavior: 'smooth', overflowX: 'hidden' }}>
      <body className="font-sans antialiased" style={{ overflowX: 'hidden', maxWidth: '100vw', position: 'relative' }}>
        <Loader />
        <CustomCursor />
        <Navbar />
        {children}
      </body>
    </html>
  )
}
