'use client'

import React, { useState } from 'react'

type Status = 'idle' | 'sending' | 'success' | 'error'

export default function ContactForm({ successMessage }: { successMessage?: string }) {
  const [status, setStatus] = useState<Status>('idle')
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
      <div className="bg-green-50 border border-green-200 rounded-sm p-8 text-center">
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-green-800 font-medium text-lg">
          {successMessage ?? '¡Gracias! Recibimos tu consulta y te contactamos pronto.'}
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-navy mb-2" htmlFor="name">
            Nombre <span className="text-blue">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-blue focus:ring-1 focus:ring-blue transition"
            placeholder="Tu nombre"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-navy mb-2" htmlFor="email">
            Email <span className="text-blue">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-blue focus:ring-1 focus:ring-blue transition"
            placeholder="tu@email.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-navy mb-2" htmlFor="phone">
            Teléfono
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-blue focus:ring-1 focus:ring-blue transition"
            placeholder="+598 99 000 000"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-navy mb-2" htmlFor="subject">
            Asunto
          </label>
          <select
            id="subject"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-blue focus:ring-1 focus:ring-blue transition bg-white"
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
        <label className="block text-sm font-medium text-navy mb-2" htmlFor="message">
          Mensaje <span className="text-blue">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-blue focus:ring-1 focus:ring-blue transition resize-none"
          placeholder="Contanos en qué podemos ayudarte..."
        />
      </div>

      {status === 'error' && (
        <p className="text-red-600 text-sm">
          Ocurrió un error al enviar. Por favor, intentá de nuevo.
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="btn-primary w-full md:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'sending' ? 'Enviando...' : 'Enviar consulta'}
      </button>
    </form>
  )
}
