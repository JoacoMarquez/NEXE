'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/nosotros', label: 'Nosotros' },
  { href: '/servicios', label: 'Servicios' },
  { href: '/contacto', label: 'Contacto' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // Lock scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-marfil transition-shadow duration-300 ${
        scrolled ? 'border-b border-marfil-dark' : 'border-b border-transparent'
      }`}
    >
      <div className="container-nexe h-[72px] md:h-20 flex items-center justify-between">
        <Link
          href="/nosotros"
          className="flex items-baseline gap-1 group"
          aria-label="NEXE — Inicio"
        >
          <span className="font-display font-extrabold text-2xl md:text-[28px] text-navy tracking-tight leading-none">
            NEXE
          </span>
          <span
            aria-hidden="true"
            className="w-2 h-2 md:w-2.5 md:h-2.5 bg-blue-light translate-y-[-2px] transition-transform duration-200 group-hover:scale-110"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Principal">
          {navLinks.map(({ href, label }) => {
            const isActive = pathname === href
            return (
              <Link
                key={href}
                href={href}
                aria-current={isActive ? 'page' : undefined}
                className={`relative text-sm font-sans font-medium tracking-tight px-4 py-2 rounded-md transition-colors duration-200 ${
                  isActive ? 'text-navy' : 'text-gray-600 hover:text-navy'
                }`}
              >
                {label}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute left-1/2 -translate-x-1/2 bottom-0.5 w-1 h-1 rounded-full bg-blue-light"
                  />
                )}
              </Link>
            )
          })}
          <Link
            href="/contacto"
            className="ml-4 inline-flex items-center gap-1.5 bg-navy text-white px-5 py-2.5 rounded-md text-sm font-sans font-medium tracking-tight hover:bg-blue transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
          >
            Consultar
            <span aria-hidden="true">→</span>
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden relative w-10 h-10 flex items-center justify-center text-navy cursor-pointer"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          <span
            className={`absolute block w-6 h-0.5 bg-current transition-all duration-200 ${
              open ? 'rotate-45' : '-translate-y-2'
            }`}
          />
          <span
            className={`absolute block w-6 h-0.5 bg-current transition-opacity duration-200 ${
              open ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span
            className={`absolute block w-6 h-0.5 bg-current transition-all duration-200 ${
              open ? '-rotate-45' : 'translate-y-2'
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-out ${
          open ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav
          className="bg-marfil border-t border-marfil-dark px-6 pt-6 pb-8 flex flex-col"
          aria-label="Móvil"
        >
          {navLinks.map(({ href, label }) => {
            const isActive = pathname === href
            return (
              <Link
                key={href}
                href={href}
                aria-current={isActive ? 'page' : undefined}
                className={`flex items-center justify-between font-display font-bold text-3xl py-4 border-b border-gray-100 transition-colors ${
                  isActive ? 'text-navy' : 'text-gray-700 hover:text-navy'
                }`}
              >
                <span>{label}</span>
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="w-1.5 h-1.5 rounded-full bg-blue-light"
                  />
                )}
              </Link>
            )
          })}
          <Link
            href="/contacto"
            className="mt-8 inline-flex items-center justify-center gap-2 bg-navy text-white px-6 py-4 rounded-md font-sans font-medium tracking-tight hover:bg-blue transition-all duration-200 cursor-pointer"
          >
            Consultar
            <span aria-hidden="true">→</span>
          </Link>
        </nav>
      </div>
    </header>
  )
}
