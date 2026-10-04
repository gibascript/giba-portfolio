/** Dimmed syntax colors of Back to Black, by token kind. */
export const codeTokens = {
  comment: 'text-syn-comment italic',
  keyword: 'text-syn-keyword',
  function: 'text-syn-function',
  property: 'text-syn-tag',
  string: 'text-syn-string',
  punctuation: 'text-muted',
};

export type CodeTokenKind = keyof typeof codeTokens;
