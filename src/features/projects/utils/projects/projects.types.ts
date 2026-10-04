/**
 * A project: its `name`, the `context` it happened in (company, period or
 * area), what it did and the technologies behind it as `tags`.
 */
export type Project = {
  name: string;
  context: string;
  description: string;
  tags: string[];
};
