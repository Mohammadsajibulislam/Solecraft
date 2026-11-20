/** Join conditional class names without a dependency. */
export function cx(...values) {
  return values.filter(Boolean).join(' ');
}
