"use client"

import Image from "next/image"
import { useState } from "react"

interface ServiceOption {
  readonly name: string
  readonly description: string
  readonly price: string
  readonly unit: string
  readonly image: string
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
    id: "foundations",
    label: "Foundations",
    services: [
      {
        name: "Group Class — Creative & Novice",
        description:
          "Introductory movement vocabulary, musicality, and barre fundamentals for beginning dancers.",
        price: "$7.15",
        unit: "per dancer",
        image: "/images/stage-1.jpg",
      },
      {
        name: "Adult Beginner Group",
        description:
          "A welcoming, technique-first environment for adult newcomers to classical ballet.",
        price: "$12.99",
        unit: "per dancer",
        image: "/images/stage-2.jpg",
      },
      {
        name: "Ballet Foundations — Ages 5–7",
        description:
          "An introduction to ballet vocabulary, posture, and basic barre work designed for young beginners.",
        price: "$9.50",
        unit: "per dancer",
        image: "/images/stage-3.jpg",
      },
    ],
  },
  {
    id: "intermediate",
    label: "Intermediate",
    services: [
      {
        name: "Group Class — Intermediate & Advanced",
        description:
          "Centre work, allegro, and advanced vocabulary for dancers with prior training.",
        price: "$10.15",
        unit: "per dancer",
        image: "/images/stage-4.jpg",
      },
      {
        name: "Variations Coaching",
        description:
          "One-on-one coaching for classical and contemporary variations preparation.",
        price: "$45.50",
        unit: "per session",
        image: "/images/stage-5.jpg",
      },
    ],
  },
  {
    id: "pointe",
    label: "Pointe",
    services: [
      {
        name: "Group Pointe",
        description:
          "Supervised pointe work in a structured group setting for eligible dancers.",
        price: "$15.25",
        unit: "per dancer",
        image: "/images/stage-6.jpg",
      },
      {
        name: "Private Pointe",
        description:
          "Individual pointe instruction tailored to your strength, alignment, and goals.",
        price: "$30.00",
        unit: "per dancer",
        image: "/images/stage-7.jpg",
      },
    ],
  },
  {
    id: "private",
    label: "Private",
    services: [
      {
        name: "Private Ballet",
        description:
          "Personalized one-on-one instruction addressing your specific technique and artistry.",
        price: "$24.90",
        unit: "per dancer",
        image: "/images/stage-8.jpg",
      },
      {
        name: "Variations Coaching",
        description:
          "Detailed coaching for audition or performance repertoire.",
        price: "$45.50",
        unit: "per session",
        image: "/images/stage-9.jpg",
      },
      {
        name: "Original Choreography",
        description:
          "Commission a bespoke solo or group piece crafted to your music and vision.",
        price: "$100.00",
        unit: "per piece",
        image: "/images/stage-3.jpg",
      },
    ],
  },
] as const

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
  const [activeTab, setActiveTab] = useState<string>("foundations")
  const [form, setForm] = useState<FormState>(INITIAL_FORM)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

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
    setSubmitting(true)
    setSubmitError(null)
    try {
      const res = await fetch("https://formspree.io/f/xnjylyje", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
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
      <div className="flex border-b border-black/20 mb-12">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`px-6 py-3 text-xs tracking-[0.2em] uppercase transition-all duration-200 ${
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
      <div className={`grid gap-px bg-black/10 mb-16 ${currentTab.services.length >= 3 ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1 md:grid-cols-2"}`}>
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
          <div className="grid grid-cols-2 gap-4">
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
              I agree to the Ballet Borderless terms and conditions
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
