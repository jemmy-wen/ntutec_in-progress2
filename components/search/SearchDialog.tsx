"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
  CommandGroup,
  CommandEmpty,
} from "cmdk";
import {
  Search,
  FileText,
  Users,
  Rocket,
  HelpCircle,
  X,
} from "lucide-react";
import { searchItems, type SearchItem } from "@/lib/search-index";

/* ── category icons ──────────────────────────────────────────────────────── */

const CATEGORY_ICONS: Record<SearchItem["category"], React.ReactNode> = {
  頁面: <FileText className="h-4 w-4 shrink-0 text-teal" aria-hidden="true" />,
  業師: <Users className="h-4 w-4 shrink-0 text-teal" aria-hidden="true" />,
  新創團隊: <Rocket className="h-4 w-4 shrink-0 text-teal" aria-hidden="true" />,
  常見問題: <HelpCircle className="h-4 w-4 shrink-0 text-teal" aria-hidden="true" />,
};

const CATEGORIES: SearchItem["category"][] = ["頁面", "業師", "新創團隊", "常見問題"];

/* ── hook: keyboard shortcut ─────────────────────────────────────────────── */

export function useSearchDialog() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return { open, setOpen };
}

/* ── SearchDialog ────────────────────────────────────────────────────────── */

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const results = searchItems(query);
  const hasResults = CATEGORIES.some((cat) => results[cat].length > 0);

  const handleSelect = useCallback(
    (href: string) => {
      router.push(href);
      onOpenChange(false);
      setQuery("");
    },
    [router, onOpenChange]
  );

  const handleClose = useCallback(() => {
    onOpenChange(false);
    setQuery("");
  }, [onOpenChange]);

  // Close on ESC is handled natively by cmdk; also handle overlay click
  if (!open) return null;

  return (
    /* Overlay */
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center bg-black/50 px-4 pt-[10vh] sm:pt-[15vh]"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="全站搜尋"
    >
      {/* Panel */}
      <div className="w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-white shadow-2xl">
        <Command
          className="flex flex-col"
          shouldFilter={false}
          onKeyDown={(e) => {
            if (e.key === "Escape") handleClose();
          }}
        >
          {/* Input row */}
          <div className="flex items-center gap-3 border-b border-border px-4 py-3">
            <Search className="h-4 w-4 shrink-0 text-charcoal/40" aria-hidden="true" />
            <CommandInput
              value={query}
              onValueChange={setQuery}
              placeholder="搜尋頁面、業師、新創團隊、常見問題…"
              className="flex-1 bg-transparent text-sm text-charcoal placeholder:text-charcoal/40 outline-none"
              autoFocus
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                aria-label="清除搜尋"
                className="rounded p-0.5 text-charcoal/40 hover:text-charcoal transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
            <kbd className="hidden sm:inline-flex items-center gap-1 rounded border border-border bg-slate-50 px-2 py-0.5 text-[11px] text-charcoal/50 font-medium">
              ESC
            </kbd>
          </div>

          {/* Results */}
          <CommandList className="max-h-[60vh] overflow-y-auto overscroll-contain py-2">
            {!query && (
              <div className="flex flex-col items-center gap-2 py-10 text-center text-sm text-charcoal/50">
                <Search className="h-8 w-8 text-charcoal/20" aria-hidden="true" />
                <p>搜尋頁面、業師、新創團隊</p>
                <p className="text-xs text-charcoal/30">
                  輸入關鍵字開始搜尋
                </p>
              </div>
            )}

            {query && !hasResults && (
              <CommandEmpty className="py-10 text-center text-sm text-charcoal/50">
                找不到「{query}」的相關結果
              </CommandEmpty>
            )}

            {query &&
              CATEGORIES.map((cat) => {
                const items = results[cat];
                if (!items.length) return null;
                return (
                  <CommandGroup
                    key={cat}
                    heading={cat}
                    className="[&_[cmdk-group-heading]]:px-4 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:text-charcoal/40 [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wide"
                  >
                    {items.map((item) => (
                      <CommandItem
                        key={`${item.category}-${item.href}-${item.title}`}
                        value={`${item.category}-${item.title}`}
                        onSelect={() => handleSelect(item.href)}
                        className="mx-2 flex cursor-pointer items-start gap-3 rounded-lg px-3 py-2.5 text-sm text-charcoal aria-selected:bg-teal-wash aria-selected:text-teal outline-none transition-colors"
                      >
                        <span className="mt-0.5">{CATEGORY_ICONS[item.category]}</span>
                        <span className="flex flex-col gap-0.5 min-w-0">
                          <span className="font-medium leading-snug truncate">
                            {item.title}
                          </span>
                          <span className="text-xs text-charcoal/50 line-clamp-1 leading-snug">
                            {item.description}
                          </span>
                        </span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                );
              })}
          </CommandList>

          {/* Footer hint */}
          <div className="border-t border-border px-4 py-2 flex items-center gap-4 text-[11px] text-charcoal/40">
            <span className="flex items-center gap-1">
              <kbd className="rounded border border-border bg-slate-50 px-1.5 py-0.5 font-mono">↑</kbd>
              <kbd className="rounded border border-border bg-slate-50 px-1.5 py-0.5 font-mono">↓</kbd>
              導航
            </span>
            <span className="flex items-center gap-1">
              <kbd className="rounded border border-border bg-slate-50 px-1.5 py-0.5 font-mono">↵</kbd>
              前往
            </span>
            <span className="ml-auto">
              共 {CATEGORIES.reduce((s, c) => s + results[c].length, 0)} 筆結果
            </span>
          </div>
        </Command>
      </div>
    </div>
  );
}

/* ── SearchButton (Navbar trigger) ──────────────────────────────────────── */

export function SearchButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="搜尋 (Cmd+K)"
      title="搜尋 (Cmd+K)"
      className="flex items-center gap-2 rounded-lg border border-border bg-slate-50 px-3 py-1.5 text-xs text-charcoal/50 hover:border-teal hover:text-teal transition-colors"
    >
      <Search className="h-3.5 w-3.5" aria-hidden="true" />
      <span className="hidden sm:inline">搜尋</span>
      <kbd className="hidden sm:inline-flex items-center gap-0.5 font-mono text-[10px]">
        <span>⌘</span>K
      </kbd>
    </button>
  );
}
