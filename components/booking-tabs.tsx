'use client'

import { useState, type ChangeEvent, type FormEvent } from 'react'
import {
  validateBooking,
  VALID_CLASSES,
  FIELD_LIMITS,
  type BookingPayload,
  type FieldErrors,
} from '@/lib/booking-validation'

type Tab = 'trial' | 'enroll'
type Status = 'idle' | 'submitting' | 'success' | 'error'

interface FormValues {
  name: string
  email: string
  phone: string
  age_group: string
  class_preference: string
  message: string
  experience_years: string
  time_on_pointe: string
  consent: boolean
}

const INITIAL: FormValues = {
  name: '',
  email: '',
  phone: '',
  age_group: '',
  class_preference: '',
  message: '',
  experience_years: '',
  time_on_pointe: '',
  consent: false,
}

const AGE_GROUPS = [
  { value: 'child', label: 'Child (under 12)' },
  { value: 'youth', label: 'Youth (12–17)' },
  { value: 'adult', label: 'Adult (18+)' },
]

const inputClass =
  'w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-slate-800 ' +
  'placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-300 bg-white ' +
  'aria-[invalid=true]:border-red-400 aria-[invalid=true]:ring-red-200'

const labelClass =
  'block text-xs font-medium text-slate-500 uppercase tracking-widest mb-1.5'

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return (
    <p id={id} role="alert" className="mt-1 text-xs text-red-500">
      {message}
    </p>
  )
}

export default function BookingTabs() {
  const [activeTab, setActiveTab] = useState<Tab>('trial')
  const [values, setValues] = useState<FormValues>(INITIAL)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<Status>('idle')

  // Generic updater for string fields; clears that field's error on change.
  function setText(key: Exclude<keyof FormValues, 'consent'>) {
    return (
      e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    ) => {
      const value = e.target.value
      setValues((prev) => ({ ...prev, [key]: value }))
      if (errors[key as keyof FieldErrors]) {
        setErrors((prev) => {
          const next = { ...prev }
          delete next[key as keyof FieldErrors]
          return next
        })
      }
    }
  }

  function switchTab(tab: Tab) {
    setActiveTab(tab)
    setErrors({})
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setErrors({})

    const payload: BookingPayload = {
      name: values.name,
      email: values.email,
      phone: values.phone,
      age_group: values.age_group,
      class_preference: values.class_preference,
      message: values.message,
      booking_type: activeTab === 'trial' ? 'Trial Class' : 'Regular Enrollment',
      consent: values.consent ? 'on' : '',
      experience_years: values.experience_years,
      time_on_pointe: values.time_on_pointe,
    }

    // Client-side pre-flight using the same rules the server will enforce.
    // This gives instant feedback without a round-trip, but is NOT the
    // authoritative check — the server re-runs validateBooking independently.
    const fieldErrors = validateBooking(payload)
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors)
      return
    }

    setStatus('submitting')

    const body = new FormData()
    Object.entries(payload).forEach(([k, v]) => body.append(k, v))
    // Honeypot: intentionally empty — the server rejects anything non-empty here.
    body.append('website', '')

    try {
      const res = await fetch('/api/booking', { method: 'POST', body })

      if (res.ok) {
        setStatus('success')
        return
      }

      const json = await res.json().catch(() => ({}))
      if (json.errors) {
        setErrors(json.errors as FieldErrors)
        setStatus('idle')
      } else {
        setErrors({
          _form: (json.error as string | undefined) ?? 'Something went wrong. Please try again.',
        })
        setStatus('error')
      }
    } catch {
      setErrors({ _form: 'Network error. Please check your connection and try again.' })
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center py-12 px-6">
        <div className="text-5xl mb-4">🩰</div>
        <h3 className="text-2xl font-semibold text-slate-800 mb-2">
          You&apos;re on your way!
        </h3>
        <p className="text-slate-600 max-w-md mx-auto">
          Thank you for reaching out. Romi will review your request and get
          back to you within 24 hours.
        </p>
      </div>
    )
  }

  const busy = status === 'submitting'

  return (
    <div className="w-full">
      {/*
        Honeypot — visually hidden via off-screen positioning (not display:none,
        which bots can detect). Real users never see it; bots that auto-fill
        all fields populate it and are silently rejected by the server.
      */}
      <div
        aria-hidden="true"
        style={{ position: 'absolute', left: '-9999px', top: '-9999px', overflow: 'hidden' }}
      >
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>

      {/* Tab switcher */}
      <div className="flex border-b border-rose-100 mb-8">
        {(['trial', 'enroll'] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => switchTab(tab)}
            className={`flex-1 py-3 text-sm font-medium tracking-wide transition-colors ${
              activeTab === tab
                ? 'text-rose-500 border-b-2 border-rose-500'
                : 'text-slate-500 hover:text-rose-400'
            }`}
          >
            {tab === 'trial' ? 'Try a Class' : 'Enroll'}
          </button>
        ))}
      </div>

      {/* noValidate disables browser native popups so our messages are shown instead */}
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {errors._form && (
          <div
            role="alert"
            className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600"
          >
            {errors._form}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className={labelClass} htmlFor="name">
              Full Name *
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              maxLength={FIELD_LIMITS.name}
              value={values.name}
              onChange={setText('name')}
              placeholder="Your full name"
              className={inputClass}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
            <FieldError id="name-error" message={errors.name} />
          </div>

          <div>
            <label className={labelClass} htmlFor="email">
              Email *
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              maxLength={FIELD_LIMITS.email}
              value={values.email}
              onChange={setText('email')}
              placeholder="you@example.com"
              className={inputClass}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            <FieldError id="email-error" message={errors.email} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className={labelClass} htmlFor="phone">
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              maxLength={FIELD_LIMITS.phone}
              value={values.phone}
              onChange={setText('phone')}
              placeholder="+1 (555) 000-0000"
              className={inputClass}
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? 'phone-error' : undefined}
            />
            <FieldError id="phone-error" message={errors.phone} />
          </div>

          <div>
            <label className={labelClass} htmlFor="age_group">
              Age Group *
            </label>
            <select
              id="age_group"
              name="age_group"
              required
              value={values.age_group}
              onChange={setText('age_group')}
              className={inputClass}
              aria-invalid={!!errors.age_group}
              aria-describedby={errors.age_group ? 'age_group-error' : undefined}
            >
              <option value="" disabled>
                Select age group
              </option>
              {AGE_GROUPS.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            <FieldError id="age_group-error" message={errors.age_group} />
          </div>
        </div>

        <div>
          <label className={labelClass} htmlFor="class_preference">
            Preferred Class
          </label>
          <select
            id="class_preference"
            name="class_preference"
            value={values.class_preference}
            onChange={setText('class_preference')}
            className={inputClass}
            aria-invalid={!!errors.class_preference}
          >
            <option value="">Select a class</option>
            {VALID_CLASSES.map((cls) => (
              <option key={cls} value={cls}>
                {cls}
              </option>
            ))}
          </select>
          <FieldError id="class_preference-error" message={errors.class_preference} />
        </div>

        {/* Enroll-only fields */}
        {activeTab === 'enroll' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className={labelClass} htmlFor="experience_years">
                Years of Experience
              </label>
              <input
                id="experience_years"
                name="experience_years"
                type="number"
                min={FIELD_LIMITS.experienceYears.min}
                max={FIELD_LIMITS.experienceYears.max}
                value={values.experience_years}
                onChange={setText('experience_years')}
                placeholder="0"
                className={inputClass}
                aria-invalid={!!errors.experience_years}
                aria-describedby={errors.experience_years ? 'exp-error' : undefined}
              />
              <FieldError id="exp-error" message={errors.experience_years} />
            </div>

            <div>
              <label className={labelClass} htmlFor="time_on_pointe">
                Time on Pointe
              </label>
              <input
                id="time_on_pointe"
                name="time_on_pointe"
                type="text"
                maxLength={FIELD_LIMITS.timeOnPointe}
                value={values.time_on_pointe}
                onChange={setText('time_on_pointe')}
                placeholder="e.g. 2 years, never"
                className={inputClass}
                aria-invalid={!!errors.time_on_pointe}
                aria-describedby={errors.time_on_pointe ? 'pointe-error' : undefined}
              />
              <FieldError id="pointe-error" message={errors.time_on_pointe} />
            </div>
          </div>
        )}

        <div>
          <label className={labelClass} htmlFor="message">
            Questions or Notes
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            maxLength={FIELD_LIMITS.message}
            value={values.message}
            onChange={setText('message')}
            placeholder="Anything you'd like Romi to know…"
            className={`${inputClass} resize-none`}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? 'message-error' : undefined}
          />
          <div className="flex items-start justify-between mt-1">
            <FieldError id="message-error" message={errors.message} />
            <span className="text-xs text-slate-400 ml-auto tabular-nums">
              {values.message.length}/{FIELD_LIMITS.message}
            </span>
          </div>
        </div>

        {/* Consent — also validated server-side in /api/booking */}
        <div>
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="consent"
              checked={values.consent}
              onChange={(e) => {
                setValues((prev) => ({ ...prev, consent: e.target.checked }))
                if (errors.consent) {
                  setErrors((prev) => {
                    const next = { ...prev }
                    delete next.consent
                    return next
                  })
                }
              }}
              className="mt-0.5 h-4 w-4 rounded border-slate-300 accent-rose-400 focus:ring-2 focus:ring-rose-300"
              aria-describedby={errors.consent ? 'consent-error' : undefined}
            />
            <span className="text-sm text-slate-600">
              I agree to be contacted by Ballet Borderless regarding my enquiry.{' '}
              <span className="text-rose-400" aria-hidden="true">*</span>
            </span>
          </label>
          <FieldError id="consent-error" message={errors.consent} />
        </div>

        <button
          type="submit"
          disabled={busy}
          className="w-full rounded-lg bg-rose-400 hover:bg-rose-500 disabled:opacity-60 text-white text-sm font-medium tracking-wide py-3 transition-colors"
        >
          {busy
            ? 'Sending…'
            : activeTab === 'trial'
              ? 'Request Trial Class'
              : 'Submit Enrollment'}
        </button>
      </form>
    </div>
  )
}
