"use client";

import { useSyncExternalStore } from "react";

function subscribe(notify: () => void) {
  const observer = new MutationObserver(notify);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  const system = matchMedia("(prefers-color-scheme: dark)");
  function sync() {
    try { if (localStorage.getItem("portfolio-theme")) return; } catch {}
    document.documentElement.dataset.theme = system.matches ? "dark" : "light";
  }
  function storage(event: StorageEvent) {
    if (event.key !== "portfolio-theme") return;
    if (event.newValue === "light" || event.newValue === "dark") document.documentElement.dataset.theme = event.newValue;
    else sync();
  }
  system.addEventListener("change", sync);
  window.addEventListener("storage", storage);
  return () => { observer.disconnect(); system.removeEventListener("change", sync); window.removeEventListener("storage", storage); };
}
export function ThemeToggle() {
  const dark = useSyncExternalStore(subscribe, () => document.documentElement.dataset.theme === "dark", () => false);
  function toggle() {
    const root = document.documentElement;
    const theme = root.dataset.theme === "dark" ? "light" : "dark";
    root.classList.add("theme-changing");
    root.dataset.theme = theme;
    try { localStorage.setItem("portfolio-theme", theme); } catch {}
    window.setTimeout(() => root.classList.remove("theme-changing"), 450);
  }
  return <button className="theme-toggle" type="button" onClick={toggle} aria-label={dark ? "Switch to light mode" : "Switch to dark mode"} title={dark ? "Switch to light mode" : "Switch to dark mode"}>
    <svg className="theme-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/></svg>
    <svg className="theme-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M20.2 15.7A9 9 0 0 1 8.3 3.8a9 9 0 1 0 11.9 11.9Z"/></svg>
  </button>;
}
