import {
  footerColumns,
  paymentMethods,
  socialLinks,
  store,
} from '../data/content'
import { Container, Icon, Logo } from './ui'

const legalLinks = [
  { label: 'Privacy', href: '#visit' },
  { label: 'Terms', href: '#visit' },
  { label: 'Accessibility', href: '#visit' },
  { label: 'Cookies', href: '#visit' },
]

/** Closing footer: store details, link columns, socials and a giant wordmark. */
export default function SiteFooter() {
  return (
    <footer id="visit" className="relative overflow-hidden bg-ink text-cream">
      <Container className="relative z-10 pt-16 md:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_1.5fr] lg:gap-16">
          <div>
            <Logo light />

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-cream/60">
              Fewer, better pairs — hand-finished in Porto, designed in Copenhagen,
              and repaired for as long as you wear them.
            </p>

            <div className="mt-8 space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <Icon name="pin" size={16} className="mt-0.5 shrink-0 text-clay-light" />
                <address className="not-italic leading-relaxed text-cream/75">
                  {store.address.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </div>

              <div className="flex items-start gap-3">
                <Icon name="clock" size={16} className="mt-0.5 shrink-0 text-clay-light" />
                <div className="leading-relaxed text-cream/75">
                  {store.hours.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Icon name="phone" size={16} className="mt-0.5 shrink-0 text-clay-light" />
                <div className="leading-relaxed">
                  <a
                    href={`tel:${store.phone.replace(/\s/g, '')}`}
                    className="block text-cream/75 transition-colors hover:text-cream"
                  >
                    {store.phone}
                  </a>
                  <a
                    href={`mailto:${store.email}`}
                    className="block text-cream/75 transition-colors hover:text-cream"
                  >
                    {store.email}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {footerColumns.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <h2 className="font-mono text-[9px] uppercase tracking-[0.2em] text-cream/40">
                  {column.title}
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="group inline-flex items-center gap-1.5 text-[13px] text-cream/70 transition-colors hover:text-cream"
                      >
                        {link.label}
                        <Icon
                          name="arrow-up-right"
                          size={11}
                          className="opacity-0 transition-opacity group-hover:opacity-100"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-6 border-t border-cream/10 py-7 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                className="grid size-9 place-items-center rounded-full border border-cream/15 text-cream/70 transition-colors hover:border-cream/40 hover:bg-cream/10 hover:text-cream"
              >
                <Icon name={social.icon} size={15} />
              </a>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-cream/35">
              We accept
            </span>
            <ul className="flex flex-wrap items-center gap-2">
              {paymentMethods.map((method) => (
                <li
                  key={method}
                  className="rounded-md border border-cream/15 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.1em] text-cream/60"
                >
                  {method}
                </li>
              ))}
            </ul>
          </div>

          <a
            href="#top"
            className="group inline-flex items-center gap-2 self-start font-mono text-[9px] uppercase tracking-[0.16em] text-cream/55 transition-colors hover:text-cream md:self-auto"
          >
            Back to top
            <span className="grid size-8 place-items-center rounded-full border border-cream/20 transition-colors group-hover:border-clay group-hover:bg-clay">
              <Icon name="arrow-up" size={13} />
            </span>
          </a>
        </div>

        <div className="flex flex-col gap-4 border-t border-cream/10 py-6 text-[11px] text-cream/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Solecraft Studio ApS. All rights reserved.</p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {legalLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="transition-colors hover:text-cream">
                  {link.label}
                </a>
              </li>
            ))}
            <li className="font-mono text-[9px] uppercase tracking-[0.14em] text-cream/30">
              Demo storefront
            </li>
          </ul>
        </div>
      </Container>

      <div
        className="pointer-events-none select-none overflow-hidden px-4"
        aria-hidden="true"
      >
        <span className="footer-word block whitespace-nowrap text-center font-display text-[clamp(4.5rem,17vw,15rem)] leading-[0.78] tracking-[-0.04em]">
          Solecraft
        </span>
      </div>
    </footer>
  )
}
