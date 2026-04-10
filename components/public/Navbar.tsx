"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";

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
      { label: "計畫總覽", href: "/programs" },
      { label: "加速器", href: "/accelerator" },
      { label: "車庫孵化器", href: "/garage" },
      { label: "常見問題", href: "/faq" },
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
    href: "/angel",
  },
  {
    label: "關於我們",
    children: [
      { label: "關於 TEC", href: "/about" },
      { label: "團隊", href: "/team" },
      { label: "業師", href: "/mentors" },
      { label: "諮詢委員會", href: "/advisory-board" },
    ],
  },
  {
    label: "最新動態",
    children: [
      { label: "消息", href: "/news" },
      { label: "活動", href: "/events" },
      { label: "部落格", href: "/blog" },
    ],
  },
];

/* ────────────────────────── Desktop dropdown ────────────────────────── */

function DesktopDropdown({
  item,
  open,
  onEnter,
  onLeave,
}: {
  item: NavItem;
  open: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
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
        className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-charcoal/80 hover:text-teal transition-colors"
        aria-expanded={open}
      >
        {item.label}
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
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
            <div className="min-w-[200px] rounded-xl border border-border bg-white p-2 shadow-lg">
              {item.children.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  className="block rounded-lg px-4 py-2.5 text-sm text-charcoal/80 hover:bg-teal-wash hover:text-teal transition-colors"
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
        className="flex w-full items-center justify-between px-4 py-3 text-lg font-semibold text-charcoal"
      >
        {item.label}
        <ChevronRight
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

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleDropdownEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(label);
  };

  const handleDropdownLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveDropdown(null), 150);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-white/80 backdrop-blur-lg">
      <div className="container flex h-16 items-center justify-between lg:h-[72px]">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal text-white font-bold text-sm">
            TEC
          </div>
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
            />
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button className="hidden lg:inline-flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-charcoal/60 hover:text-charcoal hover:border-charcoal/30 transition-colors">
            EN
          </button>

          <Link
            href="/apply"
            className="hidden lg:inline-flex btn-pill-primary text-sm"
          >
            立即申請
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
                  href="/apply"
                  onClick={() => setMobileOpen(false)}
                  className="btn-pill-primary text-center"
                >
                  立即申請
                </Link>
                <button className="btn-pill-outline text-center">EN</button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
