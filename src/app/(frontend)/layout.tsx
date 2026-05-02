import React from 'react'
import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import './globals.css'

export const metadata: Metadata = {
  title: {
    template: '%s | NEXE Estudio',
    default: 'NEXE Estudio — Contable & Empresarial',
  },
  description: 'Estudio contable y empresarial en Montevideo, Uruguay.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'https://nexeestudio.com'),
}

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="font-sans antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
