import Navbar from '@/components/navbar'
import BookingTabs from '@/components/booking-tabs'

export default function HomePage() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="bg-rose-50 py-24 px-4 text-center">
        <p className="text-xs tracking-widest uppercase text-rose-400 mb-4">
          Romi · Ballet Borderless
        </p>
        <h1 className="text-5xl md:text-6xl font-light text-slate-800 mb-6 leading-tight">
          Ballet for <em className="italic font-light">every</em> body.
        </h1>
        <p className="text-slate-600 max-w-xl mx-auto text-lg leading-relaxed">
          A welcoming studio offering ballet classes for children, youth, and
          adults at all levels — from first pliés to pointe work.
        </p>
        <div className="mt-10">
          <a
            href="#book"
            className="inline-block bg-rose-400 hover:bg-rose-500 text-white text-sm font-medium tracking-wide px-8 py-3 rounded-full transition-colors"
          >
            Book a Class
          </a>
        </div>
      </section>

      {/* About */}
      <section className="py-20 px-4 max-w-3xl mx-auto text-center">
        <p className="text-xs tracking-widest uppercase text-rose-400 mb-3">
          About
        </p>
        <h2 className="text-3xl font-light text-slate-800 mb-6">
          Movement without borders
        </h2>
        <p className="text-slate-600 leading-relaxed">
          Ballet Borderless was founded on a simple belief: ballet is not just
          for a select few. Whether you&apos;re 6 or 60, a complete beginner or
          returning after years away, there&apos;s a place at the barre for you.
          Romi brings warmth, rigor, and joy to every class.
        </p>
      </section>

      {/* Booking */}
      <section id="book" className="bg-slate-50 py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs tracking-widest uppercase text-rose-400 mb-3">
              Reserve Your Spot
            </p>
            <h2 className="text-3xl font-light text-slate-800">
              Book a Class
            </h2>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
            <BookingTabs />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 py-8 text-center text-xs text-slate-400 tracking-wide">
        <p>
          © {new Date().getFullYear()} Ballet Borderless ·{' '}
          <a
            href="mailto:romiballetborderless@gmail.com"
            className="hover:text-rose-400 transition-colors"
          >
            romiballetborderless@gmail.com
          </a>
        </p>
      </footer>
    </>
  )
}
