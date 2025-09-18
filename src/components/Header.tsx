import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/request-quote", label: "Request a Quote" },
];

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((open) => !open);
  const closeMenu = () => setIsMenuOpen(false);

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
          padding: "1rem 0",
        }}
      >
        <Link
          to="/"
          onClick={closeMenu}
          style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "2.75rem",
              height: "2.75rem",
              borderRadius: "9999px",
              background: "linear-gradient(135deg, var(--secondary), #1d4ed8)",
              color: "white",
              fontWeight: 700,
            }}
          >
            SJ
          </span>
          <div>
            <p style={{ fontWeight: 700, fontSize: "1.1rem", lineHeight: 1.1 }}>
              St. John&apos;s Auto Repair
            </p>
            <p style={{ fontSize: "0.85rem", color: "var(--muted)" }}>
              Trusted Mobile Mechanic in Jacksonville
            </p>
          </div>
        </Link>

        <nav
          style={{ display: "none", gap: "1.5rem" }}
          className="nav--desktop"
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={closeMenu}
              className={({ isActive }) =>
                ["nav-link", isActive ? "nav-link--active" : undefined]
                  .filter(Boolean)
                  .join(" ")
              }
              style={{
                fontWeight: 600,
                color: "var(--muted)",
              }}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <Link
          to="/request-quote"
          className="button nav--desktop"
          style={{ display: "none" }}
        >
          Schedule Service
        </Link>

        <button
          type="button"
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          style={{
            background: "white",
            border: "1px solid rgba(148, 163, 184, 0.4)",
            borderRadius: "0.75rem",
            padding: "0.5rem 0.75rem",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.35rem",
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
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={closeMenu}
                className={({ isActive }) =>
                  [
                    "nav-link nav-link--mobile",
                    isActive ? "nav-link--active" : undefined,
                  ]
                    .filter(Boolean)
                    .join(" ")
                }
                style={{
                  fontWeight: 600,
                  padding: "0.75rem 0",
                  borderBottom: "1px solid rgba(148, 163, 184, 0.15)",
                }}
              >
                {link.label}
              </NavLink>
            ))}
            <Link to="/request-quote" className="button" onClick={closeMenu}>
              Request a Quote
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
};

export default Header;
