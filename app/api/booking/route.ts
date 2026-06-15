import { type NextRequest, NextResponse } from 'next/server'
import {
  validateBooking,
  stripHtml,
  type BookingPayload,
} from '@/lib/booking-validation'

// Server-only — no NEXT_PUBLIC_ prefix so this value is never bundled into client JS.
const FORMSPREE_ID = process.env.FORMSPREE_ID ?? ''

export async function POST(req: NextRequest) {
  let data: FormData
  try {
    data = await req.formData()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const get = (key: string): string => String(data.get(key) ?? '')

  // ── Honeypot ────────────────────────────────────────────────────────────────
  // The `website` field is hidden from real users via CSS. Bots that fill every
  // visible or hidden field will populate it and get silently rejected.
  // Return 200 so the bot believes it succeeded.
  if (get('website') !== '') {
    return NextResponse.json({ ok: true })
  }

  // ── Server-side validation ───────────────────────────────────────────────────
  // Runs independently of client-side checks so that bypassing the browser
  // form (e.g. via curl) still produces correct rejection responses.
  const payload: BookingPayload = {
    name: get('name'),
    email: get('email'),
    phone: get('phone'),
    age_group: get('age_group'),
    class_preference: get('class_preference'),
    message: get('message'),
    booking_type: get('booking_type'),
    consent: get('consent'),          // 'on' = checked, '' = unchecked
    experience_years: get('experience_years'),
    time_on_pointe: get('time_on_pointe'),
  }

  const errors = validateBooking(payload)
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 422 })
  }

  // ── Graceful no-op in dev when Formspree is not yet configured ───────────────
  if (!FORMSPREE_ID || FORMSPREE_ID === 'YOUR_FORM_ID') {
    console.warn(
      '[booking] FORMSPREE_ID not set — submission validated but not forwarded.',
    )
    return NextResponse.json({ ok: true })
  }

  // ── Sanitize then forward to Formspree ───────────────────────────────────────
  // Strip HTML from every free-text field before the data leaves our control.
  const clean = new URLSearchParams({
    name: stripHtml(payload.name),
    email: payload.email.trim(),
    phone: stripHtml(payload.phone),
    age_group: payload.age_group,
    class_preference: payload.class_preference,
    message: stripHtml(payload.message),
    booking_type: payload.booking_type,
    consent_given: 'Yes',
  })

  if (payload.experience_years.trim()) {
    clean.set('experience_years', payload.experience_years.trim())
  }
  if (payload.time_on_pointe.trim()) {
    clean.set('time_on_pointe', stripHtml(payload.time_on_pointe))
  }

  try {
    const upstream = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
      body: clean.toString(),
    })

    if (!upstream.ok) {
      console.error('[booking] Formspree returned', upstream.status)
      return NextResponse.json(
        { error: 'Submission failed. Please try again.' },
        { status: 502 },
      )
    }
  } catch (err) {
    console.error('[booking] Network error forwarding to Formspree', err)
    return NextResponse.json(
      { error: 'Network error. Please check your connection and try again.' },
      { status: 503 },
    )
  }

  return NextResponse.json({ ok: true })
}
