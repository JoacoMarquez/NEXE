import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'
import RichText from '@/components/RichText'

export const metadata: Metadata = {
  title: 'Nosotros',
}

export const revalidate = 60

async function getData() {
  try {
    const payload = await getPayload({ config })
    const [page, teamMembers] = await Promise.all([
      payload.findGlobal({ slug: 'nosotros-page' }),
      payload.find({
        collection: 'team',
        sort: 'order',
        limit: 10,
      }),
    ])
    return { page, team: teamMembers.docs }
  } catch {
    return { page: null, team: [] }
  }
}

export default async function NosotrosPage() {
  const { page, team } = await getData()

  const heroTitle = page?.heroTitle ?? 'Somos NEXE Estudio'
  const heroSubtitle =
    page?.heroSubtitle ?? 'Contabilidad y asesoramiento empresarial en Montevideo.'
  const aboutTitle = page?.aboutTitle ?? 'Quiénes somos'
  const valuesTitle = page?.valuesTitle ?? 'Nuestros valores'
  const teamTitle = page?.teamTitle ?? 'El equipo'

  return (
    <>
      {/* Hero */}
      <section className="bg-navy text-white pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="container-nexe">
          <p className="tag text-blue-light/90 mb-6">Estudio Contable & Empresarial</p>
          <h1 className="text-display font-display font-extrabold text-white text-balance leading-[0.95]">
            {heroTitle}
          </h1>
          <p className="text-lead text-white/75 max-w-2xl mt-8 leading-relaxed">
            {heroSubtitle}
          </p>
          <div className="flex flex-wrap gap-4 mt-12">
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 bg-white text-navy px-7 py-3.5 rounded-md font-sans font-medium tracking-tight hover:bg-blue-light hover:text-white transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
            >
              Contactanos
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/servicios"
              className="inline-flex items-center gap-2 border-[1.5px] border-white/30 text-white px-7 py-3.5 rounded-md font-sans font-medium tracking-tight hover:bg-white hover:text-navy hover:border-white transition-all duration-200 cursor-pointer"
            >
              Ver servicios
            </Link>
          </div>

          {/* Stats / divider editorial */}
          <div className="mt-20 md:mt-24 border-t border-white/10 pt-12 grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
            <div>
              <p className="text-h2-fluid font-display font-bold text-blue-light leading-none">
                100%
              </p>
              <p className="text-sm text-white/60 mt-3 leading-relaxed">
                Dedicación a cada cliente
              </p>
            </div>
            <div>
              <p className="text-h2-fluid font-display font-bold text-blue-light leading-none">
                MVD
              </p>
              <p className="text-sm text-white/60 mt-3 leading-relaxed">
                Montevideo, Uruguay
              </p>
            </div>
            <div className="col-span-2 md:col-span-1">
              <p className="text-h2-fluid font-display font-bold text-blue-light leading-none">
                ∞
              </p>
              <p className="text-sm text-white/60 mt-3 leading-relaxed">
                Soluciones a medida
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="section">
        <div className="container-nexe">
          <div className="grid md:grid-cols-12 gap-10 md:gap-16">
            <div className="md:col-span-4">
              <p className="tag mb-5">{aboutTitle}</p>
              <h2 className="text-h1-fluid font-display font-bold text-navy text-balance leading-[1.1]">
                Cercanía, claridad y compromiso.
              </h2>
            </div>
            <div className="md:col-span-8">
              {page?.aboutText ? (
                <RichText
                  content={page.aboutText as Record<string, unknown>}
                  className="text-gray-700 text-lg leading-relaxed max-w-2xl"
                />
              ) : (
                <div className="text-gray-700 text-lg leading-relaxed max-w-2xl space-y-5">
                  <p>
                    NEXE Estudio es un estudio contable y empresarial con sede en Montevideo,
                    Uruguay. Trabajamos con empresas y emprendedores brindando soluciones
                    integrales en contabilidad, impuestos, liquidación de sueldos y
                    asesoramiento empresarial.
                  </p>
                  <p>
                    Nuestra propuesta se basa en el acompañamiento cercano, la claridad en la
                    comunicación y el compromiso con los resultados de cada cliente.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      {page?.values && (page.values as unknown[]).length > 0 && (
        <section className="section bg-marfil-dark">
          <div className="container-nexe">
            <div className="max-w-2xl mb-14">
              <p className="tag mb-5">{valuesTitle}</p>
              <h2 className="text-h1-fluid font-display font-bold text-navy text-balance leading-[1.1]">
                Lo que nos define
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(page.values as { title: string; description?: string }[]).map((value, i) => (
                <article
                  key={i}
                  className="group bg-white p-8 rounded-xl border border-gray-200 transition-all duration-200 hover:border-blue-light hover:shadow-nexe-md hover:-translate-y-1"
                >
                  <p className="font-display font-bold text-blue-light text-2xl mb-6">
                    {String(i + 1).padStart(2, '0')}
                  </p>
                  <h3 className="font-display font-bold text-xl text-navy mb-3 leading-tight">
                    {value.title}
                  </h3>
                  {value.description && (
                    <p className="text-gray-600 text-base leading-relaxed">
                      {value.description}
                    </p>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Team */}
      {team.length > 0 && (
        <section className="section">
          <div className="container-nexe">
            <div className="max-w-2xl mb-14">
              <p className="tag mb-5">{teamTitle}</p>
              <h2 className="text-h1-fluid font-display font-bold text-navy text-balance leading-[1.1]">
                Las personas detrás del estudio
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {team.map((member) => (
                <article key={member.id} className="flex flex-col items-start">
                  {member.photo &&
                  typeof member.photo === 'object' &&
                  'url' in member.photo ? (
                    <div className="w-full aspect-[4/5] overflow-hidden rounded-xl mb-6 bg-gray-100">
                      <Image
                        src={(member.photo as { url: string }).url}
                        alt={member.name}
                        width={500}
                        height={625}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.02]"
                      />
                    </div>
                  ) : (
                    <div className="w-full aspect-[4/5] rounded-xl bg-gradient-to-br from-navy to-blue flex items-center justify-center mb-6">
                      <span className="font-display text-7xl font-medium text-white/40">
                        {member.name.charAt(0)}
                      </span>
                    </div>
                  )}
                  <h3 className="font-display font-bold text-2xl text-navy mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm text-blue tracking-wide font-medium">{member.role}</p>
                  {member.bio && (
                    <p className="text-gray-600 text-base mt-4 leading-relaxed">
                      {member.bio}
                    </p>
                  )}
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-blue hover:text-navy mt-4 font-medium group"
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
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA final */}
      <section className="bg-navy text-white py-24 md:py-32">
        <div className="container-nexe">
          <div className="max-w-3xl">
            <p className="tag text-blue-light/90 mb-5">Próximo paso</p>
            <h2 className="text-h1-fluid font-display font-bold text-balance leading-[1.1] mb-6">
              ¿Trabajamos juntos?
            </h2>
            <p className="text-lead text-white/70 max-w-xl leading-relaxed mb-10">
              Contanos tu situación y encontramos la mejor solución para tu empresa.
            </p>
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 bg-white text-navy px-7 py-3.5 rounded-md font-sans font-medium tracking-tight hover:bg-blue-light hover:text-white transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
            >
              Enviar consulta
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
