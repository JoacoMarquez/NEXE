import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
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

  return (
    <footer className="bg-navy text-white">
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <Image
              src="/logos/nexe_logo_fondo_oscuro.svg"
              alt="NEXE Estudio"
              width={160}
              height={52}
            />
            {settings?.tagline && (
              <p className="mt-4 text-white/60 text-sm leading-relaxed">{settings.tagline}</p>
            )}
          </div>

          {/* Nav */}
          <div>
            <p className="text-xs font-semibold tracking-widest text-blue-light uppercase mb-4">
              Navegación
            </p>
            <nav className="flex flex-col gap-3">
              {[
                { href: '/nosotros', label: 'Nosotros' },
                { href: '/servicios', label: 'Servicios' },
                { href: '/contacto', label: 'Contacto' },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-semibold tracking-widest text-blue-light uppercase mb-4">
              Contacto
            </p>
            <div className="flex flex-col gap-2">
              {settings?.email && (
                <a
                  href={`mailto:${settings.email}`}
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  {settings.email}
                </a>
              )}
              {settings?.phone && (
                <a
                  href={`tel:${settings.phone}`}
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  {settings.phone}
                </a>
              )}
              {settings?.address && (
                <p className="text-sm text-white/70">{settings.address}</p>
              )}
              {settings?.city && (
                <p className="text-sm text-white/70">{settings.city}</p>
              )}
            </div>

            {/* Social */}
            {(settings?.linkedin || settings?.instagram || settings?.facebook) && (
              <div className="flex gap-4 mt-6">
                {settings?.linkedin && (
                  <a
                    href={settings.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/50 hover:text-white transition-colors text-sm"
                  >
                    LinkedIn
                  </a>
                )}
                {settings?.instagram && (
                  <a
                    href={settings.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/50 hover:text-white transition-colors text-sm"
                  >
                    Instagram
                  </a>
                )}
                {settings?.facebook && (
                  <a
                    href={settings.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/50 hover:text-white transition-colors text-sm"
                  >
                    Facebook
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} NEXE Estudio. Todos los derechos reservados.
          </p>
          <p className="text-xs text-white/30">Montevideo, Uruguay</p>
        </div>
      </div>
    </footer>
  )
}
