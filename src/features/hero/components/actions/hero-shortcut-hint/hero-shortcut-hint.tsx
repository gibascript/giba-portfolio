import { Kbd } from '@/components/kbd';
import { shortcutModifier } from '@/constants/keyboard';
import { heroText } from '@/features/hero/constants/hero-text';
import type { Locale } from '@/utils/locale';

type HeroShortcutHintProps = {
  locale: Locale;
  shortcutsEnabled: boolean;
};

/**
 * "↵ ou ⌘ K para navegar", beside the hero call to action. The Enter key only
 * shows while the single-key shortcuts are on; the palette shortcut always.
 */
export function HeroShortcutHint({
  locale,
  shortcutsEnabled,
}: HeroShortcutHintProps) {
  const text = heroText[locale];

  return (
    <p className="flex items-center gap-1.5 font-sans text-md whitespace-nowrap text-muted">
      {shortcutsEnabled && (
        <>
          <Kbd>↵</Kbd>
          <span>{text.or}</span>
        </>
      )}
      <Kbd>{shortcutModifier}</Kbd>
      <Kbd>K</Kbd>
      <span>{text.toNavigate}</span>
    </p>
  );
}
