import { useEffect, useRef, useState } from 'react'
import { useEscape, useScrollLock, useScrolled } from '../hooks/useUI'
import { navigation, socialLinks, store } from '../data/content'
import { cx } from '../utils/cx'
import { Button, Container, Icon, Logo, SearchField } from './ui'

/**
 * Sticky header with a desktop search field, saved-pairs shortcut,
 * mobile search row and a slide-in navigation drawer.
 */
export default function SiteHeader({
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  savedCount = 0,
  onShowSaved,
}) {
  const scrolled = useScrolled(8)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const desktopSearchRef = useRef(null)
  const menuCloseRef = useRef(null)

  useScrollLock(menuOpen)
  useEscape(menuOpen, () => setMenuOpen(false))
  useEscape(searchOpen, () => setSearchOpen(false))

  useEffect(() => {
    if (menuOpen) menuCloseRef.current?.focus()
  }, [menuOpen])

  // Press "/" anywhere to jump into search.
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key !== '/' || event.metaKey || event.ctrlKey || event.altKey) return
      const tag = event.target.tagName
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(tag) || event.target.isContentEditable) {
        return
      }
      event.preventDefault()
      if (window.matchMedia('(min-width: 768px)').matches) {
        desktopSearchRef.current?.focus()
      } else {
        setSearchOpen(true)
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  const closeAll = () => {
    setMenuOpen(false)
    setSearchOpen(false)
  }

  const handleSubmit = () => {
    closeAll()
    onSearchSubmit()
  }

  const handleShowSaved = () => {
    closeAll()
    onShowSaved()
  }

  return (
    <>
      <div className="bg-ink text-cream/70">
        <Container className="flex h-9 items-center justify-between gap-4 font-mono text-[9px] uppercase tracking-[0.16em] sm:text-[10px]">
          <span className="inline-flex items-center gap-2">
            <Icon name="leaf" size={12} className="text-clay-light" />
            Free repairs for life
          </span>
          <span className="hidden items-center gap-2 md:inline-flex">
            Carbon-neutral delivery <span className="text-cream/25">·</span> 30-day trial
          </span>
          <span className="hidden lg:inline-flex">Copenhagen · Est. 2014</span>
        </Container>
      </div>

      <header
        className={cx(
          'sticky top-0 z-50 border-b bg-paper/90 backdrop-blur-xl transition-colors duration-300',
          scrolled ? 'border-ink/10' : 'border-transparent',
        )}
      >
        <Container className="flex h-[72px] items-center justify-between gap-5">
          <Logo />

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
            {navigation.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="group relative text-[0.83rem] font-medium text-ink-soft transition-colors hover:text-ink"
              >
                {item.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-clay transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <div className="hidden w-48 md:block xl:w-60">
              <SearchField
                id="header-search"
                value={searchQuery}
                onChange={onSearchChange}
                onSubmit={handleSubmit}
                placeholder="Search pairs…"
                label="Search the collection"
                inputRef={desktopSearchRef}
              />
            </div>

            <button
              type="button"
              onClick={handleShowSaved}
              className="relative grid size-10 place-items-center rounded-full border border-ink/15 text-ink transition-colors hover:border-ink/40"
              aria-label={`Show saved pairs (${savedCount})`}
            >
              <Icon name="heart" size={17} filled={savedCount > 0} />
              {savedCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 grid size-[18px] place-items-center rounded-full bg-clay font-mono text-[9px] font-medium text-cream">
                  {savedCount}
                </span>
              )}
            </button>

            <button
              type="button"
              className="grid size-10 place-items-center rounded-full border border-ink/15 text-ink transition-colors hover:border-ink/40 md:hidden"
              aria-label={searchOpen ? 'Close search' : 'Open search'}
              aria-expanded={searchOpen}
              aria-controls="mobile-search"
              onClick={() => setSearchOpen((open) => !open)}
            >
              <Icon name={searchOpen ? 'close' : 'search'} size={17} />
            </button>

            <span className="hidden xl:block">
              <Button
                href="#collection"
                variant="primary"
                size="sm"
                icon={<Icon name="arrow-up-right" size={14} />}
              >
                Shop all
              </Button>
            </span>

            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-3.5 py-2.5 text-[0.7rem] font-medium uppercase tracking-[0.12em] text-ink transition-colors hover:border-ink/40 lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => {
                setSearchOpen(false)
                setMenuOpen(true)
              }}
            >
              Menu
              <Icon name="menu" size={16} />
            </button>
          </div>
        </Container>

        {searchOpen && (
          <div id="mobile-search" className="border-t border-ink/10 bg-paper px-5 py-3 md:hidden">
            <SearchField
              id="mobile-search-input"
              value={searchQuery}
              onChange={onSearchChange}
              onSubmit={handleSubmit}
              placeholder="Search by name, colour or category…"
              label="Search the collection"
              size="lg"
              autoFocus
            />
          </div>
        )}
      </header>

      {menuOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-[80] lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
        >
          <button
            type="button"
            className="absolute inset-0 bg-ink/45 backdrop-blur-sm"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          />

          <div className="animate-menu-in absolute inset-y-0 right-0 flex w-full max-w-[390px] flex-col overflow-y-auto bg-paper px-6 py-5">
            <div className="flex items-center justify-between">
              <Logo />
              <button
                ref={menuCloseRef}
                type="button"
                onClick={() => setMenuOpen(false)}
                className="grid size-10 place-items-center rounded-full border border-ink/15 text-ink transition-colors hover:border-ink/40"
                aria-label="Close menu"
              >
                <Icon name="close" size={17} />
              </button>
            </div>

            <div className="mt-8">
              <SearchField
                id="menu-search"
                value={searchQuery}
                onChange={onSearchChange}
                onSubmit={handleSubmit}
                placeholder="Search pairs…"
                label="Search the collection"
              />
            </div>

            <nav className="mt-8 flex flex-col" aria-label="Mobile">
              {navigation.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="group flex items-center justify-between border-b border-ink/10 py-4 font-display text-[2rem] leading-none text-ink"
                >
                  {item.label}
                  <span className="grid size-9 place-items-center rounded-full border border-ink/10 text-ink transition-colors group-hover:border-clay group-hover:bg-clay group-hover:text-cream">
                    <Icon name="arrow-up-right" size={15} />
                  </span>
                </a>
              ))}
            </nav>

            <button
              type="button"
              onClick={handleShowSaved}
              className="mt-6 flex items-center justify-between rounded-2xl border border-ink/10 bg-cream/60 px-4 py-3.5 text-sm text-ink"
            >
              <span className="inline-flex items-center gap-2.5">
                <Icon name="heart" size={16} filled={savedCount > 0} />
                Saved pairs
              </span>
              <span className="font-mono text-xs text-muted">{savedCount}</span>
            </button>

            <div className="mt-auto pt-10">
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted">
                Visit the atelier
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {store.address.join(', ')}
              </p>
              <div className="mt-4 flex gap-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="grid size-9 place-items-center rounded-full border border-ink/10 text-ink-soft transition-colors hover:border-ink/40 hover:text-ink"
                  >
                    <Icon name={social.icon} size={15} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
