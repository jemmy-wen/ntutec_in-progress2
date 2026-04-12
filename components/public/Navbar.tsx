"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import SearchDialog, { useSearchDialog, SearchButton } from "@/components/search/SearchDialog";

/* ────────────────────────────── nav data ────────────────────────────── */

interface NavChild {
  label: string;
  href: string;
}
interface NavItem {
  label: string;
  href?: string;
  children?: NavChild[];
}

const NAV_ITEMS: NavItem[] = [
  {
    label: "計畫方案",
    children: [
      { label: "台大加速器", href: "/accelerator" },
      { label: "台大車庫", href: "/garage" },
      { label: "校友新創", href: "/alumni" },
    ],
  },
  {
    label: "企業合作",
    children: [
      { label: "合作總覽", href: "/corporate" },
      { label: "合作夥伴", href: "/corporate-partners" },
      { label: "聯合活動", href: "/co-events" },
      { label: "諮詢服務", href: "/consulting" },
    ],
  },
  {
    label: "天使俱樂部",
    children: [
      { label: "天使俱樂部總覽", href: "/angel" },
      { label: "申請入會", href: "/angel-apply" },
      { label: "新創投遞", href: "/pitch" },
    ],
  },
  {
    label: "關於我們",
    children: [
      { label: "關於 TEC", href: "/about" },
      { label: "團隊", href: "/team" },
      { label: "業師", href: "/mentors" },
      { label: "諮詢委員會", href: "/advisory-board" },
      { label: "加入我們", href: "/careers" },
    ],
  },
  {
    label: "最新動態",
    children: [
      { label: "消息", href: "/news" },
      { label: "活動", href: "/events" },
      { label: "Demo Day", href: "/demo-day" },
      { label: "部落格", href: "/blog" },
      { label: "TEC Talk Podcast", href: "/podcast" },
    ],
  },
  {
    label: "常見問題",
    href: "/faq",
  },
];

/* ────────────────────────── Desktop dropdown ────────────────────────── */

function DesktopDropdown({
  item,
  open,
  onEnter,
  onLeave,
  onToggle,
  onClose,
}: {
  item: NavItem;
  open: boolean;
  onEnter: () => void;
  onLeave: () => void;
  onToggle: () => void;
  onClose: () => void;
}) {
  const menuId = `menu-${item.label}`;

  // Simple link (no children) — render as direct Link
  if (!item.children && item.href) {
    return (
      <Link
        href={item.href}
        className="px-3 py-2 text-sm font-medium text-charcoal/80 hover:text-teal transition-colors"
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div className="relative" onMouseEnter={onEnter} onMouseLeave={onLeave}>
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={onToggle}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            e.preventDefault();
            onClose();
          }
          if (e.key === "ArrowDown") {
            e.preventDefault();
            if (!open) onToggle();
          }
        }}
        className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-charcoal/80 hover:text-teal transition-colors"
      >
        {item.label}
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence>
        {open && item.children && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute left-0 top-full pt-2 z-50"
          >
            <div
              id={menuId}
              role="menu"
              aria-label={item.label}
              className="min-w-[200px] rounded-xl border border-border bg-white p-2 shadow-lg"
            >
              {item.children.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  role="menuitem"
                  onClick={onClose}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") {
                      e.preventDefault();
                      onClose();
                    }
                  }}
                  className="block rounded-lg px-4 py-2.5 text-sm text-charcoal/80 hover:bg-teal-wash hover:text-teal focus:bg-teal-wash focus:text-teal focus:outline-none transition-colors"
                >
                  {child.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ───────────────────── Mobile accordion item ────────────────────────── */

function MobileAccordion({
  item,
  onNavigate,
}: {
  item: NavItem;
  onNavigate: () => void;
}) {
  const [open, setOpen] = useState(false);

  if (!item.children) {
    return (
      <Link
        href={item.href ?? "/"}
        onClick={onNavigate}
        className="block px-4 py-3 text-lg font-semibold text-charcoal"
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div className="border-b border-border/60">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="flex w-full items-center justify-between px-4 py-3 text-lg font-semibold text-charcoal"
      >
        {item.label}
        <ChevronRight
          aria-hidden="true"
          className={`h-5 w-5 transition-transform ${open ? "rotate-90" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pb-2 pl-4">
              {item.children.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  onClick={onNavigate}
                  className="block px-4 py-2.5 text-base text-charcoal/70 hover:text-teal transition-colors"
                >
                  {child.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ──────────────────────────── Navbar root ───────────────────────────── */

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { open: searchOpen, setOpen: setSearchOpen } = useSearchDialog();

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    const main = document.getElementById("main-content");
    if (main) {
      if (mobileOpen) {
        main.setAttribute("aria-hidden", "true");
      } else {
        main.removeAttribute("aria-hidden");
      }
    }
    return () => {
      document.body.style.overflow = "";
      const mainEl = document.getElementById("main-content");
      if (mainEl) mainEl.removeAttribute("aria-hidden");
    };
  }, [mobileOpen]);

  // Close dropdown on outside click (for click-based a11y support)
  useEffect(() => {
    if (!activeDropdown) return;
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-navbar-root]")) {
        setActiveDropdown(null);
      }
    };
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveDropdown(null);
    };
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onEscape);
    };
  }, [activeDropdown]);

  const handleDropdownEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(label);
  };

  const handleDropdownLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveDropdown(null), 150);
  };

  const handleDropdownToggle = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown((prev) => (prev === label ? null : label));
  };

  const handleDropdownClose = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(null);
  };

  return (
    <header
      data-navbar-root
      className="sticky top-0 z-50 w-full border-b border-border/40 bg-white/80 backdrop-blur-lg"
    >
      <div className="container flex h-16 items-center justify-between lg:h-[72px]">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/logo-tec-icon.png"
            alt="NTUTEC"
            width={36}
            height={36}
            priority
            className="rounded-lg"
          />
          <span className="text-lg font-bold tracking-tight text-charcoal">
            NTUTEC
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <DesktopDropdown
              key={item.label}
              item={item}
              open={activeDropdown === item.label}
              onEnter={() => handleDropdownEnter(item.label)}
              onLeave={handleDropdownLeave}
              onToggle={() => handleDropdownToggle(item.label)}
              onClose={handleDropdownClose}
            />
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <SearchButton onClick={() => setSearchOpen(true)} />

          <button
            type="button"
            aria-label="English site (coming soon)"
            disabled
            title="English site coming soon"
            className="hidden lg:inline-flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-charcoal/40 cursor-not-allowed"
          >
            EN
          </button>

          <Link
            href="/pitch"
            className="hidden lg:inline-flex btn-pill-outline text-sm"
          >
            新創投遞
          </Link>
          <Link
            href="/angel"
            className="hidden lg:inline-flex btn-pill-primary text-sm"
          >
            加入天使會
          </Link>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-charcoal"
            aria-label={mobileOpen ? "關閉選單" : "開啟選單"}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-16 z-40 bg-white overflow-y-auto lg:hidden"
          >
            <nav className="container py-6">
              {NAV_ITEMS.map((item) => (
                <MobileAccordion
                  key={item.label}
                  item={item}
                  onNavigate={() => setMobileOpen(false)}
                />
              ))}

              <div className="mt-8 flex flex-col gap-3 px-4">
                <Link
                  href="/pitch"
                  onClick={() => setMobileOpen(false)}
                  className="btn-pill-outline text-center"
                >
                  新創投遞
                </Link>
                <Link
                  href="/angel"
                  onClick={() => setMobileOpen(false)}
                  className="btn-pill-primary text-center"
                >
                  加入天使會
                </Link>
                <Link
                  href="/apply"
                  onClick={() => setMobileOpen(false)}
                  className="text-center text-sm text-slate-muted hover:text-teal py-2"
                >
                  預約 2027 申請
                </Link>
                <button className="btn-pill-outline text-center">EN</button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Site-wide search dialog — rendered inside Navbar so it shares search state */}
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </header>
  );
}
