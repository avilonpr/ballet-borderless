import Image from "next/image"
import Link from "next/link"
import BallerinaSpin from "@/components/ballerina-spin"

interface Service {
  readonly name: string
  readonly price: string
  readonly unit: string
  readonly image: string
  readonly credit?: string
}

// Hoisted outside component — static data (server-hoist-static-io)
const SERVICES: readonly Service[] = [
  { name: "1.5 hour Group Zoom Ballet Classes (3-20 dancers Creative Movement to Novice)", price: "$7.15",   unit: "per dancer",  image: "/images/stage-1.jpg", credit: "Camila Álvez" },
  { name: "1.5 hour Group Zoom Ballet Classes (3-20 dancers Intermediate to Advanced)",    price: "$10.15",  unit: "per dancer",  image: "/images/stage-2.jpg", credit: "Camila Álvez" },
  { name: "1.5 hour Adult Beginner Group Zoom Classes (3 to 15 dancers)",                  price: "$12.99",  unit: "per dancer",  image: "/images/stage-3.jpg", credit: "Estela Maldonado" },
  { name: "Private Ballet Zoom Classes (1 to 2 dancers of all levels)",                    price: "$24.90",  unit: "per dancer",  image: "/images/stage-4.jpg", credit: "Conservatorio Ballet Concierto" },
  { name: "Group Pointe Zoom Classes (3 to 15 dancers Intermediate to Advanced)",          price: "$15.25",  unit: "per dancer",  image: "/images/stage-5.jpg", credit: "Gabriela Ruiz" },
  { name: "Private Pointe Zoom Classes (1 to 2 dancers)",                                  price: "$30.00",  unit: "per dancer",  image: "/images/stage-6.jpg", credit: "Gabriela Ruiz" },
  { name: "1 on 1 Variations Zoom Coaching",                                               price: "$45.50",  unit: "per session", image: "/images/stage-7.jpg", credit: "Alana Echevarría" },
  { name: "1 on 1 Original Choreography Zoom Coaching",                                    price: "$100.00", unit: "per piece",   image: "/images/stage-8.jpg", credit: "Carola Ricci" },
] as const

export default function HomePage() {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative h-screen w-full overflow-hidden">
        <Image
          src="/images/hero.jpg"
          alt="Ballet Borderless — Romi in outdoor grand jeté"
          fill
          className="object-cover"
          priority
        />
        {/* Gradient overlay — heavier at bottom so text above pops */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-black/60" />

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          {/* Eyebrow */}
          <p className="text-white/60 text-[10px] tracking-[0.65em] uppercase mb-8 font-light">
            Ballet Borderless
          </p>

          {/* Hero word — Syne italic */}
          <h1
            className="text-white text-[3.5rem] sm:text-[5.5rem] md:text-[7rem] lg:text-[11rem] font-light leading-none tracking-tight"
            style={{ fontFamily: "var(--font-syne)", fontStyle: "italic" }}
          >
            PRECISION
          </h1>

          {/* Tagline */}
          <p className="text-white/65 text-[11px] tracking-[0.45em] uppercase mt-10 font-light">
            Precision&nbsp;·&nbsp;Artistry&nbsp;·&nbsp;Access
          </p>
        </div>

        {/* Scroll indicator — thin line drop */}
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 pointer-events-none"
          aria-hidden="true"
        >
          <div className="w-px h-12 bg-white/30" />
        </div>
      </section>

      {/* ── BALLERINA SPIN ────────────────────────────────────────────────── */}
      <BallerinaSpin />

      {/* ── PHILOSOPHY ────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Left — text */}
          <div>
            <h2 className="font-heading text-4xl md:text-5xl italic mb-8 leading-tight">
              The Philosophy
            </h2>
            <div className="flex flex-col gap-5 text-base text-black/70 leading-relaxed max-w-md">
              <p>
                The idea behind Ballet Borderless is that everyone should have
                access to classical technique. Whatever your age, background or
                previous training, every body should experience the discipline
                and beauty of ballet.
              </p>
              <p>
                We teach everything from introductory movement to advanced
                variation coaching. Our curriculum is rigorous and structured
                and taught with care. We do not believe precision is exclusion.
                Precision is the most generous thing a teacher can give.
              </p>
              <p>
                Whether you&rsquo;re stepping on the barre for the first time,
                or prepping a competition solo, we meet you right where you are.
              </p>
            </div>
          </div>

          {/* Right — portrait */}
          <div className="aspect-[3/4] relative overflow-hidden">
            <Image
              src="/images/about.jpg"
              alt="Ballet Borderless — studio and instruction"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── SERVICES ──────────────────────────────────────────────────────── */}
      <section className="border-t border-black/10 py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-16">
            <h2 className="font-heading text-4xl md:text-5xl italic">
              Services
            </h2>
            <Link
              href="/booking"
              className="text-xs tracking-[0.2em] uppercase hover:opacity-50 transition-opacity"
            >
              Book Now →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-black/10">
            {SERVICES.map((service) => (
              <div key={service.name} className="bg-white flex flex-col">
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

                <div className="p-8 flex flex-col gap-4 flex-1">
                  <p className="text-xs tracking-[0.2em] uppercase text-black/40">
                    {service.unit}
                  </p>
                  <h3 className="font-heading text-lg leading-snug">
                    {service.name}
                  </h3>
                  <p className="font-heading text-3xl mt-auto">{service.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="py-36 flex flex-col items-center justify-center text-center px-6 border-t border-black/10">
        <h2 className="font-heading text-5xl md:text-7xl italic mb-10 leading-tight">
          Commit to the Art.
        </h2>
        <Link
          href="/booking"
          className="bg-black text-white text-xs tracking-[0.2em] uppercase px-10 py-4 hover:bg-black/80 transition-colors duration-200"
        >
          Make a Reservation
        </Link>
      </section>
    </>
  )
}
