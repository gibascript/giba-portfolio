import { useId } from 'react';
import { ListItem } from '@/components/list-item';
import { Overline } from '@/components/overline';
import { links } from '@/constants/links';
import { uiText } from '@/constants/ui-text';
import {
  workbenchFileIds,
  workbenchFiles,
  type WorkbenchFileId,
} from '@/constants/workbench-files';
import { ExplorerLink } from '@/features/workbench/components/explorer/explorer-link';
import { projectName } from '@/features/workbench/constants/workbench-text';
import type { Locale } from '@/utils/locale';

type WorkbenchExplorerProps = {
  id: string;
  locale: Locale;
  activeFile: WorkbenchFileId;
  open: boolean;
  onOpenFile: (id: WorkbenchFileId) => void;
};

/**
 * The 260px explorer: the project folder with every file, then the links to
 * GitHub, LinkedIn and the CV. Always shown from `md` up; below it, a drawer
 * over the editor, shown while `open`.
 */
export function WorkbenchExplorer({
  id,
  locale,
  activeFile,
  open,
  onOpenFile,
}: WorkbenchExplorerProps) {
  const headingId = useId();
  const ui = uiText[locale];

  return (
    <nav
      id={id}
      aria-labelledby={headingId}
      data-open={open || undefined}
      className="absolute inset-y-0 left-0 z-10 hidden w-sidebar shrink-0 flex-col overflow-auto border-r border-subtle bg-surface data-open:flex md:relative md:flex"
    >
      <Overline
        as="h2"
        id={headingId}
        className="flex h-9 shrink-0 items-center px-4"
      >
        {ui.explorer}
      </Overline>
      <ListItem as="div" chevron="open" icon="folder-open">
        {projectName.toUpperCase()}
      </ListItem>
      <ul>
        {workbenchFileIds.map((fileId) => (
          <li key={fileId}>
            <ListItem
              nested
              icon={workbenchFiles[fileId].icon}
              aria-current={fileId === activeFile ? 'page' : undefined}
              onClick={() => onOpenFile(fileId)}
            >
              {workbenchFiles[fileId].name[locale]}
            </ListItem>
          </li>
        ))}
      </ul>
      <Overline
        as="h2"
        className="mt-4 flex h-9 shrink-0 items-center border-t border-subtle px-4"
      >
        {ui.links}
      </Overline>
      <ul className="flex flex-col gap-0.5 px-2 pb-4">
        <li>
          <ExplorerLink
            href={links.github.url}
            target="_blank"
            rel="noopener"
            glyph="↗"
            hint={ui.newTab}
          >
            GitHub
          </ExplorerLink>
        </li>
        <li>
          <ExplorerLink
            href={links.linkedin.url}
            target="_blank"
            rel="noopener"
            glyph="↗"
            hint={ui.newTab}
          >
            LinkedIn
          </ExplorerLink>
        </li>
        <li>
          <ExplorerLink
            href={links.cv.url}
            download={links.cv.fileName}
            glyph="↓"
          >
            {ui.downloadCv}
          </ExplorerLink>
        </li>
      </ul>
    </nav>
  );
}
