"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import SearchDialog, { useSearchDialog, SearchButton } from "@/components/search/SearchDialog";
import NavbarAuthButton, { MobileNavbarAuthButton } from "@/components/public/NavbarAuthButton";
import { usePathname } from "next/navigation";

/** Map English /en/* paths back to Chinese equivalents and vice versa. */
function useLanguageSwitcher() {
  const pathname = usePathname();
  if (pathname.startsWith("/en")) {
    const zhPath = pathname.replace(/^\/en/, "") || "/";
    return { href: zhPath, label: "中文" };
  }
  const enPages = ["/", "/about", "/accelerator", "/angel", "/contact"];
  const enPath = enPages.includes(pathname) ? `/en${pathname === "/" ? "" : pathname}` : "/en";
  return { href: enPath, label: "EN" };
}

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
    label: "輔導計畫",
    children: [
      { label: "台大加速器", href: "/accelerator" },
      { label: "台大車庫", href: "/garage" },
      { label: "代表校友", href: "/alumni" },
      { label: "歷年校友", href: "/alumni/historical" },
    ],
  },
  {
    label: "企業合作",
    children: [
      { label: "合作總覽", href: "/corporate" },
      // { label: "合作夥伴", href: "/corporate-partners" }, // 暫時隱藏 — 待逐家確認 logo 揭露意願
      { label: "聯合活動", href: "/co-events" },
      { label: "諮詢服務", href: "/consulting" },
    ],
  },
  {
    label: "台大天使會",
    children: [
      { label: "台大天使會總覽", href: "/angel" },
      { label: "申請入會", href: "/angel-apply" },
      { label: "新創投遞", href: "/pitch" },
    ],
  },
  {
    label: "關於我們",
    children: [
      { label: "關於 TEC", href: "/about" },
      { label: "團隊", href: "/teams" },
      { label: "業師", href: "/mentors" },
      // { label: "諮詢委員會", href: "/advisory-board" }, // 暫時隱藏
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
        className="whitespace-nowrap px-2.5 py-2 text-sm font-medium text-charcoal/80 hover:text-teal transition-colors"
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
        className="flex items-center gap-0.5 whitespace-nowrap px-2.5 py-2 text-sm font-medium text-charcoal/80 hover:text-teal transition-colors"
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
  const [applyOpen, setApplyOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { open: searchOpen, setOpen: setSearchOpen } = useSearchDialog();
  const langSwitch = useLanguageSwitcher();

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
      <div className="container flex h-20 items-center justify-between xl:h-24 xl:max-w-[1400px]">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/images/brand/ntutec-logo-horizontal-zh.png"
            alt="臺大創創中心 NTUTEC"
            width={326}
            height={140}
            priority
            className="h-16 w-auto"
          />
        </Link>

        <nav className="hidden xl:flex items-center gap-0.5">
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

        <div className="flex items-center gap-2">
          <SearchButton onClick={() => setSearchOpen(true)} />

          <Link
            href={langSwitch.href}
            className="hidden xl:inline-flex items-center rounded-full border border-border px-2.5 py-1 text-xs font-semibold text-charcoal hover:border-teal hover:text-teal transition-colors"
            aria-label={langSwitch.label === "EN" ? "Switch to English" : "切換至中文"}
          >
            {langSwitch.label}
          </Link>

          {/* Apply dropdown CTA */}
          <div className="relative hidden xl:block"
            onMouseEnter={() => setApplyOpen(true)}
            onMouseLeave={() => setApplyOpen(false)}
          >
            <button
              onClick={() => setApplyOpen(!applyOpen)}
              className="whitespace-nowrap btn-pill-primary text-xs px-3 py-1.5 flex items-center gap-1"
            >
              立即申請
              <ChevronDown className={`h-3 w-3 transition-transform ${applyOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {applyOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full pt-2 z-50"
                >
                  <div className="min-w-[200px] rounded-xl border border-border bg-white p-2 shadow-lg">
                    {[
                      { label: "新創投遞 Pitch", href: "/pitch", desc: "提交你的新創案件" },
                      { label: "企業合作洽談", href: "/corporate#contact", desc: "啟動外部創新" },
                      { label: "加入台大天使會", href: "/angel-apply", desc: "成為天使投資人" },
                      { label: "預約 2027 輔導計畫", href: "/apply", desc: "加速器・車庫" },
                    ].map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setApplyOpen(false)}
                        className="flex flex-col rounded-lg px-3 py-2.5 transition-colors hover:bg-stone"
                      >
                        <span className="text-sm font-medium text-charcoal">{item.label}</span>
                        <span className="text-xs text-slate-muted">{item.desc}</span>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Auth: login button or user avatar dropdown */}
          <NavbarAuthButton />

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="xl:hidden p-2 text-charcoal"
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
            className="fixed inset-0 top-20 z-40 bg-white overflow-y-auto xl:hidden"
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
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-muted mb-1">立即申請</p>
                {[
                  { label: "新創投遞 Pitch", href: "/pitch" },
                  { label: "企業合作洽談", href: "/corporate#contact" },
                  { label: "加入台大天使會", href: "/angel-apply" },
                  { label: "預約 2027 輔導計畫", href: "/apply" },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="btn-pill-outline text-center text-sm"
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  href={langSwitch.href}
                  onClick={() => setMobileOpen(false)}
                  className="btn-pill-outline text-center"
                >
                  {langSwitch.label}
                </Link>

                {/* Mobile auth section */}
                <div className="border-t border-border/60 pt-3">
                  <MobileNavbarAuthButton onNavigate={() => setMobileOpen(false)} />
                </div>
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
