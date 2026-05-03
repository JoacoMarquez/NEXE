import type { CollectionConfig } from 'payload'
import {
  revalidateCollectionAfterChange,
  revalidateCollectionAfterDelete,
} from '../hooks/revalidatePath'

export const Services: CollectionConfig = {
  slug: 'services',
  labels: {
    singular: 'Servicio',
    plural: 'Servicios',
  },
  admin: {
    useAsTitle: 'name',
    group: 'Contenido',
    defaultColumns: ['name', 'order', 'highlighted'],
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateCollectionAfterChange(['/servicios'])],
    afterDelete: [revalidateCollectionAfterDelete(['/servicios'])],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Nombre del servicio',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Descripción',
      required: true,
    },
    {
      name: 'icon',
      type: 'select',
      label: 'Ícono',
      options: [
        { label: 'Balance / Contabilidad', value: 'balance' },
        { label: 'Impuestos', value: 'taxes' },
        { label: 'Sueldos y RRHH', value: 'payroll' },
        { label: 'Sociedades', value: 'companies' },
        { label: 'Auditoría', value: 'audit' },
        { label: 'Asesoramiento', value: 'advisory' },
        { label: 'Documentos', value: 'documents' },
        { label: 'Moneda / Finanzas', value: 'finance' },
      ],
      defaultValue: 'documents',
    },
    {
      name: 'highlighted',
      type: 'checkbox',
      label: 'Destacado',
      defaultValue: false,
    },
    {
      name: 'order',
      type: 'number',
      label: 'Orden',
      defaultValue: 0,
    },
  ],
}
