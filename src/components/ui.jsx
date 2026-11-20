import { useEffect, useRef, useState } from 'react'
import { useReveal } from '../hooks/useUI'
import { cx } from '../utils/cx'

/* ============================================================
   Icons — one inline set keeps the stroke weight consistent
   and avoids pulling in an icon dependency.
   ============================================================ */
const icons = {
  'arrow-up-right': (
    <>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </>
  ),
  'arrow-right': (
    <>
      <path d="M4 12h16" />
      <path d="m14 6 6 6-6 6" />
    </>
  ),
  'arrow-up': (
    <>
      <path d="M12 20V4" />
      <path d="m6 10 6-6 6 6" />
    </>
  ),
  'arrow-down': (
    <>
      <path d="M12 4v16" />
      <path d="m6 14 6 6 6-6" />
    </>
  ),
  'chevron-down': <path d="m6 9 6 6 6-6" />,
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m16.5 16.5 4.5 4.5" />
    </>
  ),
  heart: (
    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1L12 21l7.7-7.6 1.1-1a5.5 5.5 0 0 0 0-7.8Z" />
  ),
  menu: (
    <>
      <path d="M3 7h18" />
      <path d="M3 12h18" />
      <path d="M3 17h18" />
    </>
  ),
  close: (
    <>
      <path d="m5 5 14 14" />
      <path d="M19 5 5 19" />
    </>
  ),
  star: (
    <path d="m12 3 2.6 5.7 6.2.7-4.6 4.2 1.3 6.1L12 16.6l-5.5 3.1 1.3-6.1L3.2 9.4l6.2-.7L12 3Z" />
  ),
  check: <path d="m4 12.5 5 5L20 6.5" />,
  truck: (
    <>
      <path d="M3 6h11v10H3z" />
      <path d="M14 9h4l3 3v4h-7" />
      <circle cx="7" cy="18" r="2" />
      <circle cx="18" cy="18" r="2" />
    </>
  ),
  leaf: (
    <>
      <path d="M4 20c0-8 5-14 16-15 1 11-5 16-13 16H4Z" />
      <path d="M4 20C7 14 11 11 16 9" />
    </>
  ),
  sparkle: (
    <path d="M12 2c.6 5.4 4.6 9.4 10 10-5.4.6-9.4 4.6-10 10-.6-5.4-4.6-9.4-10-10 5.4-.6 9.4-4.6 10-10Z" />
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="m4 7 8 6 8-6" />
    </>
  ),
  phone: (
    <path d="M6.6 3h3l1.5 4.5-2 1.5a13 13 0 0 0 5.9 5.9l1.5-2L21 14.4v3a3.6 3.6 0 0 1-4 3.6C9.6 20 4 14.4 3 7a3.6 3.6 0 0 1 3.6-4Z" />
  ),
  pin: (
    <>
      <path d="M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </>
  ),
  ruler: (
    <>
      <path d="m3 16 5-5L19 22l-5 5Z" transform="translate(0 -3)" />
      <path d="m7 15 2 2M10 12l2 2M13 9l2 2" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
    </>
  ),
  pinterest: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M10.4 20c.6-2.4 1.3-5.3 1.8-7.5" />
      <path d="M9.5 13.7c-.7-1.4-.7-3.2.1-4.6 1.3-2.2 4.4-2.6 6.3-.9 2 1.8 1.7 5.3-.5 6.9-1.5 1.1-3.7.8-4.5-.6" />
    </>
  ),
  youtube: (
    <>
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
      <path d="m10 9 5 3-5 3Z" fill="currentColor" stroke="none" />
    </>
  ),
  x: (
    <>
      <path d="M4 4h4l12 16h-4L4 4Z" />
      <path d="M20 4 4 20" />
    </>
  ),
}

export function Icon({ name, size = 20, strokeWidth = 1.7, filled = false, className, title }) {
  const content = icons[name]
  if (!content) return null

  const fillable = name === 'heart' || name === 'star' || name === 'sparkle'
  const shouldFill = filled && fillable

  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={shouldFill ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      focusable="false"
    >
      {title && <title>{title}</title>}
      {content}
    </svg>
  )
}

/* ============================================================
   Layout + brand
   ============================================================ */
export function Container({ className, children }) {
  return (
    <div className={cx('mx-auto w-full max-w-[1300px] px-5 sm:px-8 lg:px-14', className)}>
      {children}
    </div>
  )
}

export function Logo({ light = false, className }) {
  return (
    <a
      href="#top"
      className={cx('group inline-flex items-center gap-2.5', className)}
      aria-label="Solecraft — back to top"
    >
      <span
        className={cx(
          'grid size-9 shrink-0 place-items-center rounded-full border transition-colors duration-300',
          light
            ? 'border-cream/25 bg-cream/5 text-cream'
            : 'border-ink/20 bg-cream/60 text-ink group-hover:border-clay/50',
        )}
      >
        <svg
          viewBox="0 0 24 24"
          className="size-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="M16.8 7c-2.8-2.6-8-1.4-8 2.3 0 3.2 7.4 2.2 7.4 6 0 3.2-5.2 4.4-8 2" />
          <path d="M18.4 17.4h.01" strokeWidth="2.6" />
        </svg>
      </span>
      <span
        className={cx(
          'font-display text-[1.65rem] leading-none tracking-[-0.02em]',
          light ? 'text-cream' : 'text-ink',
        )}
      >
        Solecraft<span className="text-clay">.</span>
      </span>
    </a>
  )
}

/* ============================================================
   Actions + labels
   ============================================================ */
const buttonVariants = {
  primary: 'bg-ink text-cream hover:bg-clay',
  secondary:
    'border border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-cream',
  light: 'bg-cream text-ink hover:bg-paper-deep',
  outlineLight: 'border border-cream/25 text-cream hover:bg-cream hover:text-ink',
  ghost: 'text-ink hover:text-clay',
}

const buttonSizes = {
  sm: 'h-9 px-4 text-xs',
  md: 'h-11 px-5 text-sm',
  lg: 'h-[52px] px-6 text-sm',
}

export function Button({
  children,
  href,
  variant = 'primary',
  size = 'md',
  icon,
  className,
  type = 'button',
  ...rest
}) {
  const Tag = href ? 'a' : 'button'
  const tagProps = href ? { href } : { type }
  const isGhost = variant === 'ghost'

  return (
    <Tag
      className={cx(
        'group inline-flex items-center justify-center gap-2.5 rounded-full font-medium transition-all duration-300',
        buttonVariants[variant],
        !isGhost && buttonSizes[size],
        className,
      )}
      {...tagProps}
      {...rest}
    >
      <span>{children}</span>
      {icon && (
        <span
          className="shrink-0 transition-transform duration-300 group-hover:translate-x-0.5"
          aria-hidden="true"
        >
          {icon}
        </span>
      )}
    </Tag>
  )
}

const badgeTones = {
  New: 'bg-pine text-cream',
  Bestseller: 'bg-clay text-cream',
  Limited: 'border border-ink/15 bg-cream/90 text-ink',
  soft: 'bg-paper-deep text-ink',
}

export function Badge({ tone = 'soft', className, children }) {
  return (
    <span
      className={cx(
        'inline-flex items-center rounded-full px-2.5 py-1 font-mono text-[9px] font-medium uppercase tracking-[0.14em]',
        badgeTones[tone] ?? badgeTones.soft,
        className,
      )}
    >
      {children}
    </span>
  )
}

export function Stars({ rating = 5, size = 12, className }) {
  return (
    <span
      className={cx('inline-flex items-center gap-0.5 text-clay', className)}
      aria-label={`${rating} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((value) => (
        <Icon
          key={value}
          name="star"
          size={size}
          filled={value <= Math.round(rating)}
          className={value <= Math.round(rating) ? undefined : 'text-clay/30'}
        />
      ))}
    </span>
  )
}

export function Eyebrow({ children, light = false, className }) {
  return (
    <span
      className={cx(
        'inline-flex items-center gap-3 font-mono text-[0.68rem] font-medium uppercase tracking-[0.18em]',
        light ? 'text-cream/60' : 'text-muted',
        className,
      )}
    >
      <span className="h-px w-6 bg-current opacity-60" aria-hidden="true" />
      {children}
    </span>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  light = false,
  id,
  className,
}) {
  return (
    <div
      className={cx(
        'flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between',
        className,
      )}
    >
      <div className="max-w-2xl">
        {eyebrow && <Eyebrow light={light}>{eyebrow}</Eyebrow>}
        <h2
          id={id}
          className={cx(
            'mt-5 font-display text-[clamp(2.4rem,4.6vw,3.9rem)] leading-[0.98] tracking-[-0.02em]',
            light ? 'text-cream' : 'text-ink',
          )}
        >
          {title}
        </h2>
        {description && (
          <p
            className={cx(
              'mt-5 max-w-xl text-[0.98rem] leading-relaxed',
              light ? 'text-cream/65' : 'text-muted',
            )}
          >
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}

/* ============================================================
   Motion + media
   ============================================================ */
export function Reveal({ children, delay = 0, className, as: Tag = 'div', style, ...rest }) {
  const [ref, inView] = useReveal()

  return (
    <Tag
      ref={ref}
      className={cx('reveal', inView && 'is-visible', className)}
      style={{ '--reveal-delay': `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

export function SmartImage({
  src,
  alt,
  className,
  imgClassName,
  priority = false,
  ...rest
}) {
  const [loaded, setLoaded] = useState(false)
  const imageRef = useRef(null)

  useEffect(() => {
    if (imageRef.current?.complete) setLoaded(true)
  }, [src])

  return (
    <div className={cx('relative overflow-hidden bg-paper-deep', className)}>
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={cx(
          'h-full w-full object-cover transition-[opacity,transform] duration-700 ease-soft',
          loaded ? 'opacity-100' : 'opacity-0',
          imgClassName,
        )}
        {...rest}
      />
    </div>
  )
}

/* ============================================================
   Form controls
   ============================================================ */
export function SearchField({
  id,
  value,
  onChange,
  onSubmit,
  placeholder = 'Search…',
  label = 'Search',
  size = 'md',
  autoFocus = false,
  inputRef,
  className,
}) {
  const fallbackRef = useRef(null)
  const ref = inputRef ?? fallbackRef

  return (
    <form
      role="search"
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit?.()
      }}
      className={cx('group relative flex w-full items-center', className)}
    >
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <Icon
        name="search"
        size={17}
        className="pointer-events-none absolute left-4 text-muted transition-colors duration-300 group-focus-within:text-ink"
      />
      <input
        ref={ref}
        id={id}
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        autoComplete="off"
        spellCheck={false}
        enterKeyHint="search"
        className={cx(
          'w-full rounded-full border border-ink/10 bg-cream/70 pl-11 pr-11 text-ink placeholder:text-muted/70 transition-colors duration-300 focus:border-ink/35 focus:bg-cream focus:outline-none',
          size === 'lg' ? 'h-14 text-[0.95rem]' : 'h-11 text-sm',
        )}
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label="Clear search"
          className="absolute right-3 grid size-7 place-items-center rounded-full text-muted transition-colors hover:bg-ink/5 hover:text-ink"
        >
          <Icon name="close" size={13} />
        </button>
      )}
    </form>
  )
}

export function SortSelect({ id = 'sort', value, onChange, options }) {
  return (
    <div className="relative shrink-0">
      <label htmlFor={id} className="sr-only">
        Sort products
      </label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 w-full appearance-none rounded-full border border-ink/10 bg-transparent pl-5 pr-11 text-sm text-ink-soft transition-colors hover:border-ink/30 focus:border-ink/35 focus:outline-none sm:w-auto"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <Icon
        name="chevron-down"
        size={15}
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted"
      />
    </div>
  )
}

/* ============================================================
   Marquee strip
   ============================================================ */
export function Marquee({ items }) {
  const loop = [...items, ...items]

  return (
    <div
      className="overflow-hidden border-y border-ink/10 bg-cream/50 py-4"
      aria-hidden="true"
    >
      <div className="flex w-max animate-marquee items-center hover:[animation-play-state:paused]">
        {loop.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="flex shrink-0 items-center gap-4 pr-8 font-mono text-[10px] uppercase tracking-[0.22em] text-muted"
          >
            <Icon name="sparkle" size={11} className="text-clay" />
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
