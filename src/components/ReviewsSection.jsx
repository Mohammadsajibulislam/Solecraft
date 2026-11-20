import { testimonials } from '../data/content'
import { Container, Icon, Reveal, SectionHeading, Stars } from './ui'

const press = ['Monocle', 'Kinfolk', 'Wallpaper*', 'Cereal', 'Apartamento']

/** Social proof: a rating summary, three customer quotes and press wordmarks. */
export default function ReviewsSection() {
  return (
    <section id="reviews" className="py-20 md:py-28" aria-labelledby="reviews-title">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Worn in, loved on"
            id="reviews-title"
            title={
              <>
                Kept for <em className="italic text-clay">years.</em>
              </>
            }
            description="We ask every customer the same question six months in: would you buy them again? Here is what they say."
            action={
              <div className="flex items-center gap-4 rounded-2xl border border-ink/10 bg-cream/70 px-5 py-4">
                <span className="font-display text-[2.6rem] leading-none text-ink">4.9</span>
                <span>
                  <Stars rating={5} size={13} />
                  <span className="mt-1 block font-mono text-[9px] uppercase tracking-[0.14em] text-muted">
                    2,400 verified reviews
                  </span>
                </span>
              </div>
            }
          />
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Reveal key={testimonial.id} delay={index * 80}>
              <figure className="flex h-full flex-col rounded-3xl border border-ink/10 bg-cream/70 p-6 transition-shadow duration-300 hover:shadow-soft md:p-7">
                <Stars rating={testimonial.rating} size={13} />

                <blockquote className="mt-5 flex-1 font-display text-[1.35rem] leading-snug text-ink md:text-[1.45rem]">
                  <span aria-hidden="true" className="text-clay">
                    “
                  </span>
                  {testimonial.quote}
                  <span aria-hidden="true" className="text-clay">
                    ”
                  </span>
                </blockquote>

                <figcaption className="mt-6 flex items-center gap-3 border-t border-ink/10 pt-5">
                  <span
                    className="grid size-10 shrink-0 place-items-center rounded-full font-mono text-[11px] font-medium text-cream"
                    style={{ backgroundColor: testimonial.accent }}
                    aria-hidden="true"
                  >
                    {testimonial.initials}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-ink">
                      {testimonial.name}
                    </span>
                    <span className="mt-0.5 block truncate font-mono text-[9px] uppercase tracking-[0.12em] text-muted">
                      {testimonial.meta}
                    </span>
                  </span>
                  <Icon
                    name="check"
                    size={15}
                    className="ml-auto shrink-0 text-pine"
                    title="Verified purchase"
                  />
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 border-t border-ink/10 pt-8">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-light">
              As seen in
            </span>
            {press.map((name) => (
              <span
                key={name}
                className="font-display text-xl text-ink/45 transition-colors duration-300 hover:text-ink"
              >
                {name}
              </span>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
