import { createContext } from 'react';

/** Id that a `Section` gives its `SectionTitle`, to be labelled by it. */
export const SectionTitleIdContext = createContext<string | undefined>(
  undefined,
);
