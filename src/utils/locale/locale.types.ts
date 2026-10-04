/** Language of the product text: `pt` (pt-BR, the default) or `en`. */
export type Locale = 'pt' | 'en';

/**
 * A piece of content in every locale. A missing translation fails `tsc`.
 *
 * @typeParam T - Shape of the content in one locale.
 */
export type Localized<T> = Record<Locale, T>;
