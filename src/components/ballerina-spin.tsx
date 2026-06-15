"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

const FRAME_COUNT = 195

function getCurrentFrame(index: number) {
  return `/frames/frame${String(index).padStart(3, "0")}.png`
}

export default function BallerinaSpin() {
  const canvasRef  = useRef<HTMLCanvasElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const imagesRef  = useRef<HTMLImageElement[]>([])
  const frameObj   = useRef({ frame: 0 })

  const leftCard1Ref  = useRef<HTMLDivElement>(null)
  const leftCard2Ref  = useRef<HTMLDivElement>(null)
  const leftCard3Ref  = useRef<HTMLDivElement>(null)
  const rightCard1Ref = useRef<HTMLDivElement>(null)
  const rightCard2Ref = useRef<HTMLDivElement>(null)
  const rightCard3Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    try {
      gsap.registerPlugin(ScrollTrigger)

      // ── Initial card states ─────────────────────────────────────
      gsap.set([leftCard1Ref.current, leftCard2Ref.current, leftCard3Ref.current], {
        x: -80, opacity: 0,
      })
      gsap.set([rightCard1Ref.current, rightCard2Ref.current, rightCard3Ref.current], {
        x: 80, opacity: 0,
      })

      const canvas  = canvasRef.current!
      const context = canvas.getContext("2d")!
      context.globalCompositeOperation = 'source-over'
      canvas.width  = 640
      canvas.height = 360

      // Preload all frames
      const images: HTMLImageElement[] = []
      let loadedCount = 0

      for (let i = 1; i <= FRAME_COUNT; i++) {
        const img = new Image()
        img.src = getCurrentFrame(i)
        img.onload = () => {
          loadedCount++
          if (loadedCount === FRAME_COUNT) {
            // All frames ready — draw the first one
            context.clearRect(0, 0, canvas.width, canvas.height)
            context.drawImage(images[0], 0, 0, canvas.width, canvas.height)
          }
        }
        images.push(img)
      }
      imagesRef.current = images

      // ── Scrub frame counter with scroll — Apple canvas technique ─
      gsap.to(frameObj.current, {
        frame: FRAME_COUNT - 1,
        snap: "frame",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=400%",
          pin: true,
          scrub: 0.5,
        },
        onUpdate: () => {
          const img = imagesRef.current[Math.round(frameObj.current.frame)]
          if (img?.complete) {
            context.clearRect(0, 0, canvas.width, canvas.height)
            context.drawImage(img, 0, 0, canvas.width, canvas.height)
          }
        },
      })

      // ── Card fly-in animations ──────────────────────────────────
      gsap.to([leftCard1Ref.current, leftCard2Ref.current, leftCard3Ref.current], {
        x: 0, opacity: 1, stagger: 0.15, duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=400%",
          scrub: 1,
        },
      })

      gsap.to([rightCard1Ref.current, rightCard2Ref.current, rightCard3Ref.current], {
        x: 0, opacity: 1, stagger: 0.15, duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=400%",
          scrub: 1,
        },
      })
    } catch (error) {
      console.error("BallerinaSpin animation init failed:", error)
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
      gsap.killTweensOf("*")
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white py-16 flex flex-col items-center justify-center min-h-screen"
    >
      {/* ── Top label ──────────────────────────────────────────── */}
      <p className="text-[11px] tracking-widest uppercase text-black/40 mb-6">Our Services</p>

      {/* ── Main row ───────────────────────────────────────────── */}
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto px-16">

        {/* ── Left cards ───────────────────────────────────────── */}
        <div className="flex flex-col gap-10 w-64">
          <div ref={leftCard1Ref} className="border-t border-black pt-3">
            <p className="text-[11px] tracking-widest uppercase text-black mb-2">Group Classes</p>
            <p className="text-3xl font-serif">From $7.15</p>
            <p className="text-[12px] text-gray-500 mt-1">Creative, Novice, Intermediate &amp; Advanced</p>
          </div>
          <div ref={leftCard2Ref} className="border-t border-black pt-3">
            <p className="text-[11px] tracking-widest uppercase text-black mb-2">Adult Beginner</p>
            <p className="text-3xl font-serif">From $12.99</p>
            <p className="text-[12px] text-gray-500 mt-1">Start your ballet journey at any age</p>
          </div>
          <div ref={leftCard3Ref} className="border-t border-black pt-3">
            <p className="text-[11px] tracking-widest uppercase text-black mb-2">Group Pointe</p>
            <p className="text-3xl font-serif">$15.25</p>
            <p className="text-[12px] text-gray-500 mt-1">Structured pointe work in a group setting</p>
          </div>
        </div>

        {/* ── Canvas — center ──────────────────────────────────── */}
        <canvas
          ref={canvasRef}
          className="w-[600px] h-auto mx-auto block"
          style={{ background: 'transparent', mixBlendMode: 'multiply' as const }}
        />

        {/* ── Right cards ──────────────────────────────────────── */}
        <div className="flex flex-col gap-10 w-64">
          <div ref={rightCard1Ref} className="border-t border-black pt-3">
            <p className="text-[11px] tracking-widest uppercase text-black mb-2">Private Ballet</p>
            <p className="text-3xl font-serif">$24.90</p>
            <p className="text-[12px] text-gray-500 mt-1">One-on-one personalized coaching</p>
          </div>
          <div ref={rightCard2Ref} className="border-t border-black pt-3">
            <p className="text-[11px] tracking-widest uppercase text-black mb-2">Private Pointe</p>
            <p className="text-3xl font-serif">$30.00</p>
            <p className="text-[12px] text-gray-500 mt-1">Individual pointe technique refinement</p>
          </div>
          <div ref={rightCard3Ref} className="border-t border-black pt-3">
            <p className="text-[11px] tracking-widest uppercase text-black mb-2">Variations &amp; Choreography</p>
            <p className="text-3xl font-serif">From $45.50</p>
            <p className="text-[12px] text-gray-500 mt-1">Competition prep and original pieces</p>
          </div>
        </div>

      </div>

      {/* ── Bottom label ───────────────────────────────────────── */}
      <p className="text-[9px] tracking-widest uppercase text-black/40 mt-8">Ballet Borderless</p>
    </section>
  )
}
