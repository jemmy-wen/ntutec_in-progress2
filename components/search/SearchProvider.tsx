"use client";

import SearchDialog, { useSearchDialog } from "./SearchDialog";

/**
 * SearchProvider mounts the SearchDialog in the layout tree and owns
 * the open/close state.  The Cmd+K keyboard shortcut is registered
 * via the useSearchDialog hook.
 */
export default function SearchProvider() {
  const { open, setOpen } = useSearchDialog();

  return <SearchDialog open={open} onOpenChange={setOpen} />;
}
