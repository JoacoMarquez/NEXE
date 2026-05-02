import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Resend } from 'resend'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, subject, message } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Faltan campos requeridos.' }, { status: 400 })
    }

    const payload = await getPayload({ config })

    await payload.create({
      collection: 'submissions',
      data: { name, email, phone: phone || '', subject: subject || '', message },
    })

    const destinationEmail = process.env.CONTACT_EMAIL
    if (destinationEmail && process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY)
      const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'

      await resend.emails.send({
        from: `NEXE Estudio <${fromEmail}>`,
        to: destinationEmail,
        subject: `Nueva consulta${subject ? `: ${subject}` : ''} — ${name}`,
        html: `
          <div style="font-family: Inter, Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: #1A2E4A; padding: 24px 32px;">
              <h1 style="color: white; margin: 0; font-size: 20px; font-weight: 700;">Nueva consulta recibida</h1>
            </div>
            <div style="padding: 32px; border: 1px solid #e9ecef; border-top: none;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #6c757d; font-size: 13px; width: 120px;">Nombre</td>
                  <td style="padding: 8px 0; color: #1A2E4A; font-weight: 600;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6c757d; font-size: 13px;">Email</td>
                  <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #2C5F8A;">${email}</a></td>
                </tr>
                ${phone ? `<tr><td style="padding: 8px 0; color: #6c757d; font-size: 13px;">Teléfono</td><td style="padding: 8px 0; color: #1A2E4A;">${phone}</td></tr>` : ''}
                ${subject ? `<tr><td style="padding: 8px 0; color: #6c757d; font-size: 13px;">Asunto</td><td style="padding: 8px 0; color: #1A2E4A;">${subject}</td></tr>` : ''}
              </table>
              <div style="margin-top: 24px; padding: 20px; background: #f8f9fa; border-left: 3px solid #2C5F8A; border-radius: 2px;">
                <p style="color: #6c757d; font-size: 13px; margin: 0 0 8px;">Mensaje</p>
                <p style="color: #1A2E4A; margin: 0; line-height: 1.6;">${message.replace(/\n/g, '<br>')}</p>
              </div>
              <div style="margin-top: 24px; text-align: center;">
                <a href="${process.env.NEXT_PUBLIC_SERVER_URL}/admin/collections/submissions"
                   style="display: inline-block; background: #2C5F8A; color: white; padding: 10px 24px; text-decoration: none; font-size: 13px; border-radius: 2px;">
                  Ver en el admin →
                </a>
              </div>
            </div>
            <div style="padding: 16px 32px; text-align: center;">
              <p style="color: #adb5bd; font-size: 12px; margin: 0;">NEXE Estudio · Montevideo, Uruguay</p>
            </div>
          </div>
        `,
      })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact form error:', err)
    return NextResponse.json({ error: 'Error interno del servidor.' }, { status: 500 })
  }
}
