/**
 * Files open in the editor: the `tabs`, in opening order, and the `active` one,
 * always among them.
 *
 * @typeParam T - File id.
 */
export type OpenFiles<T> = {
  active: T;
  tabs: readonly T[];
};
