"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { usePathname } from "next/navigation"

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Booking", href: "/booking" },
  { label: "Journal", href: "/journal" },
  { label: "Printouts", href: "/resources" },
] as const

export function Navbar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  function isActive(href: string): boolean {
    return href === "/" ? pathname === "/" : pathname.startsWith(href)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-black/10">
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo + wordmark */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/logo.png"
            alt="Ballet Borderless"
            height={40}
            width={160}
            style={{ height: "40px", width: "auto" }}
            priority
          />
          <span className="font-heading text-sm tracking-widest uppercase text-black">
            Ballet Borderless
          </span>
        </Link>

        {/* Nav links — desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={[
                "text-xs tracking-[0.2em] text-black uppercase font-light",
                "transition-opacity duration-200 hover:opacity-50",
                "pb-0.5",
                isActive(link.href)
                  ? "border-b border-black"
                  : "border-b border-transparent",
              ].join(" ")}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Hamburger — mobile only */}
        <button
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="md:hidden flex flex-col justify-center gap-1.5 w-8 h-8"
        >
          <span className={`block h-px bg-black transition-all duration-200 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block h-px bg-black transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block h-px bg-black transition-all duration-200 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden border-t border-black/10 bg-white">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={[
                "block px-6 py-4 text-xs tracking-[0.2em] uppercase font-light",
                "transition-opacity duration-200 hover:opacity-50",
                isActive(link.href) ? "text-black" : "text-black/50",
              ].join(" ")}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
