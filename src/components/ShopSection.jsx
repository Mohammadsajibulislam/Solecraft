import { useMemo } from 'react'
import { sortOptions } from '../data/content'
import { cx } from '../utils/cx'
import ProductTile from './ProductTile'
import {
  Button,
  Container,
  Icon,
  Reveal,
  SearchField,
  SectionHeading,
  SortSelect,
} from './ui'

function FilterChip({ active, onClick, count, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cx(
        'inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium transition-colors duration-300',
        active
          ? 'border-ink bg-ink text-cream'
          : 'border-ink/15 text-ink-soft hover:border-ink/40',
      )}
    >
      {children}
      <span className={cx('font-mono text-[9px]', active ? 'text-cream/60' : 'text-muted')}>
        {count}
      </span>
    </button>
  )
}

/**
 * The collection. Search, category and sort state are controlled by App so
 * the header search and this toolbar always stay in sync.
 */
export default function ShopSection({
  products,
  categories,
  searchQuery,
  onSearchChange,
  activeCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  savedOnly,
  onToggleSavedOnly,
  savedIds,
  onToggleSaved,
  onQuickView,
  onResetFilters,
}) {
  const filterOptions = useMemo(
    () => [
      { id: 'all', label: 'All pairs', count: products.length },
      ...categories.map((category) => ({
        id: category.id,
        label: category.label,
        count: products.filter((product) => product.category === category.id).length,
      })),
    ],
    [categories, products],
  )

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()

    const matches = products.filter((product) => {
      if (savedOnly && !savedIds.has(product.id)) return false
      if (!savedOnly && activeCategory !== 'all' && product.category !== activeCategory) {
        return false
      }
      if (!query) return true

      const haystack = [
        product.name,
        product.categoryLabel,
        product.colorNames.join(' '),
        product.materials,
        product.description,
      ]
        .join(' ')
        .toLowerCase()

      return haystack.includes(query)
    })

    if (sortBy === 'price-asc') return [...matches].sort((a, b) => a.price - b.price)
    if (sortBy === 'price-desc') return [...matches].sort((a, b) => b.price - a.price)
    if (sortBy === 'newest') {
      return [...matches].sort(
        (a, b) => Number(Boolean(b.isNew)) - Number(Boolean(a.isNew)),
      )
    }
    return matches
  }, [products, activeCategory, searchQuery, sortBy, savedOnly, savedIds])

  const trimmedQuery = searchQuery.trim()
  const hasFilters = savedOnly || activeCategory !== 'all' || trimmedQuery !== ''

  return (
    <section
      id="collection"
      className="border-y border-ink/10 bg-cream/60 py-20 md:py-28"
      aria-labelledby="collection-title"
    >
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="The collection"
            id="collection-title"
            title={
              <>
                Twelve good pairs. <em className="italic text-clay">No filler.</em>
              </>
            }
            description="A tight edit of everyday essentials. Search, filter and find the pair that fits the way you move."
            action={
              <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                <Icon name="shield" size={15} className="text-clay" />
                Free repairs, for life
              </span>
            }
          />
        </Reveal>

        <Reveal delay={60}>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <SearchField
              id="collection-search"
              value={searchQuery}
              onChange={onSearchChange}
              placeholder="Search by name, colour or category…"
              label="Search the collection"
              size="lg"
              className="flex-1"
            />
            <SortSelect
              id="collection-sort"
              value={sortBy}
              onChange={onSortChange}
              options={sortOptions}
            />
          </div>

          <div className="mt-5 flex items-center gap-3">
            <span className="hidden font-mono text-[9px] uppercase tracking-[0.18em] text-muted sm:block">
              Filter
            </span>
            <div className="no-scrollbar -mx-5 flex flex-1 gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
              {filterOptions.map((option) => (
                <FilterChip
                  key={option.id}
                  active={!savedOnly && activeCategory === option.id}
                  count={option.count}
                  onClick={() => onCategoryChange(option.id)}
                >
                  {option.label}
                </FilterChip>
              ))}
              {savedIds.size > 0 && (
                <FilterChip
                  active={savedOnly}
                  count={savedIds.size}
                  onClick={onToggleSavedOnly}
                >
                  Saved
                </FilterChip>
              )}
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-xs text-muted">
            <p aria-live="polite">
              Showing <strong className="font-semibold text-ink">{filteredProducts.length}</strong>{' '}
              of {products.length} pairs
              {trimmedQuery && <> for “{trimmedQuery}”</>}
              {savedOnly && <> in saved pairs</>}
            </p>

            {hasFilters && (
              <button
                type="button"
                onClick={onResetFilters}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-soft transition-colors hover:text-clay"
              >
                Clear filters
                <Icon name="close" size={12} />
              </button>
            )}
          </div>
        </Reveal>

        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <Reveal key={product.id} delay={(index % 4) * 55}>
                <ProductTile
                  product={product}
                  saved={savedIds.has(product.id)}
                  onQuickView={onQuickView}
                  onToggleSaved={onToggleSaved}
                />
              </Reveal>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center rounded-3xl border border-dashed border-ink/15 bg-paper/60 px-6 py-16 text-center">
              <span className="grid size-12 place-items-center rounded-full border border-ink/10 bg-cream text-muted">
                <Icon name="search" size={22} />
              </span>
              <h3 className="mt-5 font-display text-3xl text-ink">No pairs found</h3>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
                {savedOnly
                  ? 'You haven’t saved any pairs yet. Tap the heart on a shoe to keep it here.'
                  : `Nothing matches ${
                      trimmedQuery ? `“${trimmedQuery}”` : 'this filter'
                    } just yet. Try a broader search, or clear everything and start again.`}
              </p>
              <Button variant="secondary" className="mt-6" onClick={onResetFilters}>
                Clear filters
              </Button>
            </div>
          )}
        </div>

        <Reveal delay={80}>
          <p className="mt-12 flex items-center justify-center gap-2 text-center font-mono text-[9px] uppercase tracking-[0.14em] text-muted">
            <Icon name="leaf" size={13} className="text-clay" />
            Carbon-neutral delivery · 30-day returns · free repairs for life
          </p>
        </Reveal>
      </Container>
    </section>
  )
}
