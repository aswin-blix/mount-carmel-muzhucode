"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { school } from "@/content/school";
import { navigation, type NavGroup } from "@/content/navigation";
import { Mark } from "@/components/art/Mark";
import { PhoneIcon } from "@/components/icons";
import { lockScroll, unlockScroll } from "@/lib/scroll-lock";

function isInGroup(pathname: string, group: NavGroup) {
  const hrefs = [group.href, ...group.children.map((c) => c.href)];
  return hrefs.some((h) => (h === "/" ? pathname === "/" : pathname === h || pathname.startsWith(`${h}/`)));
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 12 12"
      aria-hidden="true"
      className={`size-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    >
      <path d="M2 4.5 6 8.5 10 4.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menu, setMenu] = useState<string | null>(null);
  const [mobileGroup, setMobileGroup] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus whenever the route changes (state adjusted during render).
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setMobileOpen(false);
    setMenu(null);
  }

  // Desktop dropdown: Escape closes and returns focus; clicking elsewhere closes.
  useEffect(() => {
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      navRef.current?.querySelector<HTMLButtonElement>(`[data-menu-button="${menu}"]`)?.focus();
      setMenu(null);
    };
    const onPointer = (e: PointerEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setMenu(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [menu]);

  // Mobile panel: Escape closes and returns focus to the toggle; the page behind
  // is locked (no scroll) and inert (not reachable with Tab) while it is open.
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setMobileOpen(false);
      toggleRef.current?.focus();
    };
    const behind = [...document.querySelectorAll<HTMLElement>("main, footer")];
    document.addEventListener("keydown", onKey);
    behind.forEach((el) => (el.inert = true));
    lockScroll();
    return () => {
      document.removeEventListener("keydown", onKey);
      behind.forEach((el) => (el.inert = false));
      unlockScroll();
    };
  }, [mobileOpen]);

  // Links to the page you are already on do not change the pathname, so close explicitly.
  const closeMenus = () => {
    setMenu(null);
    setMobileOpen(false);
  };

  const openOnHover = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMenu(label);
  };
  const closeOnLeave = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMenu(null), 160);
  };

  const solid = scrolled || mobileOpen || menu !== null;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300 ${
          solid ? "bg-mist/95 shadow-[0_1px_0_rgba(18,59,44,0.12)] backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-10">
          <Link href="/" onClick={closeMenus} className="flex items-center gap-3" aria-label={`${school.shortName} ${school.place}, home`}>
            <Mark className="size-10 shrink-0" />
            <span className="leading-tight">
              <span className="block font-serif text-[1.2rem]">{school.shortName}</span>
              <span className="block text-[0.8rem] text-ink-muted">
                <span className="hidden sm:inline">Matric Hr. Sec. School, </span>
                {school.place}
              </span>
            </span>
          </Link>

          <nav ref={navRef} aria-label="Main" className="hidden xl:block">
            <ul className="flex items-center gap-0.5">
              {navigation.map((group) => {
                const active = isInGroup(pathname, group);
                const linkClass = `relative flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[0.97rem] font-medium transition-colors hover:bg-forest/5 ${
                  active ? "text-forest" : "text-ink-muted"
                }`;
                const indicator = active && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-3.5 -bottom-0.5 h-[3px] rounded-full bg-gold"
                    transition={{ type: "spring", stiffness: 400, damping: 34 }}
                  />
                );

                if (group.children.length === 0) {
                  return (
                    <li key={group.label}>
                      <Link
                        href={group.href}
                        onClick={closeMenus}
                        aria-current={pathname === group.href ? "page" : undefined}
                        className={linkClass}
                      >
                        {group.label}
                        {indicator}
                      </Link>
                    </li>
                  );
                }

                const open = menu === group.label;
                const panelId = `menu-${group.label.toLowerCase().replace(/\W+/g, "-")}`;
                return (
                  <li
                    key={group.label}
                    className="relative"
                    onMouseEnter={() => openOnHover(group.label)}
                    onMouseLeave={closeOnLeave}
                    onBlur={(e) => {
                      if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
                        setMenu((m) => (m === group.label ? null : m));
                      }
                    }}
                  >
                    <button
                      type="button"
                      data-menu-button={group.label}
                      aria-expanded={open}
                      aria-controls={panelId}
                      // Mouse clicks only open (hover may have opened it a moment ago); keyboard
                      // activation (detail === 0) toggles. Leaving, outside clicks and Escape close.
                      onClick={(e) => setMenu(open && e.detail === 0 ? null : group.label)}
                      className={linkClass}
                    >
                      {group.label}
                      <Chevron open={open} />
                      {indicator}
                    </button>
                    <AnimatePresence>
                      {open && (
                        <motion.div
                          id={panelId}
                          initial={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
                          transition={{ duration: 0.18, ease: "easeOut" }}
                          className="absolute left-1/2 top-full w-[22rem] -translate-x-1/2 pt-3"
                        >
                          <ul className="rounded-[22px] bg-paper p-2 shadow-[0_18px_50px_-12px_rgba(18,59,44,0.35)] ring-1 ring-forest/10">
                            {group.children.map((c) => (
                              <li key={c.href}>
                                <Link
                                  href={c.href}
                                  onClick={closeMenus}
                                  aria-current={pathname === c.href ? "page" : undefined}
                                  className="block rounded-2xl px-4 py-2.5 transition-colors hover:bg-mist aria-[current=page]:bg-mist"
                                >
                                  <span className="block font-medium text-forest">{c.label}</span>
                                  {c.description && (
                                    <span className="block text-sm text-ink-muted">{c.description}</span>
                                  )}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a href={school.phoneHref} className="btn btn-forest hidden sm:inline-flex">
              <PhoneIcon className="size-4" />
              {school.phone}
            </a>
            <button
              ref={toggleRef}
              type="button"
              className="grid size-11 place-items-center rounded-full bg-forest text-paper xl:hidden"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen((o) => !o)}
            >
              <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
                <motion.path
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  animate={{ d: mobileOpen ? "M6 6 L18 18" : "M4 8 L20 8" }}
                />
                <motion.path
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  animate={{ d: mobileOpen ? "M6 18 L18 6" : "M4 16 L20 16" }}
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Outside <header>: its backdrop-filter would trap position:fixed children. */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            id="mobile-menu"
            aria-label="Main"
            data-lenis-prevent
            className="fixed inset-x-0 bottom-0 top-[4.5rem] z-40 overflow-y-auto bg-mist px-4 pb-10 pt-4 sm:px-6 xl:hidden"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <ul>
              <li className="border-b border-forest/10">
                <Link
                  href="/"
                  onClick={closeMenus}
                  aria-current={pathname === "/" ? "page" : undefined}
                  className="block py-4 font-serif text-[1.75rem] aria-[current=page]:text-leaf"
                >
                  Home
                </Link>
              </li>
              {navigation.map((group) => {
                if (group.children.length === 0) {
                  return (
                    <li key={group.label} className="border-b border-forest/10">
                      <Link
                        href={group.href}
                        onClick={closeMenus}
                        aria-current={pathname === group.href ? "page" : undefined}
                        className="block py-4 font-serif text-[1.75rem] aria-[current=page]:text-leaf"
                      >
                        {group.label}
                      </Link>
                    </li>
                  );
                }
                const expanded = mobileGroup === group.label;
                const id = `mobile-${group.label.toLowerCase().replace(/\W+/g, "-")}`;
                return (
                  <li key={group.label} className="border-b border-forest/10">
                    <button
                      type="button"
                      aria-expanded={expanded}
                      aria-controls={id}
                      onClick={() => setMobileGroup(expanded ? null : group.label)}
                      className={`flex w-full items-center justify-between py-4 text-left font-serif text-[1.75rem] ${
                        isInGroup(pathname, group) ? "text-leaf" : ""
                      }`}
                    >
                      {group.label}
                      <Chevron open={expanded} />
                    </button>
                    <AnimatePresence initial={false}>
                      {expanded && (
                        <motion.ul
                          id={id}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: reduce ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          {group.children.map((c) => (
                            <li key={c.href}>
                              <Link
                                href={c.href}
                                onClick={closeMenus}
                                aria-current={pathname === c.href ? "page" : undefined}
                                className="block rounded-xl py-2.5 pl-4 text-lg text-ink-muted aria-[current=page]:font-semibold aria-[current=page]:text-forest"
                              >
                                {c.label}
                              </Link>
                            </li>
                          ))}
                          <li aria-hidden="true" className="h-3" />
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
            <a href={school.phoneHref} className="btn btn-gold mt-8">
              <PhoneIcon className="size-4" />
              Call {school.phone}
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
