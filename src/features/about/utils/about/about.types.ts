/** A short fact beside the about text, e.g. `experiência: 8 anos`. */
export type AboutFact = {
  key: string;
  value: string;
};

/** The about file: a `lead` headline, the paragraphs and the facts. */
export type AboutContent = {
  lead: string;
  paragraphs: string[];
  facts: AboutFact[];
};
