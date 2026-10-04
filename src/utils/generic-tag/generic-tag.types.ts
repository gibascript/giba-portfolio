import type { ComponentProps, ElementType } from 'react';

/**
 * Props of a polymorphic component: the native props of the tag or component
 * given in `as`, plus `as` itself.
 *
 * @typeParam T - Tag or component rendered.
 */
export type GenericTag<T extends ElementType> = {
  as?: T;
} & Omit<ComponentProps<T>, 'as'>;
