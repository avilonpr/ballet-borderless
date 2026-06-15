"use client"

import { useScroll, useTransform, motion } from "framer-motion"

// Static SVG hoisted outside component (rendering-hoist-jsx)
// Wrapper div is animated, not the SVG element (rendering-animate-svg-wrapper)
const ArabesqueSilhouette = (
  <svg
    width="80"
    height="120"
    viewBox="0 0 100 150"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    {/* Head */}
    <circle cx="24" cy="20" r="10" fill="black" />
    {/* Hair bun */}
    <circle cx="20" cy="11" r="5" fill="black" />
    {/* Neck */}
    <line
      x1="24"
      y1="30"
      x2="27"
      y2="40"
      stroke="black"
      strokeWidth="4"
      strokeLinecap="round"
    />
    {/* Torso — angled forward */}
    <path
      d="M27 40 Q30 55 34 72"
      stroke="black"
      strokeWidth="7"
      fill="none"
      strokeLinecap="round"
    />
    {/* Standing leg */}
    <path
      d="M34 72 Q38 105 40 138"
      stroke="black"
      strokeWidth="6"
      fill="none"
      strokeLinecap="round"
    />
    {/* Pointe foot — standing */}
    <path
      d="M40 138 Q45 145 53 142"
      stroke="black"
      strokeWidth="4"
      fill="none"
      strokeLinecap="round"
    />
    {/* Arabesque leg — raised behind */}
    <path
      d="M32 76 Q57 57 86 32"
      stroke="black"
      strokeWidth="5"
      fill="none"
      strokeLinecap="round"
    />
    {/* Back foot — pointed */}
    <path
      d="M86 32 Q92 27 96 24"
      stroke="black"
      strokeWidth="3"
      fill="none"
      strokeLinecap="round"
    />
    {/* Front arm — port de bras */}
    <path
      d="M25 44 Q14 40 4 38"
      stroke="black"
      strokeWidth="4"
      fill="none"
      strokeLinecap="round"
    />
    {/* Back arm — allongé */}
    <path
      d="M30 47 Q46 53 61 59"
      stroke="black"
      strokeWidth="3"
      fill="none"
      strokeLinecap="round"
    />
  </svg>
)

export function ScrollDancer() {
  const { scrollYProgress } = useScroll()
  // Map full scroll range (0 → 1) to full rotation (0 → 360°)
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360])

  return (
    <motion.div
      style={{ rotate }}
      className="fixed right-6 top-1/2 -translate-y-1/2 z-30 pointer-events-none opacity-[0.15]"
    >
      {ArabesqueSilhouette}
    </motion.div>
  )
}
