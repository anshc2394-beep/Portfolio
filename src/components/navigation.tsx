"use client";

import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/profile";

const links = [
  ["Projects", "#projects"],
  ["Experience", "#experience"],
  ["About", "#about"],
  ["Contact", "#contact"],
];

export function Navigation() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);
  return (
    <header className="site-header">
      <a
        className="wordmark"
        href="#top"
        aria-label="Ansh Chaudhary, back to top"
        onClick={() => setOpen(false)}
      >
        ac<span>.</span>
      </a>
      <span className="header-note">A WORK IN PROGRESS. SO AM I.</span>
      <button
        ref={toggle}
        className="menu-toggle"
        aria-expanded={open}
        aria-controls="main-navigation"
        onClick={() => setOpen(!open)}
      >
        {open ? "Close −" : "Menu +"}
      </button>
      <nav
        id="main-navigation"
        aria-label="Main navigation"
        className={open ? "navigation is-open" : "navigation"}
      >
        {links.map(([label, href]) => (
          <a href={href} key={href} onClick={() => setOpen(false)}>
            {label}
          </a>
        ))}
        <a
          className="resume-nav"
          href={profile.resume}
          target="_blank"
          rel="noreferrer"
        >
          Résumé <span aria-hidden="true">↗</span>
          <span className="sr-only"> (PDF, opens in a new tab)</span>
        </a>
      </nav>
    </header>
  );
}
