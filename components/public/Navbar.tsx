"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import SearchDialog, { useSearchDialog, SearchButton } from "@/components/search/SearchDialog";
import NavbarAuthButton, { MobileNavbarAuthButton } from "@/components/public/NavbarAuthButton";
import { usePathname } from "next/navigation";

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

interface FeaturedCard {
  title: string;
  desc: string;
  href: string;
  photo: string;
  photoAlt: string;
}

interface NavChild {
  label: string;
  href: string;
}

interface NavItem {
  label: string;
  href?: string;
  children?: NavChild[];
  featured?: FeaturedCard[];
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
    featured: [
      {
        title: "2026 開幕式紀實",
        desc: "80 位創業者與業師齊聚台大，正式展開十個月的加速旅程。",
        href: "/blog/2026-accelerator-opening",
        photo: "/images/events/opening-2026-biggroup.jpg",
        photoAlt: "2026 輔導計畫開幕式大合照",
      },
      {
        title: "Demo Day 2025 回顧",
        desc: "74 位投資人到場，18 組新創完成 Pitch，媒合率創歷年新高。",
        href: "/blog/demo-day-2025-recap",
        photo: "/images/events/opening-2026-pitching.jpg",
        photoAlt: "新創上台 Pitch 現場",
      },
    ],
  },
  {
    label: "企業合作",
    children: [
      { label: "合作總覽", href: "/corporate" },
      { label: "聯合活動", href: "/co-events" },
      { label: "諮詢服務", href: "/consulting" },
    ],
    featured: [
      {
        title: "過往企業合作案例",
        desc: "AI 軟體、生技醫療、硬科技、創新商模——結合台大跨院系研究能量與業界合作網絡，陪伴新創從概念走向市場。",
        href: "/corporate",
        photo: "/images/events/opening-2026-networking.jpg",
        photoAlt: "企業合作交流現場",
      },
      {
        title: "過往企業合作案例",
        desc: "AI 軟體、生技醫療、硬科技、創新商模——結合台大跨院系研究能量與業界合作網絡，陪伴新創從概念走向市場。",
        href: "/corporate",
        photo: "/images/photos/ntu-about-cover.jpg",
        photoAlt: "台大校園",
      },
    ],
  },
  {
    label: "台大天使會",
    children: [
      { label: "台大天使會總覽", href: "/angel" },
      { label: "申請入會", href: "/angel-apply" },
      { label: "新創投遞", href: "/pitch" },
    ],
    featured: [
      {
        title: "台大天使會 2026",
        desc: "新增 12 位天使成員，累計投資超過 NT$1.2 億，早期接觸台大頂尖硬科技新創。",
        href: "/blog/ntu-angel-network-2026",
        photo: "/images/events/opening-2026-networking.jpg",
        photoAlt: "業師與創業者交流 Networking",
      },
      {
        title: "Demo Day 投資人現場",
        desc: "每年 Demo Day 優先開放天使會成員取得 Preview 席次，搶先接觸最具潛力的新創。",
        href: "/angel",
        photo: "/images/events/opening-2026-pitching.jpg",
        photoAlt: "Demo Day 投資人現場",
      },
    ],
  },
  {
    label: "關於我們",
    children: [
      { label: "關於 TEC", href: "/about" },
      { label: "團隊", href: "/teams" },
      { label: "業師", href: "/mentors" },
      { label: "加入我們", href: "/careers" },
    ],
    featured: [
      {
        title: "台大創新生態系",
        desc: "13 年來累計輔導逾 600 支新創，連結台大、連結產業、連結資本。",
        href: "/about",
        photo: "/images/photos/ntu-about-cover.jpg",
        photoAlt: "台大校園椰林大道",
      },
      {
        title: "加入我們",
        desc: "歡迎對創業生態系充滿熱情的你，成為台大創創中心的一份子。",
        href: "/careers",
        photo: "/images/events/opening-2026-biggroup.jpg",
        photoAlt: "台大創創中心團隊",
      },
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
    featured: [
      {
        title: "2026 開幕式紀實",
        desc: "逾 80 位創業者與 40 位業師在台大共同揭開 2026 輔導計畫序幕。",
        href: "/blog/2026-accelerator-opening",
        photo: "/images/events/opening-2026-biggroup.jpg",
        photoAlt: "2026 輔導計畫開幕式",
      },
      {
        title: "Demo Day 2025 回顧",
        desc: "74 位投資人見證 18 組新創 Pitch，媒合率創歷年新高。",
        href: "/blog/demo-day-2025-recap",
        photo: "/images/events/opening-2026-pitching.jpg",
        photoAlt: "Demo Day 2025 Pitch 現場",
      },
    ],
  },
];

/* ────────────────────────── Desktop Mega Menu ────────────────────────── */

function MegaMenu({
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
        onClick={onToggle}
        onKeyDown={(e) => {
          if (e.key === "Escape") { e.preventDefault(); onClose(); }
          if (e.key === "ArrowDown") { e.preventDefault(); if (!open) onToggle(); }
        }}
        className={`flex items-center gap-0.5 whitespace-nowrap px-2.5 py-2 text-sm font-medium transition-colors ${
          open ? "text-teal" : "text-charcoal/80 hover:text-teal"
        }`}
      >
        {item.label}
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>
    </div>
  );
}

/* Full-width mega panel — rendered once in the header, positioned absolutely */
function MegaPanel({
  item,
  open,
  onClose,
  onEnter,
  onLeave,
  scrolled,
}: {
  item: NavItem | null;
  open: boolean;
  onClose: () => void;
  onEnter: () => void;
  onLeave: () => void;
  scrolled: boolean;
}) {
  if (!item || !item.children) return null;

  return (
    <div
      className={`absolute left-0 right-0 top-full z-40 transition-all duration-200 ${
        open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-1 pointer-events-none"
      }`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {/* Match pill margins when scrolled so panel aligns under the floating bar */}
      <div className={`pt-2 pb-4 transition-all duration-300 ${scrolled ? "px-4 xl:px-8" : "px-6"}`}>
        <div className="mx-auto max-w-[780px]">
          <div className="rounded-2xl border border-border/60 bg-white shadow-xl shadow-black/5 overflow-hidden">
            <div className="flex gap-0 p-6">

              {/* Left: section label + links */}
              <div className="w-44 shrink-0">
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  {item.label}
                </p>
                <div className="flex flex-col gap-0.5">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={onClose}
                      className="rounded-lg px-3 py-2 text-sm font-medium text-charcoal/80 hover:bg-[#F6F5F1] hover:text-teal transition-colors"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="mx-5 w-px self-stretch bg-border/50 shrink-0" />

              {/* Right: featured cards */}
              {item.featured && (
                <div className="flex flex-1 gap-3">
                  {item.featured.map((card, idx) => (
                    <Link
                      key={idx}
                      href={card.href}
                      onClick={onClose}
                      className="group flex-1 overflow-hidden rounded-xl bg-[#F6F5F1] hover:bg-[#EEEDEA] transition-colors"
                    >
                      <div className="relative h-32 overflow-hidden">
                        <Image
                          src={card.photo}
                          alt={card.photoAlt}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="240px"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-3">
                        <p className="font-semibold text-xs text-[#181614] group-hover:text-teal transition-colors line-clamp-1">
                          {card.title}
                        </p>
                        <p className="mt-1 text-[11px] leading-relaxed text-slate-500 line-clamp-2">
                          {card.desc}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────── Mobile accordion item ────────────────────────── */

function MobileAccordion({ item, onNavigate }: { item: NavItem; onNavigate: () => void }) {
  const [open, setOpen] = useState(false);

  if (!item.children) {
    return (
      <Link href={item.href ?? "/"} onClick={onNavigate} className="block px-4 py-3 text-lg font-semibold text-charcoal">
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
        <ChevronRight aria-hidden="true" className={`h-5 w-5 transition-transform ${open ? "rotate-90" : ""}`} />
      </button>
      <div
        className={`grid overflow-hidden transition-all duration-200 ease-out ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
        aria-hidden={!open}
      >
        <div className="min-h-0">
          <div className="pb-2 pl-4">
            {item.children.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                onClick={onNavigate}
                tabIndex={open ? 0 : -1}
                className="block px-4 py-2.5 text-base text-charcoal/70 hover:text-teal transition-colors"
              >
                {child.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────── Navbar root ───────────────────────────── */

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [applyOpen, setApplyOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { open: searchOpen, setOpen: setSearchOpen } = useSearchDialog();
  const langSwitch = useLanguageSwitcher();

  const activeItem = NAV_ITEMS.find((i) => i.label === activeMenu) ?? null;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1280) setMobileOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    const main = document.getElementById("main-content");
    if (main) mobileOpen ? main.setAttribute("aria-hidden", "true") : main.removeAttribute("aria-hidden");
    return () => {
      document.body.style.overflow = "";
      document.getElementById("main-content")?.removeAttribute("aria-hidden");
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!activeMenu) return;
    const onEscape = (e: KeyboardEvent) => { if (e.key === "Escape") setActiveMenu(null); };
    document.addEventListener("keydown", onEscape);
    return () => document.removeEventListener("keydown", onEscape);
  }, [activeMenu]);

  const enter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(label);
  };
  const leave = () => {
    timeoutRef.current = setTimeout(() => setActiveMenu(null), 120);
  };
  const toggle = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu((prev) => (prev === label ? null : label));
  };
  const close = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(null);
  };

  return (
    <header
      data-navbar-root
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-transparent border-transparent py-2"
          : "bg-white/90 backdrop-blur-lg border-b border-border/40"
      }`}
    >
      <div
        className={`flex h-16 items-center justify-between transition-all duration-300 xl:h-20 ${
          scrolled
            ? "mx-4 xl:mx-8 rounded-2xl bg-white/95 backdrop-blur-xl shadow-lg shadow-black/8 border border-border/30 px-4 xl:px-6"
            : "container xl:max-w-[1400px]"
        }`}
      >
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
            <MegaMenu
              key={item.label}
              item={item}
              open={activeMenu === item.label}
              onEnter={() => enter(item.label)}
              onLeave={leave}
              onToggle={() => toggle(item.label)}
              onClose={close}
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

          {/* Apply mega CTA */}
          <div
            className="relative hidden xl:block"
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

            {/* Apply mega panel — right-aligned, with gap matching other menus */}
            <div
              className={`absolute right-0 top-full z-50 pt-2 transition-all duration-200 ${
                applyOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-1 pointer-events-none"
              }`}
            >
              <div className="w-[560px] rounded-2xl border border-border/60 bg-white shadow-xl shadow-black/5 overflow-hidden">
                <div className="flex gap-0 p-6">

                  {/* Left: CTA options */}
                  <div className="flex-1">
                    <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                      立即申請
                    </p>
                    <div className="flex flex-col gap-0.5">
                      {[
                        { label: "預約 2027 輔導計畫", href: "/apply", desc: "台大加速器・台大車庫" },
                        { label: "新創投遞 Pitch", href: "/pitch", desc: "提交你的新創案件給天使會" },
                        { label: "企業合作洽談", href: "/corporate#contact", desc: "啟動外部創新合作" },
                        { label: "加入台大天使會", href: "/angel-apply", desc: "成為早期天使投資人" },
                      ].map((opt) => (
                        <Link
                          key={opt.href}
                          href={opt.href}
                          onClick={() => setApplyOpen(false)}
                          className="group rounded-lg px-3 py-2.5 hover:bg-[#F6F5F1] transition-colors"
                        >
                          <p className="text-sm font-medium text-charcoal group-hover:text-teal transition-colors">{opt.label}</p>
                          <p className="text-xs text-slate-400">{opt.desc}</p>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="mx-5 w-px self-stretch bg-border/50 shrink-0" />

                  {/* Right: single featured card */}
                  <div className="w-40 shrink-0">
                    <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                      最新計畫
                    </p>
                    <Link
                      href="/blog/2026-accelerator-opening"
                      onClick={() => setApplyOpen(false)}
                      className="group block overflow-hidden rounded-xl bg-[#F6F5F1] hover:bg-[#EEEDEA] transition-colors"
                    >
                      <div className="relative h-24 overflow-hidden">
                        <Image
                          src="/images/events/opening-2026-biggroup.jpg"
                          alt="2026 輔導計畫開幕式"
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="160px"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-2.5">
                        <p className="text-xs font-semibold text-[#181614] group-hover:text-teal transition-colors line-clamp-2">
                          2026 輔導計畫開幕式紀實
                        </p>
                      </div>
                    </Link>
                  </div>

                </div>
              </div>
            </div>
          </div>

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

      {/* Mega panel — full-width, below the nav bar */}
      <MegaPanel
        item={activeItem}
        open={!!activeMenu && !!activeItem?.children}
        onClose={close}
        onEnter={() => { if (timeoutRef.current) clearTimeout(timeoutRef.current); }}
        onLeave={leave}
        scrolled={scrolled}
      />

      {/* Mobile full-screen menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 flex flex-col bg-white xl:hidden animate-in fade-in-0 duration-200">

          {/* Menu header — mirrors the real header */}
          <div className="flex h-16 shrink-0 items-center justify-between px-4 border-b border-border/40">
            <Link href="/" onClick={() => setMobileOpen(false)}>
              <Image
                src="/images/brand/ntutec-logo-horizontal-zh.png"
                alt="臺大創創中心 NTUTEC"
                width={326}
                height={140}
                className="h-12 w-auto"
              />
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 text-charcoal"
              aria-label="關閉選單"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Scrollable body */}
          <div className="flex-1 overflow-y-auto">

            {/* Primary nav — accordion */}
            <nav className="px-2 pt-4">
              {NAV_ITEMS.map((item) => (
                <MobileAccordion key={item.label} item={item} onNavigate={() => setMobileOpen(false)} />
              ))}
            </nav>

            {/* Divider */}
            <div className="mx-4 my-6 h-px bg-border/50" />

            {/* Primary CTAs */}
            <div className="px-4 pb-2">
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">立即申請</p>
              <div className="flex flex-col gap-2">
                <Link
                  href="/apply"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between rounded-xl bg-[#00aa95] px-4 py-3 text-sm font-semibold text-white"
                >
                  <span>預約 2027 輔導計畫</span>
                  <span className="text-white/70 text-xs">加速器・車庫</span>
                </Link>
                {[
                  { label: "新創投遞 Pitch", desc: "提交新創案件", href: "/pitch" },
                  { label: "企業合作洽談", desc: "啟動外部創新", href: "/corporate#contact" },
                  { label: "加入台大天使會", desc: "成為天使投資人", href: "/angel-apply" },
                ].map((opt) => (
                  <Link
                    key={opt.href}
                    href={opt.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between rounded-xl border border-border/60 px-4 py-3 text-sm font-medium text-charcoal hover:bg-[#F6F5F1] transition-colors"
                  >
                    <span>{opt.label}</span>
                    <span className="text-slate-400 text-xs">{opt.desc}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Bottom row — lang + login */}
            <div className="flex items-center gap-3 px-4 py-6">
              <Link
                href={langSwitch.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-charcoal"
              >
                {langSwitch.label}
              </Link>
              <div className="flex-1">
                <MobileNavbarAuthButton onNavigate={() => setMobileOpen(false)} />
              </div>
            </div>

          </div>
        </div>
      )}

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </header>
  );
}
