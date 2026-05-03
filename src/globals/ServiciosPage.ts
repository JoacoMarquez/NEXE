import type { GlobalConfig } from 'payload'
import { revalidateGlobal } from '../hooks/revalidatePath'

export const ServiciosPage: GlobalConfig = {
  slug: 'servicios-page',
  label: 'Página — Servicios',
  admin: {
    group: 'Páginas',
  },
  hooks: {
    afterChange: [revalidateGlobal(['/servicios'])],
  },
  fields: [
    {
      name: 'heroTitle',
      type: 'text',
      label: 'Título principal (Hero)',
      defaultValue: 'Servicios y Soluciones',
    },
    {
      name: 'heroSubtitle',
      type: 'text',
      label: 'Subtítulo (Hero)',
      defaultValue: 'Soluciones contables y empresariales adaptadas a tu negocio.',
    },
    {
      name: 'introText',
      type: 'textarea',
      label: 'Texto introductorio',
    },
    {
      name: 'ctaText',
      type: 'text',
      label: 'Texto del botón CTA',
      defaultValue: 'Consultar sobre un servicio',
    },
  ],
}
