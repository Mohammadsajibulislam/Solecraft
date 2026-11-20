import { useState } from 'react'
import { newsletter, store } from '../data/content'
import { Container, Icon, Reveal } from './ui'

/**
 * Newsletter sign-up. Purely local: validates the address, shows a success
 * state, and never sends anything anywhere.
 */
export default function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const value = email.trim()

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
      setError('Please enter a valid email address.')
      setStatus('error')
      return
    }

    setError('')
    setStatus('success')
    setEmail('')
  }

  return (
    <section id="newsletter" className="px-0 py-16 md:py-20" aria-labelledby="newsletter-title">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-clay px-6 py-12 text-cream sm:px-10 md:px-14 md:py-16">
            <div
              className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-cream/10 blur-2xl"
              aria-hidden="true"
            />

            <div className="relative grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-center lg:gap-16">
              <div>
                <span className="inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-cream/70">
                  <Icon name="mail" size={13} />
                  {newsletter.eyebrow}
                </span>
                <h2
                  id="newsletter-title"
                  className="mt-4 font-display text-[clamp(2.5rem,5vw,3.9rem)] leading-[0.95] tracking-[-0.02em] text-cream"
                >
                  {newsletter.titleTop}{' '}
                  <em className="italic text-cream/80">{newsletter.titleEm}</em>
                </h2>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-cream/80">
                  {newsletter.copy}
                </p>
              </div>

              <div>
                {status === 'success' ? (
                  <div
                    className="flex items-start gap-3 rounded-2xl border border-cream/25 bg-cream/10 p-5"
                    role="status"
                  >
                    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-cream text-clay">
                      <Icon name="check" size={16} />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-cream">You’re on the list.</p>
                      <p className="mt-1 text-[13px] leading-relaxed text-cream/75">
                        The next letter lands on Sunday. Check your inbox for a welcome note.
                      </p>
                      <button
                        type="button"
                        onClick={() => setStatus('idle')}
                        className="mt-3 text-[11px] font-medium uppercase tracking-[0.12em] text-cream/70 underline underline-offset-4 transition-colors hover:text-cream"
                      >
                        Add another address
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate>
                    <div className="flex flex-col gap-2 sm:flex-row">
                      <div className="flex-1">
                        <label htmlFor="newsletter-email" className="sr-only">
                          Email address
                        </label>
                        <input
                          id="newsletter-email"
                          type="email"
                          name="email"
                          value={email}
                          onChange={(event) => {
                            setEmail(event.target.value)
                            if (status === 'error') setStatus('idle')
                          }}
                          placeholder="you@example.com"
                          autoComplete="email"
                          aria-invalid={status === 'error'}
                          aria-describedby={status === 'error' ? 'newsletter-error' : undefined}
                          className="h-[52px] w-full rounded-full border border-cream/30 bg-cream/10 px-5 text-sm text-cream placeholder:text-cream/55 focus:border-cream focus:bg-cream/15 focus:outline-none"
                        />
                      </div>
                      <button
                        type="submit"
                        className="group inline-flex h-[52px] shrink-0 items-center justify-center gap-2 rounded-full bg-cream px-6 text-sm font-semibold text-ink transition-colors hover:bg-paper-deep"
                      >
                        Join the list
                        <Icon
                          name="arrow-right"
                          size={15}
                          className="transition-transform duration-300 group-hover:translate-x-0.5"
                        />
                      </button>
                    </div>

                    {status === 'error' && (
                      <p
                        id="newsletter-error"
                        className="mt-2.5 pl-1 text-[11px] text-cream"
                        role="alert"
                      >
                        {error}
                      </p>
                    )}

                    <p className="mt-3 pl-1 text-[10px] leading-relaxed text-cream/60">
                      {newsletter.note}
                    </p>
                  </form>
                )}

                <p className="mt-6 flex items-center gap-2 border-t border-cream/20 pt-4 text-[11px] text-cream/70">
                  <Icon name="pin" size={13} />
                  Or visit us at {store.address[0]}, {store.address[1]}.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
