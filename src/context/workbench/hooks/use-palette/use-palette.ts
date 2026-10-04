import { useState } from 'react';

/** Whether the command palette is open, and how to open, close or toggle it. */
export type Palette = {
  paletteOpen: boolean;
  openPalette: () => void;
  closePalette: () => void;
  togglePalette: () => void;
};

/** Open state of the command palette, closed at first. */
export function usePalette(): Palette {
  const [paletteOpen, setPaletteOpen] = useState(false);

  return {
    paletteOpen,
    openPalette: () => setPaletteOpen(true),
    closePalette: () => setPaletteOpen(false),
    togglePalette: () => setPaletteOpen((open) => !open),
  };
}
