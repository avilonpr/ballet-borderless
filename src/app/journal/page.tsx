import Image from "next/image"

export const metadata = {
  title: "Journal — Ballet Borderless",
  description:
    "A curated collection of observations, interviews, and visual studies on the evolving geometry of movement.",
}

interface Article {
  readonly title: string
  readonly category: string
  readonly date: string
  readonly excerpt: string
  readonly image: string
}

const ARTICLES: readonly Article[] = [
  {
    title: "Symmetry in Shadow",
    category: "Essay",
    date: "May 2026",
    excerpt:
      "On the paradox of perfect bilateral form and the way asymmetry, when controlled, becomes expression rather than error.",
    image: "/images/stage-5.jpg",
  },
  {
    title: "The Anatomy of a Pas de Deux: Tension and Trust",
    category: "Interview",
    date: "April 2026",
    excerpt:
      "A conversation on the invisible grammar of partnering — counterbalance, anticipation, and the architecture of two bodies in dialogue.",
    image: "/images/stage-6.jpg",
  },
  {
    title: "Defining the Void: Minimalism in Contemporary Choreography",
    category: "Visual Study",
    date: "March 2026",
    excerpt:
      "How stillness, negative space, and deliberate absence have become among the most potent choreographic tools of the present moment.",
    image: "/images/stage-7.jpg",
  },
] as const

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

      {/* Article grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-black/10">
        {ARTICLES.map((article) => (
          <article key={article.title} className="bg-white flex flex-col">
            {/* Article image */}
            <div className="aspect-[4/3] relative overflow-hidden">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Card body */}
            <div className="p-8 flex flex-col gap-4 flex-1">
              <div className="flex items-center justify-between">
                <span className="text-xs tracking-[0.2em] uppercase text-black/40">
                  {article.category}
                </span>
                <span className="text-xs text-black/40">{article.date}</span>
              </div>
              <h2 className="font-heading text-xl leading-snug">
                {article.title}
              </h2>
              <p className="text-sm text-black/60 leading-relaxed flex-1">
                {article.excerpt}
              </p>
              <button className="self-start text-xs tracking-[0.2em] uppercase underline underline-offset-4 hover:opacity-50 transition-opacity mt-2">
                Read more →
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
