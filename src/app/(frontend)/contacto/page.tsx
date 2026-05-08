import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Contacto',
}

export const revalidate = 60

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
  const heroSubtitle =
    page?.heroSubtitle ?? 'Contanos en qué podemos ayudarte. Te respondemos a la brevedad.'
  const formTitle = page?.formTitle ?? 'Envianos una consulta'
  const successMessage = page?.successMessage as string | undefined

  return (
    <>
      {/* Hero */}
      <section className="bg-navy text-white pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="container-nexe">
          <p className="tag text-blue-light/90 mb-6">Hablemos</p>
          <h1 className="text-display font-display font-extrabold text-white text-balance leading-[0.95]">
            {heroTitle}
          </h1>
          <p className="text-lead text-white/75 max-w-2xl mt-8 leading-relaxed">
            {heroSubtitle}
          </p>
        </div>
      </section>

      {/* Contact content */}
      <section className="section">
        <div className="container-nexe">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Info column */}
            <aside className="lg:col-span-4">
              <p className="tag mb-5">Datos de contacto</p>
              <h2 className="text-h2-fluid font-display font-bold text-navy text-balance leading-[1.15] mb-10">
                Estamos a un mensaje de distancia.
              </h2>

              <dl className="space-y-7">
                {settings?.email && (
                  <div>
                    <dt className="text-xs font-sans font-semibold text-gray-500 uppercase tracking-widest mb-2">
                      Email
                    </dt>
                    <dd>
                      <a
                        href={`mailto:${settings.email}`}
                        className="text-navy hover:text-blue text-base font-medium transition-colors no-underline"
                      >
                        {settings.email}
                      </a>
                    </dd>
                  </div>
                )}
                {settings?.phone && (
                  <div>
                    <dt className="text-xs font-sans font-semibold text-gray-500 uppercase tracking-widest mb-2">
                      Teléfono / WhatsApp
                    </dt>
                    <dd>
                      <a
                        href={`tel:${settings.phone}`}
                        className="text-navy hover:text-blue text-base font-medium transition-colors no-underline"
                      >
                        {settings.phone}
                      </a>
                    </dd>
                  </div>
                )}
                {settings?.address && (
                  <div>
                    <dt className="text-xs font-sans font-semibold text-gray-500 uppercase tracking-widest mb-2">
                      Dirección
                    </dt>
                    <dd className="text-navy text-base font-medium">{settings.address}</dd>
                  </div>
                )}
                {settings?.city && (
                  <div>
                    <dt className="text-xs font-sans font-semibold text-gray-500 uppercase tracking-widest mb-2">
                      Ciudad
                    </dt>
                    <dd className="text-navy text-base font-medium">{settings.city}</dd>
                  </div>
                )}

                {(settings?.linkedin || settings?.instagram || settings?.facebook) && (
                  <div>
                    <dt className="text-xs font-sans font-semibold text-gray-500 uppercase tracking-widest mb-3">
                      Redes
                    </dt>
                    <dd className="flex flex-col gap-2">
                      {settings?.linkedin && (
                        <a
                          href={settings.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-blue hover:text-navy text-sm font-medium no-underline group transition-colors w-fit"
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
                          className="inline-flex items-center gap-1.5 text-blue hover:text-navy text-sm font-medium no-underline group transition-colors w-fit"
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
                          className="inline-flex items-center gap-1.5 text-blue hover:text-navy text-sm font-medium no-underline group transition-colors w-fit"
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
                    </dd>
                  </div>
                )}
              </dl>

              <div className="mt-12 p-6 bg-marfil-dark rounded-xl">
                <p className="text-sm text-gray-700 leading-relaxed">
                  Respondemos todas las consultas en un plazo máximo de{' '}
                  <strong className="text-navy font-semibold">24 horas hábiles</strong>.
                </p>
              </div>
            </aside>

            {/* Form column */}
            <div className="lg:col-span-8">
              <div className="bg-white border border-gray-200 rounded-2xl p-8 md:p-10 shadow-nexe-sm">
                <p className="tag mb-3">Formulario</p>
                <h2 className="text-h2-fluid font-display font-bold text-navy mb-8 leading-[1.15]">
                  {formTitle}
                </h2>
                <ContactForm successMessage={successMessage} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
