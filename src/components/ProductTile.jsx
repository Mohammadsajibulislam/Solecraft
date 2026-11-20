import { formatPrice } from '../utils/formatPrice'
import { cx } from '../utils/cx'
import { Badge, Icon, SmartImage } from './ui'

/**
 * Product tile. The image is the quick-view trigger; the heart is a
 * separate accessible control so touch users can save a pair easily.
 */
export default function ProductTile({ product, saved = false, onQuickView, onToggleSaved }) {
  return (
    <article className="group h-full">
      <div className="relative overflow-hidden rounded-2xl bg-paper-deep transition-shadow duration-300 group-focus-within:ring-2 group-focus-within:ring-clay group-focus-within:ring-offset-2 group-focus-within:ring-offset-paper">
        <button
          type="button"
          onClick={() => onQuickView(product)}
          className="block w-full text-left"
          aria-label={`Quick view: ${product.name}, ${formatPrice(product.price)}`}
        >
          <SmartImage
            src={product.image}
            alt={product.alt}
            className="aspect-[4/5] w-full"
            imgClassName="transition-transform duration-700 ease-soft group-hover:scale-[1.04]"
          />
          <span className="pointer-events-none absolute bottom-3 left-1/2 flex -translate-x-1/2 translate-y-2 items-center gap-2 rounded-full bg-cream/95 px-4 py-2 font-mono text-[9px] uppercase tracking-[0.14em] text-ink opacity-0 shadow-soft transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
            Quick view
            <Icon name="arrow-up-right" size={13} />
          </span>
        </button>

        {product.badge && (
          <Badge tone={product.badge} className="absolute left-3 top-3">
            {product.badge}
          </Badge>
        )}

        <button
          type="button"
          onClick={() => onToggleSaved(product.id)}
          aria-pressed={saved}
          aria-label={
            saved ? `Remove ${product.name} from saved pairs` : `Save ${product.name}`
          }
          className={cx(
            'absolute right-3 top-3 z-10 grid size-9 place-items-center rounded-full border backdrop-blur transition-all duration-300',
            saved
              ? 'border-clay bg-clay text-cream'
              : 'border-ink/10 bg-cream/90 text-ink hover:bg-cream',
          )}
        >
          <Icon name="heart" size={16} filled={saved} />
        </button>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between gap-2">
          <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted">
            {product.categoryLabel}
          </span>
          <span className="inline-flex items-center gap-1 font-mono text-[10px] text-muted">
            <Icon name="star" size={11} filled className="text-clay" />
            {product.rating.toFixed(1)}
          </span>
        </div>

        <h3 className="mt-1.5 font-display text-[1.4rem] leading-tight text-ink transition-colors duration-300 group-hover:text-clay-deep">
          {product.name}
        </h3>

        <div className="mt-2 flex items-center justify-between gap-3">
          <span className="text-sm font-semibold text-ink">{formatPrice(product.price)}</span>
          <span
            className="flex items-center gap-1"
            aria-label={`Available in ${product.colors.length} colourways`}
            title={product.colorNames.join(' · ')}
          >
            {product.colors.map((color, index) => (
              <span
                key={color}
                className={cx(
                  'size-3.5 rounded-full border border-ink/10',
                  index === 0 && 'ring-1 ring-ink/25 ring-offset-2 ring-offset-cream',
                )}
                style={{ backgroundColor: color }}
              />
            ))}
          </span>
        </div>
      </div>
    </article>
  )
}
