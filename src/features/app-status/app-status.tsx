import {
  StatusBar,
  StatusBarButton,
  StatusBarGroup,
  StatusBarItem,
} from '@/components/status-bar';
import { paletteKeyShortcuts, paletteShortcut } from '@/constants/keyboard';
import { uiText } from '@/constants/ui-text';
import { workbenchFiles } from '@/constants/workbench-files';
import { useLocaleContext } from '@/context/locale/use-locale-context';
import { useWorkbenchContext } from '@/context/workbench/use-workbench-context';
import { appStatusText } from '@/features/app-status/app-status-text';
import { useNow } from '@/features/app-status/hooks/use-now';
import { formatClock } from '@/features/app-status/utils/clock';

/**
 * The status bar at the bottom of the page: the open file and a live status
 * ("Pronto", or the copied e-mail) on the left; Brazil's time and the
 * language switch on the right.
 */
export default function AppStatus() {
  const locale = useLocaleContext();
  const workbench = useWorkbenchContext();
  const now = useNow();
  const text = appStatusText[locale.locale];
  const ui = uiText[locale.locale];
  const copied = workbench.clipboard.copied;
  const fileName = workbenchFiles[workbench.activeFile].name[locale.locale];

  return (
    <StatusBar>
      <StatusBarGroup>
        {workbench.stage === 'hero' && (
          <StatusBarItem>~/gilberto-alves</StatusBarItem>
        )}
        {workbench.stage === 'workbench' && (
          <StatusBarButton
            aria-label={`${fileName} — ${ui.home}`}
            title={ui.home}
            onClick={() => workbench.showStage('hero')}
          >
            {fileName}
          </StatusBarButton>
        )}
        <StatusBarItem
          role="status"
          className={copied ? 'text-success' : 'text-muted'}
        >
          {copied ? `✓ ${ui.emailCopied}` : text.ready}
        </StatusBarItem>
      </StatusBarGroup>
      <StatusBarGroup>
        <StatusBarItem>
          <span className="hidden md:inline">{text.location} · </span>
          <time dateTime={now.toISOString()}>
            {formatClock(now, locale.locale)}
          </time>{' '}
          UTC−3
        </StatusBarItem>
        <StatusBarButton
          aria-label={text.switchLocale}
          title={text.switchLocale}
          onClick={locale.toggleLocale}
          className="gap-1.5 font-mono text-sm"
        >
          <span
            className={locale.locale === 'pt' ? 'text-strong' : 'text-faint'}
          >
            PT-BR
          </span>
          <span aria-hidden className="text-faint">
            |
          </span>
          <span
            className={locale.locale === 'en' ? 'text-strong' : 'text-faint'}
          >
            EN
          </span>
        </StatusBarButton>
        <StatusBarButton
          aria-label={`${paletteShortcut} — ${ui.palette}`}
          aria-keyshortcuts={paletteKeyShortcuts}
          title={ui.palette}
          onClick={workbench.openPalette}
        >
          {paletteShortcut}
        </StatusBarButton>
      </StatusBarGroup>
    </StatusBar>
  );
}
