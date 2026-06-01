import type { Metadata } from 'next'
import localFont from 'next/font/local'
import '@frontend/styles/globals.css'
import Navbar       from '@frontend/components/Navbar'
import Loader       from '@frontend/components/Loader'
import CustomCursor from '@frontend/components/CustomCursor'

const geistSans = localFont({ src: './fonts/GeistVF.woff',     variable: '--font-geist-sans', weight: '100 900' })
const geistMono = localFont({ src: './fonts/GeistMonoVF.woff', variable: '--font-geist-mono', weight: '100 900' })

export const metadata: Metadata = {
  title:       'FlowTech Africa - Powering Africa Digital Future',
  description: 'Enterprise cloud, cybersecurity, managed IT services, and network connectivity across 14 African countries. ISO 27001 certified. 500+ clients.',
  keywords:    'ICT South Africa, managed IT services Africa, cloud Africa, cybersecurity Africa, FlowTech',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" style={{ scrollBehavior: 'smooth', overflowX: 'hidden' }}>
      <body className={geistSans.variable + ' ' + geistMono.variable + ' font-sans antialiased'} style={{ overflowX: 'hidden', maxWidth: '100vw', position: 'relative' }}>
        <Loader />
        <CustomCursor />
        <Navbar />
        {children}
      </body>
    </html>
  )
}