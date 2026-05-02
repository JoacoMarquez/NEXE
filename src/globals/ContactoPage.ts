import type { GlobalConfig } from 'payload'

export const ContactoPage: GlobalConfig = {
  slug: 'contacto-page',
  label: 'Página — Contacto',
  admin: {
    group: 'Páginas',
  },
  fields: [
    {
      name: 'heroTitle',
      type: 'text',
      label: 'Título principal (Hero)',
      defaultValue: 'Contacto y Asesoramiento',
    },
    {
      name: 'heroSubtitle',
      type: 'text',
      label: 'Subtítulo (Hero)',
      defaultValue: 'Contanos en qué podemos ayudarte. Te respondemos a la brevedad.',
    },
    {
      name: 'formTitle',
      type: 'text',
      label: 'Título del formulario',
      defaultValue: 'Envianos una consulta',
    },
    {
      name: 'successMessage',
      type: 'text',
      label: 'Mensaje de éxito tras enviar el formulario',
      defaultValue: '¡Gracias! Recibimos tu consulta y te contactamos pronto.',
    },
  ],
}
