'use client'

import Link from 'next/link'
import { useState } from 'react'

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/#classes', label: 'Classes' },
  { href: '/journal', label: 'Journal' },
  { href: '/#book', label: 'Book' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="bg-white border-b border-rose-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-lg font-semibold tracking-widest text-slate-800 uppercase"
        >
          Ballet Borderless
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-sm tracking-wide text-slate-600 hover:text-rose-500 transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Hamburger button — mobile only */}
        <button
          className="md:hidden p-2 rounded text-slate-600 hover:text-rose-500 hover:bg-rose-50 transition-colors"
          onClick={() => setOpen((prev) => !prev)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden border-t border-rose-100 bg-white">
          <nav className="flex flex-col px-4 py-2">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="py-3 text-sm tracking-wide text-slate-600 hover:text-rose-500 border-b border-slate-100 last:border-0 transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
