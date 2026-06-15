import type { Metadata } from 'next'
import Navbar from '@/components/navbar'

export const metadata: Metadata = {
  title: 'Journal — Ballet Borderless',
  description:
    'Thoughts, reflections, and stories from Romi at Ballet Borderless.',
}

interface Post {
  slug: string
  title: string
  date: string
  category: string
  excerpt: string
}

const POSTS: Post[] = [
  {
    slug: 'why-ballet-is-for-everyone',
    title: 'Why Ballet Is for Everyone',
    date: 'May 12, 2025',
    category: 'Philosophy',
    excerpt:
      'For too long, ballet has been seen as a pursuit for the young, the slim, and the classically trained. At Ballet Borderless, we believe differently. Movement is a birthright, and the studio is a place where every body can find grace.',
  },
  {
    slug: 'the-art-of-beginning',
    title: 'The Art of Beginning',
    date: 'April 3, 2025',
    category: 'Teaching',
    excerpt:
      "There's a particular kind of courage in stepping into a ballet class as an adult beginner. You stand at the barre and everything is unfamiliar. But that unfamiliarity is exactly where growth lives. Here's what I've learned from teaching adults who are brave enough to start.",
  },
  {
    slug: 'pointe-shoes-the-long-conversation',
    title: 'Pointe Shoes: The Long Conversation',
    date: 'March 18, 2025',
    category: 'Craft',
    excerpt:
      'Students often ask when they can start pointe work. The honest answer: it depends on years of dedicated training, not just on age. Let me walk you through what strong pointe preparation actually looks like, and why patience is the best investment you can make.',
  },
  {
    slug: 'on-teaching-children',
    title: 'On Teaching Children',
    date: 'February 22, 2025',
    category: 'Teaching',
    excerpt:
      "Children experience ballet differently than adults — they don't yet know they're 'supposed to' doubt themselves. Teaching young students is a constant reminder that joy and play are the foundations of any technique worth building.",
  },
]

export default function JournalPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 py-16">
        <header className="mb-14 text-center">
          <p className="text-xs tracking-widest uppercase text-rose-400 mb-3">
            Writing
          </p>
          <h1 className="text-4xl font-light text-slate-800">Journal</h1>
          <p className="mt-4 text-slate-500 max-w-md mx-auto">
            Thoughts on movement, teaching, and the ongoing conversation
            between body and music.
          </p>
        </header>

        <ol className="space-y-12">
          {POSTS.map((post) => (
            <li
              key={post.slug}
              className="border-b border-slate-100 pb-12 last:border-0"
            >
              <article>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-medium uppercase tracking-widest text-rose-400">
                    {post.category}
                  </span>
                  <span className="text-slate-300">·</span>
                  <time className="text-xs text-slate-400">{post.date}</time>
                </div>
                <h2 className="text-xl font-semibold text-slate-800 mb-3">
                  {post.title}
                </h2>
                <p className="text-slate-600 leading-relaxed">{post.excerpt}</p>
              </article>
            </li>
          ))}
        </ol>
      </main>
    </>
  )
}
