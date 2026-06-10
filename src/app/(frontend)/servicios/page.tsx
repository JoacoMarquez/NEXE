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
    description:
      'Llevamos la contabilidad de tu empresa de forma ordenada y al día, cumpliendo con todas las obligaciones legales vigentes.',
    icon: 'balance',
    highlighted: true,
    order: 0,
  },
  {
    id: 'default-2',
    name: 'Liquidación de Impuestos',
    description:
      'Asesoramiento y liquidación de impuestos (IRAE, IVA, IRPF, IRNR) optimizando la carga fiscal de tu negocio.',
    icon: 'taxes',
    highlighted: false,
    order: 1,
  },
  {
    id: 'default-3',
    name: 'Liquidación de Sueldos',
    description:
      'Gestión integral de nómina, aportes al BPS, IRPF de dependientes y todo lo relacionado con los recursos humanos.',
    icon: 'payroll',
    highlighted: false,
    order: 2,
  },
  {
    id: 'default-4',
    name: 'Constitución de Sociedades',
    description:
      'Asesoramiento para la creación y estructura de empresas (SRL, SA, Unipersonal) según tus necesidades.',
    icon: 'companies',
    highlighted: false,
    order: 3,
  },
  {
    id: 'default-5',
    name: 'Auditoría',
    description:
      'Revisión y auditoría de estados financieros para brindar certeza y transparencia a socios, inversores y organismos.',
    icon: 'audit',
    highlighted: false,
    order: 4,
  },
  {
    id: 'default-6',
    name: 'Asesoramiento Empresarial',
    description:
      'Consultoría estratégica y financiera para la toma de decisiones, planificación y crecimiento de tu negocio.',
    icon: 'advisory',
    highlighted: true,
    order: 5,
  },
]

export default async function ServiciosPage() {
  const { page, services } = await getData()

  const heroTitle = page?.heroTitle ?? 'Servicios y Soluciones'
  const heroSubtitle =
    page?.heroSubtitle ?? 'Soluciones contables y empresariales adaptadas a tu negocio.'
  const introText = page?.introText as string | undefined
  const ctaText = (page?.ctaText as string) ?? 'Consultar sobre un servicio'

  const displayServices = services.length > 0 ? services : defaultServices

  return (
    <>
      {/* Hero */}
      <section className="bg-navy text-white pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="container-nexe">
          <p className="tag text-blue-light/90 mb-6">Lo que hacemos</p>
          <h1 className="text-display font-display font-extrabold text-white text-balance leading-[0.95]">
            {heroTitle}
          </h1>
          <p className="text-lead text-white/75 max-w-2xl mt-8 leading-relaxed">
            {heroSubtitle}
          </p>
        </div>
      </section>

      {/* Intro (opcional) */}
      {introText && (
        <section className="py-16 md:py-20 border-b border-gray-200">
          <div className="container-nexe">
            <p className="text-lead text-gray-700 leading-relaxed max-w-3xl">{introText}</p>
          </div>
        </section>
      )}

      {/* Services grid */}
      <section className="section">
        <div className="container-nexe">
          <div className="max-w-2xl mb-14">
            <p className="tag mb-5">Áreas de trabajo</p>
            <h2 className="text-h1-fluid font-display font-bold text-navy text-balance leading-[1.1]">
              Una propuesta integral para tu empresa
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayServices.map((service, i) => (
              <article
                key={service.id}
                className={`group relative p-8 rounded-xl border transition-all duration-200 hover:-translate-y-1 hover:shadow-nexe-md ${
                  service.highlighted
                    ? 'border-blue/40 bg-blue/5 hover:border-blue'
                    : 'border-gray-200 bg-white hover:border-blue-light'
                }`}
              >
                {service.highlighted && (
                  <span className="absolute top-6 right-6 text-[10px] font-sans font-semibold tracking-widest text-blue uppercase bg-white border border-blue/20 px-2 py-1 rounded">
                    Destacado
                  </span>
                )}
                <div className="flex items-baseline gap-3 mb-6">
                  <span className="font-display font-bold text-blue-light text-sm tracking-wide">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div
                    className={`w-10 h-10 ${
                      service.highlighted ? 'text-blue' : 'text-navy/70'
                    } transition-colors duration-200 group-hover:text-blue`}
                  >
                    <ServiceIcon name={service.icon ?? 'documents'} className="w-full h-full" />
                  </div>
                </div>
                <h3 className="font-display font-bold text-xl text-navy mb-3 leading-tight">
                  {service.name}
                </h3>
                <p className="text-gray-600 text-base leading-relaxed">{service.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA banda */}
      <section className="bg-navy text-white py-20 md:py-28">
        <div className="container-nexe">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10">
            <div className="max-w-2xl">
              <p className="tag text-blue-light/90 mb-5">¿Buscás algo más específico?</p>
              <h2 className="text-h1-fluid font-display font-bold text-white text-balance leading-[1.1]">
                Hablemos y encontramos la solución a medida.
              </h2>
            </div>
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 bg-white text-navy px-7 py-3.5 rounded-md font-sans font-medium tracking-tight hover:bg-blue-light hover:text-white transition-all duration-200 hover:-translate-y-0.5 cursor-pointer shrink-0"
            >
              {ctaText}
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
