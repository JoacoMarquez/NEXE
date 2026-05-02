import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Contacto',
}

async function getData() {
  try {
    const payload = await getPayload({ config })
    const [page, settings] = await Promise.all([
      payload.findGlobal({ slug: 'contacto-page' }),
      payload.findGlobal({ slug: 'site-settings' }),
    ])
    return { page, settings }
  } catch {
    return { page: null, settings: null }
  }
}

export default async function ContactoPage() {
  const { page, settings } = await getData()

  const heroTitle = page?.heroTitle ?? 'Contacto y Asesoramiento'
  const heroSubtitle = page?.heroSubtitle ?? 'Contanos en qué podemos ayudarte. Te respondemos a la brevedad.'
  const formTitle = page?.formTitle ?? 'Envianos una consulta'
  const successMessage = page?.successMessage as string | undefined

  return (
    <>
      {/* Hero */}
      <section className="bg-navy text-white pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="tag text-blue-light mb-4">Hablemos</p>
          <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6">{heroTitle}</h1>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl leading-relaxed">{heroSubtitle}</p>
        </div>
      </section>

      {/* Contact content */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Info */}
          <div className="lg:col-span-1">
            <p className="tag mb-6">Datos de contacto</p>
            <div className="space-y-6">
              {settings?.email && (
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">Email</p>
                  <a
                    href={`mailto:${settings.email}`}
                    className="text-navy hover:text-blue transition-colors font-medium"
                  >
                    {settings.email}
                  </a>
                </div>
              )}
              {settings?.phone && (
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">Teléfono / WhatsApp</p>
                  <a
                    href={`tel:${settings.phone}`}
                    className="text-navy hover:text-blue transition-colors font-medium"
                  >
                    {settings.phone}
                  </a>
                </div>
              )}
              {settings?.address && (
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">Dirección</p>
                  <p className="text-navy font-medium">{settings.address}</p>
                </div>
              )}
              {settings?.city && (
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">Ciudad</p>
                  <p className="text-navy font-medium">{settings.city}</p>
                </div>
              )}

              {(settings?.linkedin || settings?.instagram || settings?.facebook) && (
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Redes</p>
                  <div className="flex flex-col gap-2">
                    {settings?.linkedin && (
                      <a
                        href={settings.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue hover:underline text-sm"
                      >
                        LinkedIn →
                      </a>
                    )}
                    {settings?.instagram && (
                      <a
                        href={settings.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue hover:underline text-sm"
                      >
                        Instagram →
                      </a>
                    )}
                    {settings?.facebook && (
                      <a
                        href={settings.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue hover:underline text-sm"
                      >
                        Facebook →
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-10 p-6 bg-navy/5 border-l-4 border-blue rounded-r-sm">
              <p className="text-sm text-gray-600 leading-relaxed">
                Respondemos todas las consultas en un plazo máximo de <strong className="text-navy">24 horas hábiles</strong>.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <p className="tag mb-6">{formTitle}</p>
            <ContactForm successMessage={successMessage} />
          </div>
        </div>
      </section>
    </>
  )
}
