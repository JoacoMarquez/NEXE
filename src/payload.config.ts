import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Services } from './collections/Services'
import { Team } from './collections/Team'
import { Submissions } from './collections/Submissions'
import { SiteSettings } from './globals/SiteSettings'
import { NosotrosPage } from './globals/NosotrosPage'
import { ServiciosPage } from './globals/ServiciosPage'
import { ContactoPage } from './globals/ContactoPage'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const allowedOrigins = [
  process.env.NEXT_PUBLIC_SERVER_URL,
  'https://nexeestudio.com',
  'https://www.nexeestudio.com',
  'http://localhost:3000',
].filter((origin): origin is string => Boolean(origin))

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '— NEXE Admin',
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Services, Team, Submissions],
  globals: [SiteSettings, NosotrosPage, ServiciosPage, ContactoPage],
  cors: allowedOrigins,
  csrf: allowedOrigins,
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'default-secret-change-me',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
    push: process.env.NODE_ENV === 'development',
    migrationDir: './src/migrations',
  }),
  sharp,
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
})
