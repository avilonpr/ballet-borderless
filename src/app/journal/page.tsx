export const metadata = {
  title: "Journal — Ballet Borderless",
  description:
    "A curated collection of observations, interviews, and visual studies on the evolving geometry of movement.",
}

export default function JournalPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-24">
      {/* Header */}
      <div className="mb-20 border-b border-black/10 pb-16">
        <h1 className="font-heading text-6xl md:text-8xl italic mb-6 leading-none">
          JOURNAL
        </h1>
        <p className="text-sm text-black/60 tracking-wide max-w-lg leading-relaxed">
          A curated collection of observations, interviews, and visual studies
          on the evolving geometry of movement.
        </p>
      </div>

      {/* Coming soon */}
      <div>
        <p className="font-heading text-2xl italic mb-4">Coming Soon</p>
        <p className="text-sm text-black/60 tracking-wide leading-relaxed">
          Articles are on their way. Check back soon.
        </p>
      </div>
    </div>
  )
}
