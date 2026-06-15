export const metadata = {
  title: "Resources — Ballet Borderless",
  description:
    "A curated collection of physical assets designed to deepen your practice.",
}

interface ResourceSection {
  readonly index: string
  readonly category: string
}

const SECTIONS: readonly ResourceSection[] = [
  { index: "01 / 03", category: "Coloring Pages" },
  { index: "02 / 03", category: "Practice Journals" },
  { index: "03 / 03", category: "Technical Worksheets" },
] as const

export default function ResourcesPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-24">
      {/* Header */}
      <div className="mb-20 border-b border-black/10 pb-16">
        <h1 className="font-heading text-6xl md:text-8xl italic mb-6 leading-none">
          RESOURCES
        </h1>
        <p className="text-sm text-black/60 tracking-wide max-w-lg leading-relaxed">
          A curated collection of physical assets designed to deepen your
          practice. New additions each season.
        </p>
      </div>

      {/* Sections */}
      <div className="flex flex-col gap-24">
        {SECTIONS.map((section) => (
          <section key={section.category}>
            {/* Section header */}
            <div className="flex items-end justify-between mb-10 pb-4 border-b border-black/10">
              <h2 className="font-heading text-3xl md:text-4xl italic">
                {section.category}
              </h2>
              <span className="text-xs tracking-[0.2em] text-black/40">
                {section.index}
              </span>
            </div>

            {/* Coming soon message */}
            <p className="text-sm text-black/40 tracking-wide text-center py-16">
              Coming Soon — downloadable resources will be available here soon.
            </p>
          </section>
        ))}
      </div>
    </div>
  )
}
