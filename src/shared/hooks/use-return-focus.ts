import { useCallback, useLayoutEffect, useRef } from 'react';

/**
 * Remembers which element had focus when a dialog opened and gives it focus back on close.
 * Radix dialogs only do this for their own <Dialog.Trigger>; ours are opened by other buttons.
 * Pass the returned handler to Dialog.Content's onCloseAutoFocus.
 */
export function useReturnFocus(open: boolean) {
  const openerRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (open && document.activeElement instanceof HTMLElement && document.activeElement !== document.body) {
      openerRef.current = document.activeElement;
    }
  }, [open]);

  return useCallback((event: Event) => {
    const opener = openerRef.current;
    if (opener && opener.isConnected) {
      event.preventDefault();
      opener.focus();
    }
    openerRef.current = null;
  }, []);
}
