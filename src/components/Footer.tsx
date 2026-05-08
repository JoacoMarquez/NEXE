import React from 'react'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'

async function getSiteSettings() {
  try {
    const payload = await getPayload({ config })
    return await payload.findGlobal({ slug: 'site-settings' })
  } catch {
    return null
  }
}

export default async function Footer() {
  const settings = await getSiteSettings()
  const year = new Date().getFullYear()

  return (
    <footer className="bg-navy text-white">
      <div className="container-nexe py-20 md:py-24">
        {/* Closing line */}
        <div className="max-w-3xl mb-16 md:mb-20">
          <p className="tag text-blue-light/90 mb-4">NEXE Estudio</p>
          <p className="font-display font-bold text-h2-fluid text-white text-balance leading-[1.15]">
            Contabilidad clara, asesoramiento cercano.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <div className="flex items-baseline gap-1.5">
              <span className="font-display font-extrabold text-3xl text-marfil tracking-tight leading-none">
                NEXE
              </span>
              <span aria-hidden="true" className="w-3 h-3 bg-blue-light" />
            </div>
            {settings?.tagline && (
              <p className="mt-5 text-white/60 text-base leading-relaxed max-w-sm">
                {settings.tagline}
              </p>
            )}
          </div>

          {/* Nav */}
          <div className="md:col-span-3">
            <p className="text-xs font-sans font-semibold tracking-widest text-blue-light/90 uppercase mb-5">
              Navegación
            </p>
            <nav className="flex flex-col gap-3" aria-label="Footer">
              {[
                { href: '/nosotros', label: 'Nosotros' },
                { href: '/servicios', label: 'Servicios' },
                { href: '/contacto', label: 'Contacto' },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-base text-white/70 hover:text-white transition-colors w-fit"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <p className="text-xs font-sans font-semibold tracking-widest text-blue-light/90 uppercase mb-5">
              Contacto
            </p>
            <div className="flex flex-col gap-2.5">
              {settings?.email && (
                <a
                  href={`mailto:${settings.email}`}
                  className="text-base text-white/70 hover:text-white transition-colors w-fit"
                >
                  {settings.email}
                </a>
              )}
              {settings?.phone && (
                <a
                  href={`tel:${settings.phone}`}
                  className="text-base text-white/70 hover:text-white transition-colors w-fit"
                >
                  {settings.phone}
                </a>
              )}
              {settings?.address && (
                <p className="text-base text-white/70">{settings.address}</p>
              )}
              {settings?.city && (
                <p className="text-base text-white/70">{settings.city}</p>
              )}
            </div>

            {(settings?.linkedin || settings?.instagram || settings?.facebook) && (
              <div className="flex flex-wrap gap-x-5 gap-y-2 mt-6">
                {settings?.linkedin && (
                  <a
                    href={settings.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-blue-light hover:text-white text-sm font-medium transition-colors group"
                  >
                    LinkedIn
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-200 group-hover:translate-x-0.5"
                    >
                      →
                    </span>
                  </a>
                )}
                {settings?.instagram && (
                  <a
                    href={settings.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-blue-light hover:text-white text-sm font-medium transition-colors group"
                  >
                    Instagram
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-200 group-hover:translate-x-0.5"
                    >
                      →
                    </span>
                  </a>
                )}
                {settings?.facebook && (
                  <a
                    href={settings.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-blue-light hover:text-white text-sm font-medium transition-colors group"
                  >
                    Facebook
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-200 group-hover:translate-x-0.5"
                    >
                      →
                    </span>
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-white/10 mt-16 pt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
          <p className="text-xs text-white/40">
            © {year} NEXE Estudio. Todos los derechos reservados.
          </p>
          <p className="text-xs text-white/30">Montevideo, Uruguay</p>
        </div>
      </div>
    </footer>
  )
}
