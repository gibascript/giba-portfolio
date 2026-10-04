/**
 * jsdom lacks the modal API of `<dialog>`: this stand-in opens it, focusing
 * its first focusable element as browsers do, and closes it, firing `close`.
 * The focus trap and the backdrop are left to the browser smoke tests.
 */
export function installDialogPolyfill() {
  HTMLDialogElement.prototype.showModal = function showModal() {
    this.open = true;
    this.querySelector<HTMLElement>(
      'input, button, a[href], [tabindex]:not([tabindex="-1"])',
    )?.focus();
  };
  HTMLDialogElement.prototype.close = function close() {
    if (!this.open) {
      return;
    }
    this.open = false;
    this.dispatchEvent(new Event('close'));
  };
}
