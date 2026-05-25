/**
 * Fixed parallel rows for card/box grids:
 * - 4 items → 2×2 (2 columns)
 * - 6 items → 2 rows × 3 wide (3 columns)
 * - 8 items → 4 rows × 2 wide (2 columns)
 */
export function boxGridColumns(itemCount: number): 2 | 3 {
  if (itemCount === 6) return 3
  if (itemCount === 4 || itemCount === 8) return 2
  if (itemCount <= 4) return 2
  if (itemCount <= 6) return 3
  return 2
}

export function boxGridClass(itemCount: number): string {
  return `box-grid box-grid--cols-${boxGridColumns(itemCount)}`
}
