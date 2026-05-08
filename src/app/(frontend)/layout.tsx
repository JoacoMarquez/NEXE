import React from 'react'
import type { Metadata } from 'next'
import { Inter, Archivo, JetBrains_Mono } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-archivo',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    template: '%s | NEXE Estudio',
    default: 'NEXE Estudio — Contabilidad y asesoramiento',
  },
  description:
    'Estudio contable y de asesoramiento empresarial en Montevideo, Uruguay. Resolvemos lo que hay que resolver, explicamos lo que hay que entender y acompañamos cada etapa.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'https://nexeestudio.com'),
}

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${archivo.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-sans antialiased bg-marfil text-navy">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
