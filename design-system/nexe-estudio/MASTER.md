# Design System Master File — NEXE Estudio

> Alineado al **Sistema de Identidad Visual NEXE Estudio v1.0 — Mayo 2026** (manual interno).
> Cuando se construya una página específica, primero buscar `design-system/nexe-estudio/pages/[page].md`.
> Si existe, sus reglas **anulan** este Master.

---

**Project:** NEXE Estudio · Contabilidad y asesoramiento empresarial
**Origen:** Montevideo, Uruguay
**Esencia:** Orden, cercanía y continuidad
**Last sync con manual:** v1.0 / Mayo 2026

---

## Voz de marca

**Decimos:** frases cortas, verbo primero, compromiso concreto.
> "Resolvemos lo que hay que resolver, explicamos lo que hay que entender y acompañamos cada etapa."

**Evitamos:** inflación corporativa, adjetivos vacíos, anglicismos sin razón.
> ❌ "Brindamos soluciones tributarias 360º a través de un robusto ecosistema de servicios premium."

**Tres principios:**
1. **Claridad** — sin jerga, lo importante se entiende a la primera
2. **Continuidad** — acompañamiento mensual sostenido
3. **Cercanía** — trato directo (WhatsApp, teléfono, mail), no formularios

---

## Color (Manual sec. 03)

### Primarios

| Role | Hex | Tailwind | Uso |
|------|-----|----------|-----|
| Azul NEXE | `#1B2C46` | `navy` | Base institucional, texto, marca, CTAs |
| Celeste pivote | `#5BA3DD` | `blue-light` | Acento puntual, jerarquía, motivo gráfico |
| Blue medio | `#2C5F8A` | `blue` | Hover de navy, transición |

### Neutros

| Role | Hex | Tailwind | Uso |
|------|-----|----------|-----|
| Marfil | `#FBFAF7` | `marfil` / `bg-marfil` | **Superficie principal** (60% de la composición) |
| Marfil oscuro | `#F4F2EC` | `marfil-dark` / `bg-marfil-dark` | Secciones alternadas, cards sutiles |
| Gris medio | `#7B8597` | `gray-medium` / `gray-500` | Texto secundario, etiquetas |
| Negro tinta | `#0E1623` | `navy-ink` / `gray-900` | Para casos de máximo contraste |

### Motivo gráfico — cuadrados pivote (Manual sec. 05)

El cuadrado celeste del isotipo es la unidad básica del sistema. Aparece en composiciones de tres planos:

| Plano | Hex | Tailwind | Tamaño relativo |
|-------|-----|----------|-----------------|
| 01 · Tinte | `#EBF3FA` | `plane-tint` | Mayor — crea presencia sin saturar |
| 02 · Sólido | `#CFE2F2` | `plane-solid` | Intermedio — marca volumen |
| 03 · Acento | `#5BA3DD` | `blue-light` | Pequeño — única nota saturada |

**Usos:**
- **Marcador**: cuadradito blue-light antes de un eyebrow/sección destacada (ya integrado en `.tag::before`)
- **Separador**: línea fina con un cuadradito en cada extremo
- **Remate**: cuadrado pequeño al final de un bloque (utilidad `.square-mark`)

### Proporciones de uso (60/30/10)

- **60% Marfil** — superficie
- **18% Grises** — secundarios
- **12% Azul NEXE** — texto, marca
- **10% Celeste** — acento

> Regla de oro: el celeste **marca jerarquía pero no domina**. Si una sección se siente "muy celeste", reducí.

---

## Tipografía (Manual sec. 04)

Pareja editorial **sans-sans** + mono para datos.

- **Display / Headings:** `Archivo` (Google Fonts) — geométrica, mismo carácter que el logotipo "NEXE."
- **Body:** `Inter` (Google Fonts) — neutralidad, lectura
- **Datos / Eyebrows:** `JetBrains Mono` — etiquetas, números técnicos, metadatos

### Escala (alineada al manual)

| Token | Tamaño | Line height | Letter spacing | Peso | Uso |
|-------|--------|-------------|----------------|------|-----|
| `text-display` | `clamp(3rem, 6.5vw, 4.5rem)` | `0.95` | `-0.03em` | **800** (extrabold) | Hero / portada de sección |
| `text-h1-fluid` | `clamp(2rem, 4vw, 2.5rem)` | `1.05` | `-0.015em` | **700** (bold) | Títulos H1 |
| `text-h2-fluid` | `clamp(1.5rem, 2.6vw, 2rem)` | `1.1` | `-0.01em` | **700** (bold) | Subtítulos H2 |
| `text-xl` ~ `text-2xl` | — | `1.2` | — | **600** (semibold) | H3 (cards, equipo) |
| `text-lead` | `1.0625rem` | `1.55` | — | 400 | Introducciones (Inter) |
| `text-base` | `1rem` | `1.6` | — | 400 | Body (Inter) |
| `text-eyebrow` | `0.625rem` | `1` | `0.18em` | 500 UPPERCASE | Eyebrows / tags (JetBrains Mono) |

### Setup en Next.js

Cargado vía `next/font/google` en `src/app/(frontend)/layout.tsx`:

```ts
import { Inter, Archivo, JetBrains_Mono } from 'next/font/google'
```

CSS variables expuestas: `--font-inter`, `--font-archivo`, `--font-jetbrains-mono`
Clases Tailwind: `font-sans`, `font-display`, `font-mono`

---

## Spacing & Layout

| Token | Value | Uso |
|-------|-------|-----|
| `--space-md` | `16px` | Padding estándar |
| `--space-lg` | `24px` | Padding de card |
| `--space-xl` | `48px` | Gap entre subsecciones |
| `--space-2xl` | `96px` | Gap entre secciones (mobile: 64px) |
| `--space-3xl` | `144px` | Padding de hero (mobile: 80px) |

Utilidades:
- `.section` → `py-20 md:py-28 lg:py-32`
- `.container-nexe` → `max-w-6xl mx-auto px-6 md:px-8`

---

## Sombras

Sombras con tinte navy `rgba(14,22,35, ...)`. No negro puro.

| Clase | Uso |
|-------|-----|
| `shadow-nexe-sm` | Borders sutiles |
| `shadow-nexe-md` | Cards en hover |
| `shadow-nexe-lg` | Modals, dropdowns |
| `shadow-nexe-xl` | Hero featured |

---

## Componentes (Manual sec. 06)

### Botones

```tsx
// Primario — navy lleno, hover blue
<button className="btn-primary">Aceptar propuesta →</button>

// Outline — border navy, fondo marfil
<button className="btn-outline">Ver detalle →</button>

// Ghost — solo texto blue
<button className="btn-ghost">Contactar</button>
```

### Eyebrow / tag

JetBrains Mono uppercase con dot blue-light antes:

```tsx
<p className="tag">Sección 02 · Gestión mensual</p>
```

Sobre fondo oscuro, override del color:

```tsx
<p className="tag text-blue-light/90">Lo que hacemos</p>
```

### Cards

```tsx
<article className="bg-white border border-gray-200 rounded-xl p-8
                    hover:border-blue-light hover:shadow-nexe-md
                    hover:-translate-y-1 transition-all duration-200">
  ...
</article>
```

### Inputs

```tsx
<input className="w-full border border-gray-300 rounded-md px-4 py-3.5
                  focus:border-blue-light focus:ring-[3px] focus:ring-blue-light/20" />
```

### Pills (estado / etiqueta)

```tsx
<span className="text-eyebrow font-mono uppercase border border-navy/20
                 px-2 py-1 rounded">RECURRENTE</span>
```

---

## Estilo general

**Modern Minimal Corporate** sobre **base marfil**. Inspiración del manual: composiciones editoriales, mucho whitespace, jerarquía clara con Archivo Black, datos en mono.

**Reference brands:** propias decisiones del manual. NO copiar Stripe/Linear (esos son tech-monocromos sobre blanco; NEXE es contable-marfil con personalidad).

### Page Pattern

1. **Hero** — fondo navy, headline en Archivo 800, eyebrow en mono, CTA blanca
2. **Contenido** — fondo marfil, secciones generosas (`py-28`+), grids editoriales 12-col
3. **Sección alternada** — fondo `marfil-dark` para crear ritmo
4. **CTA banda navy** al final
5. **Footer** — navy con frase de cierre en Archivo

### Animations

- `200ms ease` para hover/focus
- `prefers-reduced-motion: reduce` respetado
- Sin carousels automáticos, parallax, ni autoplay

---

## Anti-Patterns (NO usar)

- ❌ **Fondos blancos puros** — usar marfil `#FBFAF7`. El blanco se reserva para cards elevadas
- ❌ **Headings en serif (Fraunces, Georgia)** — el sistema es sans-sans, Archivo
- ❌ **Tags en Inter widest** — los eyebrows son JetBrains Mono uppercase con tracking 0.18em
- ❌ Colores cálidos (naranja, rojo, dorado) — fuera de paleta
- ❌ Gradientes purple/pink "AI"
- ❌ Glassmorphism, neumorfismo
- ❌ Emojis como iconos
- ❌ Dark mode por defecto
- ❌ Inflación corporativa en copy ("soluciones 360º", "ecosistema premium")
- ❌ Sombras negro puro — usar tinte navy
- ❌ Botones con muchos colores — máximo 2 jerarquías (primary navy, outline)
- ❌ Celeste dominando una sección — máximo 10% de la composición

---

## Pre-Delivery Checklist

- [ ] Fondo principal en marfil, no blanco
- [ ] Headings en `font-display` (Archivo) con peso 700/800
- [ ] Eyebrows con clase `.tag` (font-mono uppercase)
- [ ] Body en Inter
- [ ] Datos numéricos / metadatos en mono
- [ ] Solo paleta del manual (navy, blue-light, blues mid, marfil, gray-medium)
- [ ] Celeste ≤ 10% de la composición visual
- [ ] Sin emojis como iconos
- [ ] `cursor-pointer` en clickeables
- [ ] Hovers con transición 150–300ms
- [ ] Contraste ≥ 4.5:1
- [ ] Focus visibles (ring blue-light)
- [ ] `prefers-reduced-motion` respetado
- [ ] Responsive 375 / 768 / 1024 / 1440
- [ ] Tap targets ≥ 44×44 en mobile
- [ ] Forms con `<label>` asociado
- [ ] Submit deshabilita durante request
- [ ] Voz de marca: frases cortas, verbo primero, sin inflación corporativa

---

## Page Overrides

Crear cuando se necesiten reglas específicas:

- `design-system/nexe-estudio/pages/nosotros.md`
- `design-system/nexe-estudio/pages/servicios.md`
- `design-system/nexe-estudio/pages/contacto.md`
