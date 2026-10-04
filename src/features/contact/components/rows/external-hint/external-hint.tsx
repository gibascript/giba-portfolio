type ExternalHintProps = {
  label: string;
};

/**
 * The ↗ of a contact row that opens a new tab: shown as the arrow, read by
 * screen readers as `label`, e.g. "(abre em nova aba)".
 */
export function ExternalHint({ label }: ExternalHintProps) {
  return (
    <>
      <span aria-hidden className="text-muted">
        ↗
      </span>
      <span className="sr-only">{label}</span>
    </>
  );
}
