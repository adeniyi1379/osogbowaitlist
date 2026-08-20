import { useNavigate } from 'react-router-dom'
import WaitlistForm from '../components/WaitlistForm'
import PhoneMockup from '../components/PhoneMockup'
import AdirePattern from '../components/AdirePattern'
import { ScrollReveal } from '../components/ScrollReveal'
import { useState, useEffect } from 'react'

const features = [
  { icon: '🎉', title: 'Events & parties', desc: 'Friday and Saturday nights, club events, and university parties — all in one feed.' },
  { icon: '⚽', title: 'Find your people', desc: 'Gaming groups, 5-a-side football crews, and meetups near you.' },
  { icon: '🌿', title: 'Book local tours', desc: 'Trusted tour handlers for Sacred Grove, art trails, and day trips around Osun State.' },
  { icon: '🔔', title: 'Never miss out', desc: 'Get reminders and exclusive early access as a founding user.' },
]

const audiences = [
  { label: 'Students', sub: 'UNIOSUN & surrounding schools' },
  { label: 'Venue owners', sub: 'Loubars, clubs, event spaces' },
  { label: 'Tour handlers', sub: 'Local guides & experience creators' },
  { label: 'Visitors', sub: 'Anyone exploring Osun State' },
]

const faqs = [
  {
    q: 'Is this free?',
    a: 'Yes. Osogbo Live is free to use — no hidden charges, no paywalls.',
  },
  {
    q: 'When will the app launch?',
    a: 'We\'re building the first version now. Waitlist members get early access before anyone else.',
  },
  {
    q: 'Will my data be shared?',
    a: 'No. Your email stays with us. We won\'t share or sell your information to anyone.',
  },
  {
    q: 'I\'m a venue owner — can I list my events?',
    a: 'Absolutely. The app will let you post events and reach people in Osogbo who are looking for something to do.',
  },
]

export default function Landing() {
  const navigate = useNavigate()
  const [waitlistCount, setWaitlistCount] = useState(0)

  useEffect(() => {
    fetch('/api/count')
      .then((r) => r.json())
      .then((d) => setWaitlistCount(d.count))
      .catch(() => {})
  }, [])

  return (
    <div className="min-h-screen bg-midnight">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <AdirePattern />
        <div className="relative max-w-2xl mx-auto px-5 pt-16 pb-12 sm:pt-24 sm:pb-16 text-center">
          <ScrollReveal>
            <p className="font-display text-gold text-sm font-semibold tracking-widest uppercase mb-4">
              Coming soon to Osogbo
            </p>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-mist leading-[1.1] tracking-tight mb-5">
              Osogbo Live
              <span className="block text-gold">— events, parties,</span>
              <span className="block text-gold">meetups, tours.</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="font-body text-mist-dim text-lg sm:text-xl leading-relaxed max-w-lg mx-auto mb-10">
              Discover what's on in Osogbo tonight, find people to hang out with, and book local tour handlers — all in one place.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={300}>
            <div className="max-w-md mx-auto">
              <WaitlistForm onSuccess={() => navigate('/thank-you')} />
            </div>
          </ScrollReveal>
          {waitlistCount > 0 && (
            <ScrollReveal delay={400}>
              <p className="mt-4 text-mist-dim text-sm font-body">
                <span className="text-gold font-semibold">{waitlistCount.toLocaleString()}</span> people already on the list
              </p>
            </ScrollReveal>
          )}
        </div>
      </section>

      {/* What you'll get */}
      <section className="max-w-2xl mx-auto px-5 py-16 sm:py-20">
        <ScrollReveal>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-mist mb-10 text-center">
            What you'll get
          </h2>
        </ScrollReveal>
        <div className="grid gap-6">
          {features.map((f, i) => (
            <ScrollReveal key={f.title} delay={i * 100} direction="left">
              <div className="flex gap-4 items-start rounded-2xl bg-slate-deep/60 border border-white/5 p-5">
                <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center shrink-0">
                  <span className="text-lg">{f.icon}</span>
                </div>
                <div>
                  <h3 className="font-display text-mist font-semibold text-base mb-1">{f.title}</h3>
                  <p className="font-body text-mist-dim text-sm leading-relaxed">{f.desc}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Who is this for */}
      <section className="max-w-2xl mx-auto px-5 py-16 sm:py-20">
        <ScrollReveal>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-mist mb-10 text-center">
            Who is this for?
          </h2>
        </ScrollReveal>
        <div className="grid grid-cols-2 gap-4">
          {audiences.map((a, i) => (
            <ScrollReveal key={a.label} delay={i * 80} direction="scale">
              <div className="rounded-2xl bg-slate-deep/40 border border-white/5 p-5 text-center">
                <p className="font-display text-mist font-semibold text-base">{a.label}</p>
                <p className="font-body text-mist-dim text-sm mt-1">{a.sub}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Phone mockup */}
      <section className="max-w-2xl mx-auto px-5 py-16 sm:py-20">
        <ScrollReveal>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-mist mb-4 text-center">
            A look at what's coming
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <p className="font-body text-mist-dim text-center text-base mb-10 max-w-md mx-auto">
            A sample "Osogbo Live" feed — events, meetups, and tours, all in one scroll.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={200} direction="scale">
          <PhoneMockup />
        </ScrollReveal>
      </section>

      {/* Social proof */}
      <section className="max-w-2xl mx-auto px-5 py-16 sm:py-20 text-center">
        <ScrollReveal>
          <div className="rounded-2xl bg-slate-deep/40 border border-white/5 p-8">
            <p className="font-body text-mist-dim text-base leading-relaxed">
              Built by an Osogbo-based developer who got tired of asking
              <span className="text-mist font-medium"> "what's happening this weekend?" </span>
              in five different group chats.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* FAQ */}
      <section className="max-w-2xl mx-auto px-5 py-16 sm:py-20">
        <ScrollReveal>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-mist mb-10 text-center">
            Common questions
          </h2>
        </ScrollReveal>
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <ScrollReveal key={f.q} delay={i * 80} direction="up">
              <details className="group rounded-2xl bg-slate-deep/40 border border-white/5 overflow-hidden">
                <summary className="flex items-center justify-between px-5 py-4 cursor-pointer font-display text-mist font-medium text-base list-none [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span className="text-mist-dim text-xl transition-transform group-open:rotate-45">+</span>
                </summary>
                <div className="px-5 pb-4">
                  <p className="font-body text-mist-dim text-sm leading-relaxed">{f.a}</p>
                </div>
              </details>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-2xl mx-auto px-5 py-16 sm:py-20 text-center">
        <ScrollReveal>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-mist mb-4">
            Don't miss the launch
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <p className="font-body text-mist-dim text-base mb-8 max-w-md mx-auto">
            Join the waitlist and be first to know when Osogbo Live goes live.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={200}>
          <div className="max-w-md mx-auto">
            <WaitlistForm onSuccess={() => navigate('/thank-you')} compact />
          </div>
        </ScrollReveal>
      </section>

      {/* Contact / Support */}
      <section className="max-w-2xl mx-auto px-5 py-16 sm:py-20">
        <ScrollReveal>
          <div className="rounded-2xl bg-slate-deep/40 border border-white/5 p-8 text-center">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-mist mb-3">
              Get in touch
            </h2>
            <p className="font-body text-mist-dim text-base mb-8 max-w-md mx-auto">
              Questions, partnerships, or just want to say hello — reach out on WhatsApp.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/2348138651189?text=Hi%20Osogbo%20Live%2C%20I%27d%20like%20to%20know%20more..."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-grove/20 text-grove font-display font-semibold text-sm hover:bg-grove/30 transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Chat on WhatsApp
              </a>
              <a
                href="tel:+2348138651189"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/5 text-mist font-display font-semibold text-sm hover:bg-white/10 transition-colors"
              >
                Call 0813 865 1189
              </a>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Footer */}
      <footer className="max-w-2xl mx-auto px-5 py-8 border-t border-white/5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-mist-dim text-sm">
            © {new Date().getFullYear()} Osogbo Live
          </p>
          <a
            href="mailto:hello@osogbolive.com"
            className="font-body text-mist-dim text-sm hover:text-gold transition-colors"
          >
            hello@osogbolive.com
          </a>
        </div>
      </footer>
    </div>
  )
}
