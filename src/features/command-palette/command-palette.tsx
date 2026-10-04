import { useEffect, useState } from 'react';
import { uiText } from '@/constants/ui-text';
import { useLocaleContext } from '@/context/locale/use-locale-context';
import { useWorkbenchContext } from '@/context/workbench/use-workbench-context';
import { PalettePanel } from '@/features/command-palette/components/panel/palette-panel';
import { usePaletteShortcut } from '@/features/command-palette/hooks/use-palette-shortcut';
import { paletteCommands } from '@/features/command-palette/utils/palette-commands';

/**
 * The command palette, toggled with ⌘K / Ctrl K or the "Comandos" buttons: a
 * modal `<dialog>` near the top of the screen, which keeps focus inside and
 * makes the page behind inert. Esc, a click outside or running a command
 * closes it.
 */
export default function CommandPalette() {
  const locale = useLocaleContext();
  const workbench = useWorkbenchContext();
  const [dialog, setDialog] = useState<HTMLDialogElement | null>(null);
  const open = workbench.paletteOpen;

  usePaletteShortcut(workbench.togglePalette);

  useEffect(() => {
    if (open && !dialog?.open) {
      dialog?.showModal();
    } else if (!open && dialog?.open) {
      dialog.close();
    }
  }, [dialog, open]);

  const commands = paletteCommands({
    locale: locale.locale,
    shortcutsEnabled: workbench.shortcutsEnabled,
    openFile: workbench.openFile,
    toggleLocale: locale.toggleLocale,
    toggleShortcuts: workbench.toggleShortcuts,
    copyText: workbench.clipboard.copy,
    goHome: () => workbench.showStage('hero'),
  });

  return (
    <dialog
      ref={setDialog}
      aria-label={uiText[locale.locale].palette}
      onClose={workbench.closePalette}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          workbench.closePalette();
        }
      }}
      className="mx-auto mt-palette-top mb-auto w-palette max-w-none overflow-visible bg-transparent p-0 text-body backdrop:bg-scrim"
    >
      {open && (
        <PalettePanel
          locale={locale.locale}
          commands={commands}
          onRun={(command) => {
            workbench.closePalette();
            command.run();
          }}
        />
      )}
    </dialog>
  );
}
