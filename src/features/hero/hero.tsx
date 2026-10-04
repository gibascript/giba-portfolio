import { Button } from '@/components/button';
import { CodeToken } from '@/components/code';
import { Overline } from '@/components/overline';
import { uiText } from '@/constants/ui-text';
import { workbenchFileIds, workbenchFiles } from '@/constants/workbench-files';
import { useLocaleContext } from '@/context/locale/use-locale-context';
import { useWorkbenchContext } from '@/context/workbench/use-workbench-context';
import { HeroShortcutHint } from '@/features/hero/components/actions/hero-shortcut-hint';
import { HeroFileLink } from '@/features/hero/components/explorer/hero-file-link';
import { HeroLineNumber } from '@/features/hero/components/heading/hero-line-number';
import { HeroTypedRole } from '@/features/hero/components/heading/hero-typed-role';
import { heroText } from '@/features/hero/constants/hero-text';
import { heroContent } from '@/features/hero/content/hero';

/**
 * The landing screen, dressed as the first lines of a file: the name, the
 * typed roles, the headline and the call to open the workbench, beside an
 * explorer that opens any section straight away.
 */
export default function Hero() {
  const locale = useLocaleContext();
  const workbench = useWorkbenchContext();
  const content = heroContent[locale.locale];
  const ui = uiText[locale.locale];

  return (
    <div className="flex min-h-full flex-wrap items-stretch gap-12 py-8 pr-8">
      <div className="grid min-w-0 grow basis-140 grid-cols-gutter content-center font-mono">
        <HeroLineNumber>1</HeroLineNumber>
        <CodeToken aria-hidden kind="comment" className="text-lg leading-code">
          // ~/gilberto-alves/portfolio
        </CodeToken>
        <HeroLineNumber>2</HeroLineNumber>
        <span className="h-5" />
        <HeroLineNumber className="pt-hero-nudge">3</HeroLineNumber>
        <h1 className="flex flex-col font-display text-display-hero font-semibold text-strong">
          <span>Gilberto</span>{' '}
          <span>
            Alves<span className="ml-hero-dot text-accent">.</span>
          </span>
        </h1>
        <HeroLineNumber className="pt-7">4</HeroLineNumber>
        <p className="min-h-8 pt-7 text-display-xs leading-snug tracking-normal text-strong">
          <CodeToken aria-hidden kind="keyword">
            &gt;{' '}
          </CodeToken>
          <HeroTypedRole key={locale.locale} roles={content.roles} />
        </p>
        <HeroLineNumber className="pt-4">5</HeroLineNumber>
        <p className="max-w-headline pt-4 font-sans text-prose leading-relaxed text-pretty text-body">
          {content.headline}
        </p>
        <HeroLineNumber className="pt-10">6</HeroLineNumber>
        <div className="flex flex-wrap items-center gap-3 pt-10">
          <Button
            variant="primary"
            onClick={() => workbench.showStage('workbench')}
          >
            {heroText[locale.locale].openWorkbench} <span aria-hidden>→</span>
          </Button>
          <HeroShortcutHint
            locale={locale.locale}
            shortcutsEnabled={workbench.shortcutsEnabled}
          />
        </div>
      </div>
      <nav
        aria-label={ui.sections}
        className="flex min-w-60 shrink basis-75 flex-col justify-center border-l border-subtle pl-8"
      >
        <Overline aria-hidden className="pb-3 pl-2">
          {ui.explorer}
        </Overline>
        <ol>
          {workbenchFileIds.map((fileId, index) => (
            <li key={fileId}>
              <HeroFileLink
                number={String(index + 1).padStart(2, '0')}
                icon={workbenchFiles[fileId].icon}
                onClick={() => workbench.openFile(fileId)}
              >
                {workbenchFiles[fileId].name[locale.locale]}
              </HeroFileLink>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}
