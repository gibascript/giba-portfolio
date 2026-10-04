import { useState } from 'react';

/** Whether the explorer drawer is open, and how to toggle or close it. */
export type ExplorerDrawer = {
  open: boolean;
  toggle: () => void;
  close: () => void;
};

/**
 * The explorer as a drawer, below the `md` breakpoint (wider, it is always
 * shown by CSS). Any change of `scope` closes it, so a scope that names the
 * stage and the open file closes it whenever another file opens (from the
 * explorer, the palette or the pager) or the page goes back to the hero.
 *
 * @param scope - Key of the situation the drawer belongs to.
 */
export function useExplorerDrawer(scope: string): ExplorerDrawer {
  const [drawer, setDrawer] = useState({ scope, open: false });

  if (drawer.scope !== scope) {
    setDrawer({ scope, open: false });
  }

  return {
    open: drawer.scope === scope && drawer.open,
    toggle: () => setDrawer({ scope, open: !drawer.open }),
    close: () => setDrawer({ scope, open: false }),
  };
}
