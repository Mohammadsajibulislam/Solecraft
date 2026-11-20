/** Format a number as whole-dollar currency (e.g. 148 → $148). */
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

export function formatPrice(value) {
  return formatter.format(value);
}
