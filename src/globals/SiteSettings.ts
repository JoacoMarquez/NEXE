import type { GlobalConfig } from 'payload'
import { revalidateGlobal } from '../hooks/revalidatePath'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Configuración del Sitio',
  admin: {
    group: 'Configuración',
  },
  hooks: {
    afterChange: [revalidateGlobal(['/nosotros', '/servicios', '/contacto'])],
  },
  fields: [
    {
      name: 'tagline',
      type: 'text',
      label: 'Tagline / Slogan',
    },
    {
      label: 'Contacto',
      type: 'collapsible',
      fields: [
        {
          name: 'email',
          type: 'email',
          label: 'Email de contacto',
        },
        {
          name: 'phone',
          type: 'text',
          label: 'Teléfono / WhatsApp',
        },
        {
          name: 'address',
          type: 'text',
          label: 'Dirección',
        },
        {
          name: 'city',
          type: 'text',
          label: 'Ciudad',
          defaultValue: 'Montevideo, Uruguay',
        },
      ],
    },
    {
      label: 'Redes Sociales',
      type: 'collapsible',
      fields: [
        {
          name: 'linkedin',
          type: 'text',
          label: 'LinkedIn URL',
        },
        {
          name: 'instagram',
          type: 'text',
          label: 'Instagram URL',
        },
        {
          name: 'facebook',
          type: 'text',
          label: 'Facebook URL',
        },
      ],
    },
    {
      name: 'contactEmail',
      type: 'email',
      label: 'Email para recibir consultas del formulario',
      admin: {
        description: 'Las consultas del formulario de contacto llegarán a esta dirección.',
      },
    },
  ],
}
