import { useId, type ComponentType } from 'react';
import {
  workbenchFiles,
  type WorkbenchFileId,
} from '@/constants/workbench-files';
import { useLocaleContext } from '@/context/locale/use-locale-context';
import { useWorkbenchContext } from '@/context/workbench/use-workbench-context';
import { WorkbenchTitleBar } from '@/features/workbench/components/chrome/workbench-title-bar';
import { WorkbenchEditor } from '@/features/workbench/components/editor/workbench-editor';
import { WorkbenchPager } from '@/features/workbench/components/editor/workbench-pager';
import { WorkbenchTabs } from '@/features/workbench/components/editor/workbench-tabs';
import { WorkbenchExplorer } from '@/features/workbench/components/explorer/workbench-explorer';
import { projectName } from '@/features/workbench/constants/workbench-text';
import { useExplorerDrawer } from '@/features/workbench/hooks/use-explorer-drawer';

type WorkbenchProps = {
  files: Record<WorkbenchFileId, ComponentType>;
};

/**
 * The editor workbench: title bar, explorer, tabs, file path and the editor
 * with the open file and its pager. `files` holds the section of each file,
 * given by the app so that this feature does not import the others.
 */
export default function Workbench({ files }: WorkbenchProps) {
  const locale = useLocaleContext();
  const workbench = useWorkbenchContext();
  const drawer = useExplorerDrawer(
    `${workbench.stage}/${workbench.activeFile}`,
  );
  const explorerId = useId();
  const fileName = workbenchFiles[workbench.activeFile].name[locale.locale];
  const File = files[workbench.activeFile];

  const openFromExplorer = (id: WorkbenchFileId) => {
    drawer.close();
    workbench.openFile(id);
  };

  return (
    <div className="flex h-full flex-col bg-surface">
      <WorkbenchTitleBar
        locale={locale.locale}
        fileName={fileName}
        explorerId={explorerId}
        explorerOpen={drawer.open}
        onToggleExplorer={drawer.toggle}
        onHome={() => workbench.showStage('hero')}
        onOpenPalette={workbench.openPalette}
      />
      <div className="relative flex min-h-0 flex-1">
        <WorkbenchExplorer
          id={explorerId}
          locale={locale.locale}
          activeFile={workbench.activeFile}
          open={drawer.open}
          onOpenFile={openFromExplorer}
        />
        <div className="flex min-w-0 flex-1 flex-col">
          <WorkbenchTabs
            locale={locale.locale}
            tabs={workbench.openTabs}
            activeFile={workbench.activeFile}
            onOpenFile={workbench.openFile}
            onCloseTab={workbench.closeTab}
          />
          <p className="flex h-6 shrink-0 items-center gap-1.5 px-4 text-md text-muted">
            <span>{projectName}</span>
            <span aria-hidden className="text-faint">
              ›
            </span>
            <span className="text-body">{fileName}</span>
          </p>
          <WorkbenchEditor key={workbench.activeFile}>
            <File />
            <WorkbenchPager
              locale={locale.locale}
              activeFile={workbench.activeFile}
              onStep={workbench.stepFile}
            />
          </WorkbenchEditor>
        </div>
      </div>
    </div>
  );
}
