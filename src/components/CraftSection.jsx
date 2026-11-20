import { craftNotes, craftSteps } from '../data/content'
import { Button, Container, Eyebrow, Icon, Reveal, SmartImage } from './ui'

/** Dark editorial break telling the make/craft story. */
export default function CraftSection() {
  return (
    <section
      id="craft"
      className="relative overflow-hidden bg-pine py-20 text-cream md:py-28"
      aria-labelledby="craft-title"
    >
      <div
        className="pointer-events-none absolute -left-48 top-1/3 size-[34rem] rounded-full bg-clay/10 blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative grid items-center gap-16 lg:grid-cols-2 lg:gap-16">
        <div className="relative mx-auto w-full max-w-[520px] lg:max-w-none">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-cream/10">
              <SmartImage
                src="/images/craft-main.webp"
                alt="Close-up of hand-finished tan leather Chelsea boots in warm afternoon light"
                className="absolute inset-0 h-full w-full"
              />
              <span className="absolute left-4 top-4 rounded-full border border-cream/20 bg-pine/55 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-cream/80 backdrop-blur">
                Atelier No. 2 · Porto
              </span>
            </div>
          </Reveal>

          <Reveal
            delay={140}
            className="absolute -bottom-8 -right-4 hidden w-36 overflow-hidden rounded-2xl border-[6px] border-pine shadow-lift sm:block md:w-48"
          >
            <SmartImage
              src="/images/craft-detail.webp"
              alt="An artisan shaping a leather sole by hand at the workbench"
              className="aspect-square w-full"
            />
          </Reveal>

          <span
            className="absolute -left-8 bottom-10 hidden rotate-180 font-mono text-[9px] uppercase tracking-[0.3em] text-cream/35 [writing-mode:vertical-rl] md:block"
            aria-hidden="true"
          >
            Cut · stitch · finish
          </span>
        </div>

        <div>
          <Reveal>
            <Eyebrow light>The craft</Eyebrow>
          </Reveal>

          <Reveal delay={60}>
            <h2
              id="craft-title"
              className="mt-5 font-display text-[clamp(2.5rem,4.8vw,4.2rem)] leading-[0.95] tracking-[-0.02em] text-cream"
            >
              Built slowly.
              <br />
              <em className="italic text-clay-light">Worn for years.</em>
            </h2>
          </Reveal>

          <Reveal delay={100}>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-cream/65">
              We make fewer pairs, better. Every Solecraft shoe is cut, stitched and
              finished by hand in a family workshop outside Porto — then checked by the
              person whose name goes inside the box.
            </p>
          </Reveal>

          <div className="mt-8 divide-y divide-cream/10 border-y border-cream/10">
            {craftSteps.map((step, index) => (
              <Reveal key={step.index} delay={140 + index * 60}>
                <div className="flex gap-5 py-5">
                  <span
                    className="pt-1 font-mono text-[10px] tracking-[0.1em] text-clay-light"
                    aria-hidden="true"
                  >
                    {step.index}
                  </span>
                  <div>
                    <h3 className="font-display text-xl leading-snug text-cream">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-[13px] leading-relaxed text-cream/55">
                      {step.text}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={340}>
            <dl className="mt-8 grid grid-cols-3 gap-4">
              {craftNotes.map((note) => (
                <div key={note.label}>
                  <dt className="font-mono text-[9px] uppercase tracking-[0.14em] text-cream/40">
                    {note.label}
                  </dt>
                  <dd className="mt-1 text-[13px] text-cream/90">{note.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={380}>
            <Button
              href="#visit"
              variant="outlineLight"
              className="mt-8"
              icon={<Icon name="arrow-up-right" size={15} />}
            >
              Visit the atelier
            </Button>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
