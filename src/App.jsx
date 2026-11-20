import { useCallback, useEffect, useMemo, useState } from 'react'
import CategoryStrip from './components/CategoryStrip'
import CraftSection from './components/CraftSection'
import HeroSection from './components/HeroSection'
import NewsletterSection from './components/NewsletterSection'
import QuickViewModal from './components/QuickViewModal'
import ReviewsSection from './components/ReviewsSection'
import ShopSection from './components/ShopSection'
import SiteFooter from './components/SiteFooter'
import SiteHeader from './components/SiteHeader'
import { Icon, Marquee } from './components/ui'
import { categories } from './data/categories'
import { marqueeItems } from './data/content'
import { products } from './data/products'

const featuredProduct =
  products.find((product) => product.id === 'aero-drift') ?? products[0]

function scrollToCollection() {
  document.getElementById('collection')?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })
}

/**
 * Solecraft homepage.
 *
 * Collection state lives here so the header search, category cards and the
 * collection toolbar always agree. Everything is static — no backend, cart
 * or checkout.
 */
export default function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [sortBy, setSortBy] = useState('featured')
  const [savedIds, setSavedIds] = useState(() => new Set())
  const [savedOnly, setSavedOnly] = useState(false)
  const [quickView, setQuickView] = useState(null)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    if (!toast) return undefined
    const timer = setTimeout(() => setToast(null), 6000)
    return () => clearTimeout(timer)
  }, [toast])

  const handleSearchSubmit = useCallback(() => {
    setSavedOnly(false)
    scrollToCollection()
  }, [])

  const handleCategorySelect = useCallback((categoryId) => {
    setActiveCategory(categoryId)
    setSavedOnly(false)
    scrollToCollection()
  }, [])

  const handleCategoryChange = useCallback((categoryId) => {
    setActiveCategory(categoryId)
    setSavedOnly(false)
  }, [])

  const handleToggleSaved = useCallback((productId) => {
    setSavedIds((current) => {
      const next = new Set(current)
      if (next.has(productId)) next.delete(productId)
      else next.add(productId)
      return next
    })
  }, [])

  const handleShowSaved = useCallback(() => {
    setSavedOnly(true)
    setActiveCategory('all')
    scrollToCollection()
  }, [])

  const handleToggleSavedOnly = useCallback(() => {
    setSavedOnly((current) => {
      if (!current) setActiveCategory('all')
      return !current
    })
  }, [])

  const handleResetFilters = useCallback(() => {
    setSearchQuery('')
    setActiveCategory('all')
    setSortBy('featured')
    setSavedOnly(false)
  }, [])

  const handleBookFitting = useCallback((product) => {
    setToast({
      title: 'Fitting request started',
      message: `We’ll email you about trying the ${product.name} at our Copenhagen atelier.`,
    })
  }, [])

  const savedCount = useMemo(() => savedIds.size, [savedIds])

  return (
    <>
      <a
        href="#collection"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[120] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:text-cream"
      >
        Skip to the collection
      </a>

      <SiteHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchSubmit={handleSearchSubmit}
        savedCount={savedCount}
        onShowSaved={handleShowSaved}
      />

      <main>
        <HeroSection product={featuredProduct} onQuickView={setQuickView} />

        <Marquee items={marqueeItems} />

        <CategoryStrip
          categories={categories}
          products={products}
          onSelect={handleCategorySelect}
        />

        <ShopSection
          products={products}
          categories={categories}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
          sortBy={sortBy}
          onSortChange={setSortBy}
          savedOnly={savedOnly}
          onToggleSavedOnly={handleToggleSavedOnly}
          savedIds={savedIds}
          onToggleSaved={handleToggleSaved}
          onQuickView={setQuickView}
          onResetFilters={handleResetFilters}
        />

        <CraftSection />

        <ReviewsSection />

        <NewsletterSection />
      </main>

      <SiteFooter />

      {quickView && (
        <QuickViewModal
          product={quickView}
          saved={savedIds.has(quickView.id)}
          onToggleSaved={handleToggleSaved}
          onClose={() => setQuickView(null)}
          onBookFitting={handleBookFitting}
        />
      )}

      {toast && (
        <div
          role="status"
          className="animate-modal-in fixed inset-x-4 bottom-4 z-[110] mx-auto flex max-w-md items-start gap-3 rounded-2xl border border-cream/15 bg-ink p-4 text-cream shadow-lift sm:bottom-6"
        >
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-clay">
            <Icon name="check" size={16} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold">{toast.title}</p>
            <p className="mt-0.5 text-[12px] leading-relaxed text-cream/70">
              {toast.message}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setToast(null)}
            aria-label="Dismiss notification"
            className="grid size-7 shrink-0 place-items-center rounded-full text-cream/60 transition-colors hover:bg-cream/10 hover:text-cream"
          >
            <Icon name="close" size={13} />
          </button>
        </div>
      )}
    </>
  )
}
