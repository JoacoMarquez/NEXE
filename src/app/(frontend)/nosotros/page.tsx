import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'
import RichText from '@/components/RichText'

export const metadata: Metadata = {
  title: 'Nosotros',
}

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
  const heroSubtitle = page?.heroSubtitle ?? 'Contabilidad y asesoramiento empresarial en Montevideo.'
  const aboutTitle = page?.aboutTitle ?? 'Quiénes somos'
  const valuesTitle = page?.valuesTitle ?? 'Nuestros valores'
  const teamTitle = page?.teamTitle ?? 'El equipo'

  return (
    <>
      {/* Hero */}
      <section className="bg-navy text-white pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="tag text-blue-light mb-4">Estudio Contable & Empresarial</p>
          <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6">{heroTitle}</h1>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl leading-relaxed">{heroSubtitle}</p>
          <div className="flex gap-4 mt-10">
            <Link href="/contacto" className="btn-primary bg-blue-light hover:bg-blue text-white">
              Contactarnos
            </Link>
            <Link href="/servicios" className="btn-outline border-white/30 text-white hover:bg-white hover:text-navy">
              Ver servicios
            </Link>
          </div>
        </div>
        <div className="max-w-4xl mx-auto mt-16 border-t border-white/10 pt-10 grid grid-cols-2 md:grid-cols-3 gap-6">
          <div>
            <p className="text-3xl font-black text-blue-light">100%</p>
            <p className="text-sm text-white/60 mt-1">Dedicación a cada cliente</p>
          </div>
          <div>
            <p className="text-3xl font-black text-blue-light">MVD</p>
            <p className="text-sm text-white/60 mt-1">Montevideo, Uruguay</p>
          </div>
          <div>
            <p className="text-3xl font-black text-blue-light">∞</p>
            <p className="text-sm text-white/60 mt-1">Soluciones a medida</p>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="tag mb-4">{aboutTitle}</p>
          {page?.aboutText ? (
            <RichText
              content={page.aboutText as Record<string, unknown>}
              className="text-gray-700 text-lg leading-relaxed max-w-3xl"
            />
          ) : (
            <p className="text-gray-700 text-lg leading-relaxed max-w-3xl">
              NEXE Estudio es un estudio contable y empresarial con sede en Montevideo, Uruguay.
              Trabajamos con empresas y emprendedores brindando soluciones integrales en
              contabilidad, impuestos, liquidación de sueldos y asesoramiento empresarial.
              <br /><br />
              Nuestra propuesta se basa en el acompañamiento cercano, la claridad en la
              comunicación y el compromiso con los resultados de cada cliente.
            </p>
          )}
        </div>
      </section>

      {/* Values */}
      {page?.values && (page.values as unknown[]).length > 0 && (
        <section className="py-20 px-6 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <p className="tag mb-4">{valuesTitle}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              {(page.values as { title: string; description?: string }[]).map((value, i) => (
                <div key={i} className="bg-white p-8 rounded-sm border border-gray-100 shadow-sm">
                  <div className="w-8 h-1 bg-blue mb-5" />
                  <h3 className="text-lg font-semibold text-navy mb-3">{value.title}</h3>
                  {value.description && (
                    <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Team */}
      {team.length > 0 && (
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <p className="tag mb-4">{teamTitle}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
              {team.map((member) => (
                <div key={member.id} className="flex flex-col items-start">
                  {member.photo && typeof member.photo === 'object' && 'url' in member.photo ? (
                    <div className="w-full aspect-square overflow-hidden rounded-sm mb-4 bg-gray-100">
                      <Image
                        src={(member.photo as { url: string }).url}
                        alt={member.name}
                        width={400}
                        height={400}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-24 h-24 rounded-sm bg-navy/10 flex items-center justify-center mb-4">
                      <span className="text-3xl font-black text-navy/40">
                        {member.name.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div className="w-6 h-0.5 bg-blue mb-3" />
                  <h3 className="text-lg font-semibold text-navy">{member.name}</h3>
                  <p className="text-sm text-blue tracking-wide">{member.role}</p>
                  {member.bio && (
                    <p className="text-gray-600 text-sm mt-3 leading-relaxed">{member.bio}</p>
                  )}
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue hover:underline mt-3"
                    >
                      LinkedIn →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 px-6 bg-navy text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">¿Trabajamos juntos?</h2>
          <p className="text-white/60 mb-8 text-lg">
            Contanos tu situación y encontramos la mejor solución para tu empresa.
          </p>
          <Link href="/contacto" className="btn-primary bg-blue-light hover:bg-blue">
            Enviar consulta
          </Link>
        </div>
      </section>
    </>
  )
}
