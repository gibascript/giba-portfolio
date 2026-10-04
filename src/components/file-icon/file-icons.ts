import folderOpen from '@/assets/icons/folder-open.png';
import json from '@/assets/icons/json.svg';
import markdown from '@/assets/icons/markdown.svg';
import react from '@/assets/icons/react.png';
import shell from '@/assets/icons/shell.svg';
import typescript from '@/assets/icons/typescript.svg';
import yaml from '@/assets/icons/yaml.svg';

/** File-type icons from ayu-colors, the only full-color icons of giba-ds. */
export const fileIcons = {
  'folder-open': folderOpen,
  json,
  markdown,
  react,
  shell,
  typescript,
  yaml,
};

export type FileIconType = keyof typeof fileIcons;
