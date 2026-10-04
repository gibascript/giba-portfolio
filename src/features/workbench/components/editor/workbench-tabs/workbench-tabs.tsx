import { Tab, TabClose, Tabs, TabTrigger } from '@/components/tabs';
import {
  workbenchFiles,
  type WorkbenchFileId,
} from '@/constants/workbench-files';
import { workbenchText } from '@/features/workbench/constants/workbench-text';
import type { Locale } from '@/utils/locale';

type WorkbenchTabsProps = {
  locale: Locale;
  tabs: readonly WorkbenchFileId[];
  activeFile: WorkbenchFileId;
  onOpenFile: (id: WorkbenchFileId) => void;
  onCloseTab: (id: WorkbenchFileId) => void;
};

/** One tab per open file, in opening order, each with its close button. */
export function WorkbenchTabs({
  locale,
  tabs,
  activeFile,
  onOpenFile,
  onCloseTab,
}: WorkbenchTabsProps) {
  const text = workbenchText[locale];

  return (
    <Tabs role="group" aria-label={text.openFiles}>
      {tabs.map((fileId) => {
        const file = workbenchFiles[fileId];
        const active = fileId === activeFile;

        return (
          <Tab key={fileId} active={active}>
            <TabTrigger
              icon={file.icon}
              aria-current={active ? 'page' : undefined}
              onClick={() => onOpenFile(fileId)}
            >
              {file.name[locale]}
            </TabTrigger>
            <TabClose
              aria-label={text.closeTab(file.name[locale])}
              onClick={() => onCloseTab(fileId)}
            />
          </Tab>
        );
      })}
    </Tabs>
  );
}
