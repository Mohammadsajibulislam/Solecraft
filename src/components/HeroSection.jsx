import { heroStats } from '../data/content'
import { formatPrice } from '../utils/formatPrice'
import { Button, Container, Icon, SmartImage } from './ui'

/**
 * Editorial hero: oversized type, an arched product frame, a rotating
 * repair stamp and a floating product chip that opens the quick view.
 */
export default function HeroSection({ product, onQuickView }) {
  return (
    <section
      id="top"
      className="relative overflow-hidden pb-16 pt-10 md:pb-24 md:pt-16 lg:pt-20"
      aria-labelledby="hero-title"
    >
      <div
        className="pointer-events-none absolute -right-40 top-16 size-[34rem] rounded-full bg-clay/10 blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative grid items-center gap-14 lg:grid-cols-[1.04fr_.96fr] lg:gap-10">
        <div className="max-w-2xl">
          <span className="animate-rise inline-flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-clay opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-clay" />
            </span>
            SS26 — The Terra Collection
          </span>

          <h1
            id="hero-title"
            className="mt-6 font-display text-[clamp(3.5rem,8vw,6.6rem)] leading-[0.88] tracking-[-0.03em] text-ink"
          >
            <span className="animate-rise block" style={{ animationDelay: '70ms' }}>
              Good shoes
            </span>
            <span className="animate-rise block" style={{ animationDelay: '150ms' }}>
              take you <em className="italic text-clay">further.</em>
            </span>
          </h1>

          <p
            className="animate-rise mt-7 max-w-lg text-[1.02rem] leading-relaxed text-muted"
            style={{ animationDelay: '240ms' }}
          >
            Hand-finished footwear in traceable leather and recycled knit. Designed in
            Copenhagen to be worn hard, repaired often, and kept for years.
          </p>

          <div
            className="animate-rise mt-9 flex flex-wrap gap-3"
            style={{ animationDelay: '320ms' }}
          >
            <Button
              href="#collection"
              size="lg"
              icon={<Icon name="arrow-down" size={16} />}
            >
              Shop new arrivals
            </Button>
            <Button
              href="#craft"
              variant="secondary"
              size="lg"
              icon={<Icon name="arrow-up-right" size={16} />}
            >
              Our craft
            </Button>
          </div>

          <dl
            className="animate-rise mt-12 grid max-w-xl grid-cols-3 gap-4 border-t border-ink/10 pt-6"
            style={{ animationDelay: '400ms' }}
          >
            {heroStats.map((stat, index) => (
              <div key={stat.label} className={index === 0 ? '' : 'border-l border-ink/10 pl-4'}>
                <dt className="font-display text-[1.55rem] leading-none text-ink">
                  {stat.value}
                </dt>
                <dd className="mt-1.5 text-[10px] leading-snug text-muted sm:text-[11px]">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div
          className="animate-fade relative mx-auto w-full max-w-[500px] lg:max-w-none"
          style={{ animationDelay: '120ms' }}
        >
          <div className="relative rounded-t-[999px] rounded-b-[2rem] border border-ink/10 bg-cream/50 p-2.5 shadow-lift">
            <div className="relative overflow-hidden rounded-t-[999px] rounded-b-[1.6rem]">
              <SmartImage
                src="/images/hero.webp"
                alt="Aero Drift suede sneaker floating above a warm grey studio backdrop"
                priority
                className="aspect-[4/5] w-full"
                imgClassName="object-center"
              />
              <span className="absolute left-4 top-4 rounded-full border border-ink/10 bg-cream/90 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-ink backdrop-blur">
                01 / SS26
              </span>
            </div>
          </div>

          <div
            className="absolute -right-3 top-8 grid size-24 place-items-center rounded-full border border-ink/15 bg-paper/85 backdrop-blur sm:-right-6 sm:size-28"
            aria-hidden="true"
          >
            <svg
              viewBox="0 0 100 100"
              className="animate-spin-slow absolute inset-0 h-full w-full text-ink/55"
            >
              <defs>
                <path
                  id="hero-stamp-path"
                  d="M 50,50 m -36,0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
                />
              </defs>
              <text
                fill="currentColor"
                fontSize="8.4"
                letterSpacing="2.6"
                className="font-mono uppercase"
              >
                <textPath href="#hero-stamp-path">
                  RESOLE · REPAIR · REWEAR · RESOLE · REPAIR ·
                </textPath>
              </text>
            </svg>
            <Icon name="leaf" size={20} className="relative text-clay" />
          </div>

          <button
            type="button"
            onClick={() => onQuickView(product)}
            className="group absolute bottom-5 left-4 right-4 flex items-center gap-3 rounded-2xl border border-ink/10 bg-cream/95 p-3 text-left shadow-soft backdrop-blur transition-transform duration-300 hover:-translate-y-0.5 sm:-left-8 sm:bottom-8 sm:right-auto sm:w-[310px]"
            aria-label={`Quick view: ${product.name}, ${formatPrice(product.price)}`}
          >
            <span className="size-14 shrink-0 overflow-hidden rounded-xl bg-paper-deep">
              <img
                src={product.image}
                alt=""
                loading="eager"
                className="h-full w-full object-cover"
              />
            </span>
            <span className="min-w-0">
              <span className="block font-mono text-[9px] uppercase tracking-[0.16em] text-muted">
                Featured pair
              </span>
              <span className="mt-0.5 block truncate text-sm font-semibold text-ink">
                {product.name} — {product.colorNames[0]}
              </span>
              <span className="mt-0.5 block text-sm text-clay-deep">
                {formatPrice(product.price)}
              </span>
            </span>
            <span className="ml-auto grid size-9 shrink-0 place-items-center rounded-full bg-ink text-cream transition-colors group-hover:bg-clay">
              <Icon name="arrow-up-right" size={15} />
            </span>
          </button>

          <span
            className="absolute -right-12 top-1/2 hidden -translate-y-1/2 font-mono text-[9px] uppercase tracking-[0.35em] text-muted [writing-mode:vertical-rl] xl:block"
            aria-hidden="true"
          >
            Est. 2014 — Copenhagen
          </span>
        </div>
      </Container>
    </section>
  )
}
