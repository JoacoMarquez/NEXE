import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'
import ServiceIcon from '@/components/ServiceIcon'

export const metadata: Metadata = {
  title: 'Servicios',
}

export const revalidate = 60

async function getData() {
  try {
    const payload = await getPayload({ config })
    const [page, services] = await Promise.all([
      payload.findGlobal({ slug: 'servicios-page' }),
      payload.find({
        collection: 'services',
        sort: 'order',
        limit: 50,
      }),
    ])
    return { page, services: services.docs }
  } catch {
    return { page: null, services: [] }
  }
}

const defaultServices = [
  {
    id: 'default-1',
    name: 'Contabilidad General',
    description: 'Llevamos la contabilidad de tu empresa de forma ordenada y al día, cumpliendo con todas las obligaciones legales vigentes.',
    icon: 'balance',
    highlighted: true,
    order: 0,
  },
  {
    id: 'default-2',
    name: 'Liquidación de Impuestos',
    description: 'Asesoramiento y liquidación de impuestos (IRAE, IVA, IRPF, IRNR) optimizando la carga fiscal de tu negocio.',
    icon: 'taxes',
    highlighted: false,
    order: 1,
  },
  {
    id: 'default-3',
    name: 'Liquidación de Sueldos',
    description: 'Gestión integral de nómina, aportes al BPS, IRPF de dependientes y todo lo relacionado con los recursos humanos.',
    icon: 'payroll',
    highlighted: false,
    order: 2,
  },
  {
    id: 'default-4',
    name: 'Constitución de Sociedades',
    description: 'Asesoramiento para la creación y estructura de empresas (SRL, SA, Unipersonal) según tus necesidades.',
    icon: 'companies',
    highlighted: false,
    order: 3,
  },
  {
    id: 'default-5',
    name: 'Auditoría',
    description: 'Revisión y auditoría de estados financieros para brindar certeza y transparencia a socios, inversores y organismos.',
    icon: 'audit',
    highlighted: false,
    order: 4,
  },
  {
    id: 'default-6',
    name: 'Asesoramiento Empresarial',
    description: 'Consultoría estratégica y financiera para la toma de decisiones, planificación y crecimiento de tu negocio.',
    icon: 'advisory',
    highlighted: true,
    order: 5,
  },
]

export default async function ServiciosPage() {
  const { page, services } = await getData()

  const heroTitle = page?.heroTitle ?? 'Servicios y Soluciones'
  const heroSubtitle = page?.heroSubtitle ?? 'Soluciones contables y empresariales adaptadas a tu negocio.'
  const introText = page?.introText
  const ctaText = (page?.ctaText as string) ?? 'Consultar sobre un servicio'

  const displayServices = services.length > 0 ? services : defaultServices

  return (
    <>
      {/* Hero */}
      <section className="bg-navy text-white pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="tag text-blue-light mb-4">Lo que hacemos</p>
          <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6">{heroTitle}</h1>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl leading-relaxed">{heroSubtitle}</p>
        </div>
      </section>

      {/* Intro */}
      {introText && (
        <section className="py-14 px-6 border-b border-gray-100">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">{introText}</p>
          </div>
        </section>
      )}

      {/* Services grid */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayServices.map((service) => (
              <div
                key={service.id}
                className={`p-8 rounded-sm border transition-shadow hover:shadow-md ${
                  service.highlighted
                    ? 'border-blue bg-blue/5'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <div
                  className={`w-10 h-10 mb-5 ${
                    service.highlighted ? 'text-blue' : 'text-navy/60'
                  }`}
                >
                  <ServiceIcon name={service.icon ?? 'documents'} className="w-full h-full" />
                </div>
                {service.highlighted && (
                  <span className="inline-block text-xs font-semibold tracking-widest text-blue uppercase mb-3">
                    Destacado
                  </span>
                )}
                <h3 className="text-lg font-semibold text-navy mb-3">{service.name}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold text-navy mb-2">¿Necesitás un servicio específico?</h2>
            <p className="text-gray-600">Hablemos y encontramos la solución que mejor se adapta a vos.</p>
          </div>
          <Link href="/contacto" className="btn-primary shrink-0">
            {ctaText}
          </Link>
        </div>
      </section>
    </>
  )
}
