'use client';
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
] as const;

const normalizePath = (path: string) => {
  if (path === "/") {
    return "/";
  }

  return path.replace(/\/+$/, "");
};

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname() ?? "/";
  const normalizedPath = normalizePath(pathname);

  const toggleMenu = () => setIsMenuOpen((open) => !open);
  const closeMenu = () => setIsMenuOpen(false);

  const isLinkActive = (href: string) => {
    const normalizedHref = normalizePath(href);

    if (normalizedHref === "/") {
      return normalizedPath === "/";
    }

    return (
      normalizedPath === normalizedHref ||
      normalizedPath.startsWith(`${normalizedHref}/`)
    );
  };

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(248, 250, 252, 0.95)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(148, 163, 184, 0.15)",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1rem 1.25rem",
        }}
      >
        <Link
          href="/"
          onClick={closeMenu}
          style={{ display: "flex", alignItems: "center" }}
          aria-label="St. John’s Auto Repair home"
        >
          <img
            src="/images/saint_johns_logo_nav.png"
            alt="St. John’s Auto Repair"
            style={{ height: "4.5rem", width: "auto" }}
          />
        </Link>

        <div
          className="nav--desktop"
          style={{ display: "none", alignItems: "center", gap: "1.5rem" }}
        >
          <nav
            style={{ display: "none", gap: "1.5rem" }}
            className="nav--desktop"
            aria-label="Primary"
          >
            {navLinks.map((link) => {
              const active = isLinkActive(link.href);
              const className = [
                "nav-link",
                active ? "nav-link--active" : undefined,
              ]
                .filter(Boolean)
                .join(" ");

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className={className}
                  aria-current={active ? "page" : undefined}
                  style={{
                    fontWeight: 600,
                    color: "var(--muted)",
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <Link
            href="/about"
            className="button nav--desktop"
            style={{ display: "none" }}
          >
            Request a Quote
          </Link>
        </div>

        <button
          type="button"
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          className="header__menu-button"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          style={{
            background: "white",
            border: "1px solid rgba(148, 163, 184, 0.4)",
            borderRadius: "0.75rem",
            padding: "0.5rem 0.75rem",
          }}
        >
          <span
            style={{
              width: "1.25rem",
              height: "0.15rem",
              background: "var(--primary)",
              position: "relative",
              display: "inline-block",
            }}
          >
            <span
              style={{
                content: "' '",
                position: "absolute",
                top: "-0.4rem",
                left: 0,
                width: "100%",
                height: "100%",
                background: "var(--primary)",
              }}
            />
            <span
              style={{
                content: "' '",
                position: "absolute",
                bottom: "-0.4rem",
                left: 0,
                width: "100%",
                height: "100%",
                background: "var(--primary)",
              }}
            />
          </span>
          <span style={{ fontWeight: 600 }}>Menu</span>
        </button>
      </div>

      {isMenuOpen ? (
        <div
          id="mobile-navigation"
          style={{
            borderTop: "1px solid rgba(148, 163, 184, 0.15)",
            background: "rgba(248, 250, 252, 0.98)",
          }}
        >
          <div
            className="container"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              paddingBottom: "1.5rem",
            }}
          >
            {navLinks.map((link) => {
              const active = isLinkActive(link.href);
              const className = [
                "nav-link nav-link--mobile",
                active ? "nav-link--active" : undefined,
              ]
                .filter(Boolean)
                .join(" ");

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className={className}
                  aria-current={active ? "page" : undefined}
                  style={{
                    fontWeight: 600,
                    padding: "0.75rem 0",
                    borderBottom: "1px solid rgba(148, 163, 184, 0.15)",
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link href="/about" className="button" onClick={closeMenu}>
              Request a Quote
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
