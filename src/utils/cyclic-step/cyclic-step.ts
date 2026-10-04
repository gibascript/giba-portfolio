/**
 * The item `delta` positions away from `current`, wrapping around both ends,
 * as the workbench does for the previous and next file. An item missing from
 * `items` counts as the first one.
 *
 * @typeParam T - Item type.
 * @param items - Items in order; must not be empty.
 * @param current - Item to step from.
 * @param delta - Positions to move: negative goes back.
 * @returns The item reached.
 * @example
 * cyclicStep(['a', 'b', 'c'], 'c', 1) // 'a'
 * cyclicStep(['a', 'b', 'c'], 'a', -1) // 'c'
 */
export function cyclicStep<T>(items: readonly T[], current: T, delta: number) {
  const index = Math.max(items.indexOf(current), 0);
  const length = items.length;

  return items[(((index + delta) % length) + length) % length];
}
