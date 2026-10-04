/** Colors of each button variant; hover effects skip disabled buttons. */
export const buttonVariants = {
  primary: 'bg-accent text-on-accent not-disabled:hover:opacity-90',
  secondary: 'bg-surface-control text-body not-disabled:hover:text-strong',
  ghost:
    'bg-transparent text-body not-disabled:hover:bg-surface-hover not-disabled:hover:text-strong',
};

/** Padding and font size of each button size. */
export const buttonSizes = {
  md: 'px-3 py-2 text-lg',
  sm: 'px-2 py-1 text-sm',
};

export type ButtonVariant = keyof typeof buttonVariants;

export type ButtonSize = keyof typeof buttonSizes;
