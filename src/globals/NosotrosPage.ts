import type { GlobalConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const NosotrosPage: GlobalConfig = {
  slug: 'nosotros-page',
  label: 'Página — Nosotros',
  admin: {
    group: 'Páginas',
  },
  fields: [
    {
      name: 'heroTitle',
      type: 'text',
      label: 'Título principal (Hero)',
      defaultValue: 'Somos NEXE Estudio',
    },
    {
      name: 'heroSubtitle',
      type: 'text',
      label: 'Subtítulo (Hero)',
      defaultValue: 'Contabilidad y asesoramiento empresarial en Montevideo.',
    },
    {
      name: 'aboutTitle',
      type: 'text',
      label: 'Título sección "Sobre nosotros"',
      defaultValue: 'Quiénes somos',
    },
    {
      name: 'aboutText',
      type: 'richText',
      label: 'Texto sobre el estudio',
      editor: lexicalEditor(),
    },
    {
      name: 'valuesTitle',
      type: 'text',
      label: 'Título sección "Valores"',
      defaultValue: 'Nuestros valores',
    },
    {
      name: 'values',
      type: 'array',
      label: 'Valores',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Título',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Descripción',
        },
      ],
    },
    {
      name: 'teamTitle',
      type: 'text',
      label: 'Título sección "Equipo"',
      defaultValue: 'El equipo',
    },
  ],
}
