/**
 * A job: the `role` held at `company` during `period`, a summary and its
 * highlights. `current` marks the job held today.
 */
export type Job = {
  company: string;
  role: string;
  period: string;
  current?: boolean;
  summary: string;
  highlights: string[];
};
