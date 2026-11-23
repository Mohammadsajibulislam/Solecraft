import { useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useEscape, useScrollLock } from '../hooks/useUI'
import { formatPrice } from '../utils/formatPrice'
import { cx } from '../utils/cx'
import { Badge, Button, Icon, SmartImage } from './ui'

const focusableSelector = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ')

/**
 * Accessible product quick view. Size and colour are local UI state only;
 * there is no cart, checkout or backend behind this dialog.
 */
export default function QuickViewModal({
  product,
  saved = false,
  onToggleSaved,
  onClose,
  onBookFitting,
}) {
  const dialogRef = useRef(null)
  const titleId = useId()
  const descriptionId = useId()
  const [colorIndex, setColorIndex] = useState(0)
  const [size, setSize] = useState(
    () => product.sizes[Math.min(2, product.sizes.length - 1)] ?? null,
  )

  useScrollLock(true)
  useEscape(true, onClose)

  useEffect(() => {
    const previouslyFocused = document.activeElement
    const dialog = dialogRef.current
    if (!dialog) return undefined

    const getFocusable = () =>
      Array.from(dialog.querySelectorAll(focusableSelector)).filter(
        (element) => element.getClientRects().length > 0,
      )

    const initial =
      dialog.querySelector('[data-autofocus]') ?? getFocusable()[0] ?? dialog
    initial.focus()

    const handleKeyDown = (event) => {
      if (event.key !== 'Tab') return

      const focusable = getFocusable()
      if (focusable.length === 0) {
        event.preventDefault()
        dialog.focus()
        return
      }

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      if (previouslyFocused instanceof HTMLElement) {
        previouslyFocused.focus({ preventScroll: true })
      }
    }
  }, [onClose])

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-ink/55 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        tabIndex={-1}
        className="animate-modal-in relative max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-t-3xl bg-paper shadow-lift sm:rounded-3xl"
      >
        <button
          type="button"
          data-autofocus
          onClick={onClose}
          aria-label="Close quick view"
          className="absolute right-4 top-4 z-20 grid size-10 place-items-center rounded-full border border-ink/10 bg-cream/95 text-ink backdrop-blur transition-colors hover:bg-cream"
        >
          <Icon name="close" size={17} />
        </button>

        <div className="grid md:grid-cols-[0.95fr_1.05fr]">
          <div className="relative min-h-[280px] overflow-hidden bg-paper-deep md:min-h-[640px]">
            <SmartImage
              src={product.image}
              alt={product.alt}
              priority
              className="absolute inset-0 h-full w-full"
            />
            {product.badge && (
              <Badge tone={product.badge} className="absolute left-4 top-4">
                {product.badge}
              </Badge>
            )}
            <span className="absolute bottom-4 left-4 rounded-full border border-ink/10 bg-cream/90 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-ink backdrop-blur">
              SS26 · {product.categoryLabel}
            </span>
          </div>

          <div className="p-6 md:p-9">
            {/* pr clears the floating close button on the top-right */}
            <div className="flex items-center justify-between gap-3 pr-8 md:pr-14">
              <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted">
                {product.categoryLabel}
              </span>
              <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-muted">
                <Icon name="star" size={12} filled className="text-clay" />
                {product.rating.toFixed(1)}
                <span className="text-muted-light">({product.reviews} reviews)</span>
              </span>
            </div>

            <h2
              id={titleId}
              className="mt-3 font-display text-[2.4rem] leading-[0.95] tracking-[-0.02em] text-ink"
            >
              {product.name}
            </h2>

            <div className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="text-xl font-semibold text-ink">
                {formatPrice(product.price)}
              </span>
              <span className="text-[11px] text-muted">Taxes &amp; shipping included</span>
            </div>

            <p
              id={descriptionId}
              className="mt-4 text-sm leading-relaxed text-muted"
            >
              {product.description}
            </p>

            <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.12em] text-muted-light">
              {product.materials}
            </p>

            <fieldset className="mt-6">
              <legend className="flex w-full items-center justify-between text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-soft">
                <span>Colour</span>
                <span className="font-normal normal-case tracking-normal text-muted">
                  {product.colorNames[colorIndex]}
                </span>
              </legend>
              <div className="mt-3 flex gap-1.5">
                {product.colors.map((color, index) => (
                  <button
                    key={`${color}-${product.colorNames[index]}`}
                    type="button"
                    onClick={() => setColorIndex(index)}
                    aria-pressed={index === colorIndex}
                    aria-label={product.colorNames[index]}
                    title={product.colorNames[index]}
                    className={cx(
                      'grid size-8 place-items-center rounded-full border transition-colors',
                      index === colorIndex
                        ? 'border-ink'
                        : 'border-transparent hover:border-ink/20',
                    )}
                  >
                    <span
                      className="size-6 rounded-full border border-ink/10"
                      style={{ backgroundColor: color }}
                    />
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset className="mt-5">
              <legend className="flex w-full items-center justify-between text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-soft">
                <span>Size · EU</span>
                <a
                  href="#collection"
                  onClick={onClose}
                  className="inline-flex items-center gap-1 font-normal normal-case tracking-normal text-muted transition-colors hover:text-clay"
                >
                  <Icon name="ruler" size={12} />
                  Size guide
                </a>
              </legend>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {product.sizes.map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setSize(value)}
                    aria-pressed={value === size}
                    className={cx(
                      'h-9 min-w-10 rounded-full border px-3 font-mono text-[11px] transition-colors',
                      value === size
                        ? 'border-ink bg-ink text-cream'
                        : 'border-ink/15 text-ink-soft hover:border-ink/40',
                    )}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="mt-6 flex flex-col gap-2 sm:flex-row">
              <Button
                size="md"
                className="flex-1"
                onClick={() => onBookFitting(product)}
                icon={<Icon name="arrow-up-right" size={15} />}
              >
                Book a fitting
              </Button>
              <Button
                variant="secondary"
                size="md"
                className="flex-1"
                onClick={() => onToggleSaved(product.id)}
                aria-pressed={saved}
                icon={<Icon name="heart" size={15} filled={saved} />}
              >
                {saved ? 'Saved' : 'Save pair'}
              </Button>
            </div>

            <ul className="mt-6 space-y-2.5 border-t border-ink/10 pt-5 text-[11px] leading-relaxed text-muted">
              <li className="flex items-start gap-2.5">
                <Icon name="truck" size={15} className="mt-0.5 shrink-0 text-clay" />
                Free carbon-neutral delivery, dispatched in 1–2 days
              </li>
              <li className="flex items-start gap-2.5">
                <Icon name="shield" size={15} className="mt-0.5 shrink-0 text-clay" />
                30-day wear-it-out trial and free repairs for life
              </li>
              <li className="flex items-start gap-2.5">
                <Icon name="leaf" size={15} className="mt-0.5 shrink-0 text-clay" />
                Small-batch, made in Porto by a family workshop
              </li>
            </ul>

            <p className="mt-5 text-[10px] text-muted-light">
              Demo storefront — no orders, payments or data are processed.
            </p>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}
