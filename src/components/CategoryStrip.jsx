import { Button, Container, Icon, Reveal, SectionHeading, SmartImage } from './ui'

/** Image-led category index. Selecting a card filters the collection below. */
export default function CategoryStrip({ categories, products, onSelect }) {
  const counts = products.reduce((accumulator, product) => {
    accumulator[product.category] = (accumulator[product.category] ?? 0) + 1
    return accumulator
  }, {})

  return (
    <section id="categories" className="py-20 md:py-28" aria-labelledby="categories-title">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Browse"
            id="categories-title"
            title={
              <>
                Find your <em className="italic text-clay">footing.</em>
              </>
            }
            description="Five considered categories, one simple promise: fewer, better pairs that earn their place by the door."
            action={
              <Button
                href="#collection"
                variant="ghost"
                icon={<Icon name="arrow-right" size={16} />}
              >
                Shop all {products.length} pairs
              </Button>
            }
          />
        </Reveal>

        <div className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-3 md:grid md:grid-cols-3 md:gap-4 md:overflow-visible lg:grid-cols-5">
          {categories.map((category, index) => (
            <Reveal
              key={category.id}
              delay={index * 70}
              className="w-[78%] shrink-0 snap-start sm:w-[46%] md:w-auto"
            >
              <button
                type="button"
                onClick={() => onSelect(category.id)}
                className="group relative block aspect-[3/4] w-full overflow-hidden rounded-2xl bg-paper-deep text-left"
                aria-label={`Shop ${category.label}`}
              >
                <SmartImage
                  src={category.image}
                  alt=""
                  className="absolute inset-0 h-full w-full"
                  imgClassName="transition-transform duration-700 ease-soft group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-ink/5" />

                <span className="absolute left-4 top-4 font-mono text-[10px] tracking-[0.2em] text-cream/70">
                  0{index + 1}
                </span>

                <span className="absolute inset-x-4 bottom-4 text-cream">
                  <span className="block font-display text-[1.7rem] leading-none">
                    {category.label}
                  </span>
                  <span className="mt-1.5 block text-[11px] leading-snug text-cream/65">
                    {category.blurb}
                  </span>
                  <span className="mt-3 flex items-center justify-between">
                    <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-cream/55">
                      {counts[category.id] ?? 0} pairs
                    </span>
                    <span className="grid size-8 place-items-center rounded-full border border-cream/25 transition-colors duration-300 group-hover:border-clay group-hover:bg-clay">
                      <Icon name="arrow-up-right" size={14} />
                    </span>
                  </span>
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
