'use client'

import React, { useState } from 'react'

type Status = 'idle' | 'sending' | 'success' | 'error'

const inputClass =
  'w-full border border-gray-300 rounded-md px-4 py-3.5 text-base text-navy bg-white placeholder:text-gray-400 ' +
  'focus:outline-none focus:border-blue-light focus:ring-[3px] focus:ring-blue-light/20 transition-all duration-200'

const labelClass = 'block text-sm font-sans font-medium text-navy mb-2'

export default function ContactForm({ successMessage }: { successMessage?: string }) {
  const [status, setStatus] = useState<Status>('idle')
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!res.ok) throw new Error('Error al enviar')

      setStatus('success')
      setForm({ name: '', email: '', phone: '', subject: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div
        role="status"
        aria-live="polite"
        className="bg-blue-light/10 border border-blue-light/30 rounded-xl p-8 md:p-10"
      >
        <div className="w-12 h-12 bg-white border border-blue-light/40 rounded-full flex items-center justify-center mb-5">
          <svg
            className="w-6 h-6 text-blue"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="font-display font-bold text-2xl text-navy mb-2 leading-tight">
          ¡Consulta enviada!
        </h3>
        <p className="text-gray-700 text-base leading-relaxed">
          {successMessage ?? 'Gracias por escribirnos. Te respondemos en menos de 24hs hábiles.'}
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className={labelClass} htmlFor="name">
            Nombre <span className="text-blue-light">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            value={form.name}
            onChange={handleChange}
            className={inputClass}
            placeholder="Tu nombre"
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="email">
            Email <span className="text-blue-light">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
            className={inputClass}
            placeholder="tu@email.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className={labelClass} htmlFor="phone">
            Teléfono <span className="text-gray-400 font-normal">(opcional)</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={handleChange}
            className={inputClass}
            placeholder="+598 99 000 000"
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="subject">
            Asunto <span className="text-gray-400 font-normal">(opcional)</span>
          </label>
          <select
            id="subject"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            className={inputClass + ' appearance-none cursor-pointer pr-10'}
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%231A2E4A' stroke-width='2'%3e%3cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'/%3e%3c/svg%3e\")",
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 14px center',
              backgroundSize: '18px',
            }}
          >
            <option value="">Seleccioná un tema</option>
            <option value="Contabilidad general">Contabilidad general</option>
            <option value="Liquidación de impuestos">Liquidación de impuestos</option>
            <option value="Liquidación de sueldos">Liquidación de sueldos</option>
            <option value="Constitución de sociedad">Constitución de sociedad</option>
            <option value="Auditoría">Auditoría</option>
            <option value="Asesoramiento empresarial">Asesoramiento empresarial</option>
            <option value="Otro">Otro</option>
          </select>
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="message">
          Mensaje <span className="text-blue-light">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={handleChange}
          className={inputClass + ' resize-none'}
          placeholder="Contanos en qué podemos ayudarte..."
        />
      </div>

      {status === 'error' && (
        <div
          role="alert"
          className="bg-red-50 border border-red-200 rounded-md px-4 py-3 text-sm text-red-800"
        >
          Ocurrió un error al enviar. Por favor, intentá de nuevo.
        </div>
      )}

      <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
        <p className="text-xs text-gray-500 leading-relaxed">
          Al enviar este formulario aceptás que tratemos tus datos para responderte.
        </p>
        <button
          type="submit"
          disabled={status === 'sending'}
          className="btn-primary w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
        >
          {status === 'sending' ? (
            <>
              <span
                className="inline-block w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"
                aria-hidden="true"
              />
              Enviando...
            </>
          ) : (
            <>
              Enviar consulta
              <span aria-hidden="true">→</span>
            </>
          )}
        </button>
      </div>
    </form>
  )
}
