import type { Localized } from '@/utils/locale';

type WorkbenchText = {
  openFiles: string;
  closeTab: (fileName: string) => string;
  pager: string;
  previousFile: (fileName: string) => string;
  nextFile: (fileName: string) => string;
};

/** Name of the project folder, on the explorer, the title and the path. */
export const projectName = 'portfolio';

/** Labels of the workbench chrome. */
export const workbenchText: Localized<WorkbenchText> = {
  pt: {
    openFiles: 'Arquivos abertos',
    closeTab: (fileName) => `Fechar ${fileName}`,
    pager: 'Navegação entre arquivos',
    previousFile: (fileName) => `Arquivo anterior: ${fileName}`,
    nextFile: (fileName) => `Próximo arquivo: ${fileName}`,
  },
  en: {
    openFiles: 'Open files',
    closeTab: (fileName) => `Close ${fileName}`,
    pager: 'File navigation',
    previousFile: (fileName) => `Previous file: ${fileName}`,
    nextFile: (fileName) => `Next file: ${fileName}`,
  },
};
