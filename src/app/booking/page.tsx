import { BookingTabs } from "@/components/booking-tabs"

export const metadata = {
  title: "Reservations — Ballet Borderless",
  description: "Secure your placement in our digital studio.",
}

export default function BookingPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-24">
      {/* Header */}
      <div className="mb-16 border-b border-black/10 pb-16">
        <h1 className="font-heading text-6xl md:text-8xl italic mb-6 leading-none">
          RESERVATIONS
        </h1>
        <p className="text-sm text-black/60 tracking-wide max-w-md leading-relaxed">
          Secure your placement in our digital studio. Select a discipline,
          choose your service, and complete the form below.
        </p>
      </div>

      {/* Tab-driven booking interface (client component) */}
      <BookingTabs />
    </div>
  )
}
