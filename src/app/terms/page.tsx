export const metadata = {
  title: "Terms & Conditions — Ballet Borderless",
  description:
    "Terms and conditions for Ballet Borderless coaching and choreography services.",
}

export default function TermsPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-24">
      {/* Header */}
      <div className="mb-20 border-b border-black/10 pb-16">
        <h1 className="font-heading text-6xl md:text-8xl italic mb-6 leading-none">
          TERMS &amp; CONDITIONS
        </h1>
        <p className="text-sm text-black/60 tracking-wide max-w-lg leading-relaxed">
          Last updated: June 15, 2026
        </p>
      </div>

      {/* Content */}
      <div className="max-w-2xl flex flex-col gap-10">
        <section>
          <h2 className="font-heading text-xl mb-3">1. Services</h2>
          <p className="text-sm text-black/60 leading-relaxed">
            Ballet Borderless provides ballet coaching, conditioning, variations
            coaching, creative movement, adult beginner classes, and
            choreography services, delivered online via video call. By booking
            a session, you agree to these terms.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl mb-3">2. Booking &amp; Scheduling</h2>
          <p className="text-sm text-black/60 leading-relaxed">
            Bookings are confirmed once Ballet Borderless contacts you to
            finalize a date, time, and video call link. Please arrive on time
            and in appropriate attire for movement. Cancellations and
            rescheduling are subject to the policy outlined in Section 7.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl mb-3">3. Assumption of Risk</h2>
          <p className="text-sm text-black/60 leading-relaxed">
            Dance and physical movement carry an inherent risk of injury. By
            participating, you acknowledge this risk and agree that Ballet
            Borderless is not liable for injuries sustained during or as a
            result of participation, except where caused by gross negligence.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl mb-3">4. Minors &amp; Parental Consent</h2>
          <p className="text-sm text-black/60 leading-relaxed">
            For students under 18, a parent or legal guardian must complete the
            booking on the student&apos;s behalf and confirm consent to these terms.
            A parent or guardian should be reachable during the session.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl mb-3">5. Conduct</h2>
          <p className="text-sm text-black/60 leading-relaxed">
            Participants are expected to behave respectfully toward the
            instructor and other participants. Ballet Borderless reserves the
            right to end a session early in cases of inappropriate conduct.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl mb-3">6. Privacy &amp; Information Collected</h2>
          <p className="text-sm text-black/60 leading-relaxed">
            Information collected through the booking form (name, email, age
            group, experience level, and time on pointe) is used solely to
            prepare appropriate instruction and is not shared with third parties
            beyond what&apos;s needed to schedule and run the session.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl mb-3">7. Cancellations &amp; Refunds</h2>
          <p className="text-sm text-black/60 leading-relaxed">
            Cancellations made at least 48 hours in advance are eligible for a
            full refund. Cancellations made less than 24 hours in advance will
            incur a small cancellation fee. Cancellations made between 24 and
            48 hours in advance may be eligible for a partial refund or
            rescheduling at Ballet Borderless&apos;s discretion.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl mb-3">8. Changes to These Terms</h2>
          <p className="text-sm text-black/60 leading-relaxed">
            These terms may be updated from time to time. Continued use of our
            booking services constitutes acceptance of the current terms.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl mb-3">9. Contact</h2>
          <p className="text-sm text-black/60 leading-relaxed">
            Questions about these terms can be directed to{" "}
            <a
              href="mailto:romiballetborderless@gmail.com"
              className="underline underline-offset-4 hover:opacity-50 transition-opacity"
            >
              romiballetborderless@gmail.com
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  )
}
