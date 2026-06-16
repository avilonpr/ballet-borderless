"use client"

import Image from "next/image"
import { useState } from "react"

interface ServiceOption {
  readonly name: string
  readonly description: string
  readonly price: string
  readonly unit: string
  readonly image: string
  readonly credit?: string
}

interface Tab {
  readonly id: string
  readonly label: string
  readonly services: readonly ServiceOption[]
}

interface FormState {
  fullName: string
  email: string
  experienceYears: string
  ageGroup: string
  timeOnPointe: string
  preferredDateTime: string
  selectedService: string
  consent: boolean
}

const TABS: readonly Tab[] = [
  {
    id: "group-ballet",
    label: "Group Ballet",
    services: [
      {
        name: "1.5 hour Group Zoom Ballet Classes (3-20 dancers Creative Movement to Novice)",
        description:
          "Live group Zoom classes covering creative movement through novice-level barre and centre work for beginning dancers.",
        price: "$7.15",
        unit: "per dancer",
        image: "/images/stage-1.jpg",
        credit: "Camila Álvez",
      },
      {
        name: "1.5 hour Group Zoom Ballet Classes (3-20 dancers Intermediate to Advanced)",
        description:
          "Live group Zoom classes for dancers with prior training, focusing on centre work, allegro, and advanced vocabulary.",
        price: "$10.15",
        unit: "per dancer",
        image: "/images/stage-2.jpg",
        credit: "Camila Álvez",
      },
      {
        name: "1.5 hour Adult Beginner Group Zoom Classes (3 to 15 dancers)",
        description:
          "A welcoming group Zoom class for adult newcomers to classical ballet, emphasizing technique and musicality.",
        price: "$12.99",
        unit: "per dancer",
        image: "/images/stage-3.jpg",
        credit: "Estela Maldonado",
      },
    ],
  },
  {
    id: "private-ballet",
    label: "Private Ballet",
    services: [
      {
        name: "Private Ballet Zoom Classes (1 to 2 dancers of all levels)",
        description:
          "Personalized one-on-one or duo instruction via Zoom for dancers of any level, tailored to your goals and technique.",
        price: "$24.90",
        unit: "per dancer",
        image: "/images/stage-4.jpg",
        credit: "Conservatorio Ballet Concierto",
      },
    ],
  },
  {
    id: "group-pointe",
    label: "Group Pointe",
    services: [
      {
        name: "Group Pointe Zoom Classes (3 to 15 dancers Intermediate to Advanced)",
        description:
          "Supervised group pointe work via Zoom for eligible intermediate and advanced dancers in a structured setting.",
        price: "$15.25",
        unit: "per dancer",
        image: "/images/stage-6.jpg",
        credit: "Gabriela Ruiz",
      },
    ],
  },
  {
    id: "private-pointe",
    label: "Private Pointe",
    services: [
      {
        name: "Private Pointe Zoom Classes (1 to 2 dancers)",
        description:
          "Individual or duo pointe instruction via Zoom, tailored to your strength, alignment, and readiness.",
        price: "$30.00",
        unit: "per dancer",
        image: "/images/stage-7.jpg",
        credit: "Alana Echevarría",
      },
    ],
  },
  {
    id: "coaching",
    label: "Coaching",
    services: [
      {
        name: "1 on 1 Variations Zoom Coaching",
        description:
          "One-on-one coaching via Zoom for classical or contemporary variations preparation and performance refinement.",
        price: "$45.50",
        unit: "per session",
        image: "/images/stage-5.jpg",
        credit: "Gabriela Ruiz",
      },
      {
        name: "1 on 1 Original Choreography Zoom Coaching",
        description:
          "Commission an original solo or group piece crafted to your music and vision. $10.99 per additional session after the initial appointment.",
        price: "$100.00",
        unit: "per piece",
        image: "/images/stage-8.jpg",
        credit: "Carola Ricci",
      },
    ],
  },
] as const

function stripHtml(str: string): string {
  return str.replace(/<[^>]*>/g, "")
}

const INITIAL_FORM: FormState = {
  fullName: "",
  email: "",
  experienceYears: "",
  ageGroup: "",
  timeOnPointe: "",
  preferredDateTime: "",
  selectedService: "",
  consent: false,
}

export function BookingTabs() {
  const [activeTab, setActiveTab] = useState<string>("group-ballet")
  const [form, setForm] = useState<FormState>(INITIAL_FORM)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [honeypot, setHoneypot] = useState("")

  const currentTab = TABS.find((t) => t.id === activeTab) ?? TABS[0]

  function handleTabChange(tabId: string) {
    setActiveTab(tabId)
    setForm((prev) => ({ ...prev, selectedService: "" }))
  }

  function handleField(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (honeypot) return
    setSubmitting(true)
    setSubmitError(null)

    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRe.test(form.email)) {
      setSubmitError("Please enter a valid email address.")
      setSubmitting(false)
      return
    }
    const expYears = Number(form.experienceYears)
    if (expYears < 0 || expYears > 60) {
      setSubmitError("Experience years must be between 0 and 60.")
      setSubmitting(false)
      return
    }
    if (!form.consent) {
      setSubmitError("Please agree to the terms and conditions.")
      setSubmitting(false)
      return
    }

    const sanitized = {
      ...form,
      fullName: stripHtml(form.fullName),
      timeOnPointe: stripHtml(form.timeOnPointe),
    }

    try {
      const res = await fetch("https://formspree.io/f/xnjylyje", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(sanitized),
      })
      if (res.ok) {
        setSubmitted(true)
      } else {
        const data: { error?: string } = await res.json().catch(() => ({}))
        setSubmitError(data.error ?? "Submission failed. Please try again.")
      }
    } catch {
      setSubmitError("Network error. Please check your connection and try again.")
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="border border-black p-12 text-center">
        <p className="font-heading text-2xl italic mb-3">
          Your placement has been reserved.
        </p>
        <p className="text-sm text-black/60 tracking-wide">
          We will be in touch within 24 hours to confirm your booking.
        </p>
        <button
          onClick={() => {
            setSubmitted(false)
            setForm(INITIAL_FORM)
          }}
          className="mt-8 text-xs tracking-[0.2em] uppercase underline underline-offset-4 hover:opacity-50 transition-opacity"
        >
          Make another reservation
        </button>
      </div>
    )
  }

  return (
    <div>
      {/* Tab buttons */}
      <div className="flex overflow-x-auto whitespace-nowrap border-b border-black/20 mb-12">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`flex-shrink-0 px-6 py-3 text-xs tracking-[0.2em] uppercase transition-all duration-200 ${
              activeTab === tab.id
                ? "border-b-2 border-black text-black font-medium"
                : "text-black/40 hover:text-black/70"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Service cards */}
      <div className={`grid gap-px bg-black/10 mb-16 ${currentTab.services.length >= 3 ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : currentTab.services.length === 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"}`}>
        {currentTab.services.map((service) => (
          <div key={service.name} className="bg-white flex flex-col">
            {/* Service image */}
            <div className="aspect-[4/3] relative overflow-hidden">
              <Image
                src={service.image}
                alt={service.name}
                fill
                className="object-cover"
              />
              {service.credit && (
                <span className="absolute bottom-2 left-2 bg-white/70 text-black/70 text-[10px] tracking-wide px-2 py-0.5 rounded-full">
                  {service.credit}
                </span>
              )}
            </div>

            {/* Service details */}
            <div className="p-8 flex flex-col gap-3 flex-1">
              <p className="text-xs tracking-[0.2em] uppercase text-black/40">
                {service.unit}
              </p>
              <h3 className="font-heading text-xl">{service.name}</h3>
              <p className="text-sm text-black/60 leading-relaxed flex-1">
                {service.description}
              </p>
              <p className="font-heading text-2xl mt-2">{service.price}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Booking form */}
      <div className="max-w-2xl">
        <h2 className="font-heading text-2xl mb-8">Reserve Your Place</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Honeypot — visually hidden, filled only by bots */}
          <input
            aria-hidden="true"
            tabIndex={-1}
            name="website"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            autoComplete="off"
            className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
          />

          {/* Service select */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="selectedService"
              className="text-xs tracking-[0.2em] uppercase"
            >
              Service *
            </label>
            <select
              id="selectedService"
              name="selectedService"
              value={form.selectedService}
              onChange={handleField}
              required
              className="border border-black/30 px-4 py-3 text-sm bg-white focus:outline-none focus:border-black transition-colors"
            >
              <option value="">Select a service</option>
              {currentTab.services.map((s) => (
                <option key={s.name} value={s.name}>
                  {s.name} — {s.price}
                </option>
              ))}
            </select>
          </div>

          {/* Full Name */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="fullName"
              className="text-xs tracking-[0.2em] uppercase"
            >
              Full Name *
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              value={form.fullName}
              onChange={handleField}
              required
              maxLength={100}
              placeholder="Your full name"
              className="border border-black/30 px-4 py-3 text-sm bg-white focus:outline-none focus:border-black transition-colors placeholder:text-black/30"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-xs tracking-[0.2em] uppercase"
            >
              Email *
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleField}
              required
              placeholder="your@email.com"
              className="border border-black/30 px-4 py-3 text-sm bg-white focus:outline-none focus:border-black transition-colors placeholder:text-black/30"
            />
          </div>

          {/* Experience + Age Group row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="experienceYears"
                className="text-xs tracking-[0.2em] uppercase"
              >
                Experience (years) *
              </label>
              <input
                id="experienceYears"
                name="experienceYears"
                type="number"
                min="0"
                max="60"
                value={form.experienceYears}
                onChange={handleField}
                required
                placeholder="0"
                className="border border-black/30 px-4 py-3 text-sm bg-white focus:outline-none focus:border-black transition-colors placeholder:text-black/30"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="ageGroup"
                className="text-xs tracking-[0.2em] uppercase"
              >
                Age Group *
              </label>
              <select
                id="ageGroup"
                name="ageGroup"
                value={form.ageGroup}
                onChange={handleField}
                required
                className="border border-black/30 px-4 py-3 text-sm bg-white focus:outline-none focus:border-black transition-colors"
              >
                <option value="">Select</option>
                <option value="child">Child (under 12)</option>
                <option value="youth">Youth 12–17</option>
                <option value="adult">Adult 18+</option>
              </select>
            </div>
          </div>

          {/* Time on Pointe */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="timeOnPointe"
              className="text-xs tracking-[0.2em] uppercase"
            >
              Time on Pointe (if applicable)
            </label>
            <input
              id="timeOnPointe"
              name="timeOnPointe"
              type="text"
              value={form.timeOnPointe}
              onChange={handleField}
              maxLength={100}
              placeholder="e.g. 2 years, 6 months, or N/A"
              className="border border-black/30 px-4 py-3 text-sm bg-white focus:outline-none focus:border-black transition-colors placeholder:text-black/30"
            />
          </div>

          {/* Preferred Date/Time */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="preferredDateTime"
              className="text-xs tracking-[0.2em] uppercase"
            >
              Preferred Date & Time *
            </label>
            <input
              id="preferredDateTime"
              name="preferredDateTime"
              type="datetime-local"
              value={form.preferredDateTime}
              onChange={handleField}
              required
              className="border border-black/30 px-4 py-3 text-sm bg-white focus:outline-none focus:border-black transition-colors"
            />
          </div>

          {/* Consent checkbox */}
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              name="consent"
              type="checkbox"
              checked={form.consent}
              onChange={handleField}
              required
              className="mt-1 h-4 w-4 border border-black accent-black flex-shrink-0"
            />
            <span className="text-xs leading-relaxed text-black/70">
              I agree to the Ballet Borderless{" "}
              <a
                href="/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 hover:opacity-50 transition-opacity"
              >
                terms and conditions
              </a>
            </span>
          </label>

          {submitError && (
            <p className="text-sm text-red-600">{submitError}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="mt-2 bg-black text-white text-xs tracking-[0.2em] uppercase px-8 py-4 hover:bg-black/80 transition-colors duration-200 self-start disabled:opacity-50"
          >
            {submitting ? "Sending…" : "Reserve Your Place"}
          </button>
        </form>
      </div>
    </div>
  )
}
