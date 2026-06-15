// Shared validation — no imports, runs safely on client and server.

export const VALID_AGE_GROUPS = ['child', 'youth', 'adult'] as const
export type AgeGroup = (typeof VALID_AGE_GROUPS)[number]

export const VALID_CLASSES = [
  'Ballet Foundations',
  'Pointe Work',
  'Contemporary',
  'Kids Ballet',
  'Adult Beginner',
  'Private Coaching',
] as const
export type ClassOption = (typeof VALID_CLASSES)[number]

export const FIELD_LIMITS = {
  name: 100,
  email: 254,
  phone: 20,
  message: 1000,
  timeOnPointe: 100,
  experienceYears: { min: 0, max: 60 },
} as const

// RFC-5321-simplified pattern; rejects obvious typos without rejecting valid addresses.
const EMAIL_RE =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/

export function isValidEmail(value: string): boolean {
  return EMAIL_RE.test(value.trim()) && value.trim().length <= FIELD_LIMITS.email
}

/** Remove all HTML/script tags so free-text fields can never carry injected markup. */
export function stripHtml(value: string): string {
  return value.replace(/<[^>]*>/g, '').trim()
}

export interface BookingPayload {
  name: string
  email: string
  phone: string
  age_group: string
  class_preference: string
  message: string
  booking_type: string
  /** 'on' when checkbox is checked, '' when unchecked */
  consent: string
  /** Enroll-tab only; empty string when not provided */
  experience_years: string
  /** Enroll-tab only; empty string when not provided */
  time_on_pointe: string
}

export type FieldErrors = Partial<Record<keyof BookingPayload | '_form', string>>

const VALID_AGE_SET = new Set<string>(VALID_AGE_GROUPS)
const VALID_CLASS_SET = new Set<string>(['', ...VALID_CLASSES])

export function validateBooking(payload: BookingPayload): FieldErrors {
  const errors: FieldErrors = {}

  // name
  const name = payload.name.trim()
  if (!name) {
    errors.name = 'Full name is required.'
  } else if (name.length > FIELD_LIMITS.name) {
    errors.name = `Name must be ${FIELD_LIMITS.name} characters or fewer.`
  }

  // email
  const email = payload.email.trim()
  if (!email) {
    errors.email = 'Email address is required.'
  } else if (!isValidEmail(email)) {
    errors.email = 'Please enter a valid email address.'
  }

  // phone (optional, length cap only)
  if (payload.phone.length > FIELD_LIMITS.phone) {
    errors.phone = `Phone must be ${FIELD_LIMITS.phone} characters or fewer.`
  }

  // age_group
  if (!VALID_AGE_SET.has(payload.age_group)) {
    errors.age_group = 'Please select a valid age group.'
  }

  // class_preference (optional but must be in the allowed list if provided)
  if (!VALID_CLASS_SET.has(payload.class_preference)) {
    errors.class_preference = 'Please select a valid class option.'
  }

  // message
  if (payload.message.length > FIELD_LIMITS.message) {
    errors.message = `Message must be ${FIELD_LIMITS.message} characters or fewer.`
  }

  // experience_years (optional; 0–60 whole number when provided)
  const rawYears = payload.experience_years.trim()
  if (rawYears !== '') {
    const years = Number(rawYears)
    if (
      !Number.isInteger(years) ||
      years < FIELD_LIMITS.experienceYears.min ||
      years > FIELD_LIMITS.experienceYears.max
    ) {
      errors.experience_years = `Please enter a whole number between ${FIELD_LIMITS.experienceYears.min} and ${FIELD_LIMITS.experienceYears.max}.`
    }
  }

  // time_on_pointe (optional, length cap)
  if (payload.time_on_pointe.length > FIELD_LIMITS.timeOnPointe) {
    errors.time_on_pointe = `This field must be ${FIELD_LIMITS.timeOnPointe} characters or fewer.`
  }

  // consent — must be 'on' (checkbox checked)
  if (payload.consent !== 'on') {
    errors.consent = 'You must agree to be contacted before submitting.'
  }

  return errors
}
