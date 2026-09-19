"use client";

import { useEffect } from "react";

// One viewport coordinator; no scroll listeners, React state, or per-frame reads.
export function MotionDirector() {
  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches || !("IntersectionObserver" in window)) return;
    const style = getComputedStyle(document.documentElement);
    const value = (name: string) => parseFloat(style.getPropertyValue(name));
    const tokens = { ease: style.getPropertyValue("--ease-editorial").trim(), medium: value("--motion-medium"), slow: value("--motion-slow"), distance: value("--motion-distance") };
    const timelines = new Map<Element, Animation[]>();
    const animated = new Set<Element>();
    let disposed = false;
    function prepare(group: Element, target: Element | null, type: "mask" | "settle" | "media" | "rule", delay = 0) {
      if (!target || (type !== "rule" && animated.has(target))) return;
      if (type !== "rule") animated.add(target);
      let frames: Keyframe[];
      if (type === "mask") frames = [{ clipPath: "inset(100% -8px -8px -8px)", transform: "translateY(35%)" }, { clipPath: "inset(-8px -8px -8px -8px)", transform: "translateY(0)" }];
      else if (type === "media") frames = [{ clipPath: "inset(100% 0 0 0)" }, { clipPath: "inset(0 0 0 0)" }];
      else if (type === "rule") frames = [{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }];
      else frames = [{ opacity: 0, transform: `translateY(${target.matches("footer") ? 0 : tokens.distance}px)` }, { opacity: 1, transform: "translateY(0)" }];
      const animation = target.animate(frames, { duration: type === "settle" ? tokens.medium : tokens.slow, delay, easing: tokens.ease, fill: "both", ...(type === "rule" ? { pseudoElement: "::before" } : {}) });
      animation.pause();
      timelines.get(group)!.push(animation);
      animation.finished.then(() => animation.cancel(), () => {});
    }
    const selector = ".projects > .section-heading, .project, .experience > .section-heading, .experience-row, #about, .toolbox, #life, #contact, footer";
    const groups = [...document.querySelectorAll<HTMLElement>(selector)];
    // Batch measurements before preparing any animations. Already-visible/restored content stays visible.
    const below = groups.filter(group => group.getBoundingClientRect().top >= innerHeight + 30);
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.unobserve(entry.target);
        const sequence = timelines.get(entry.target);
        if (!sequence) continue;
        if (entry.boundingClientRect.bottom <= 0 || reduced.matches) sequence.forEach(a => a.cancel());
        else {
          const start = document.timeline.currentTime;
          sequence.forEach(a => { a.play(); a.startTime = start; });
        }
      }
    }, { threshold: 0, rootMargin: "0px 0px -6% 0px" });
    below.forEach(group => {
      timelines.set(group, []);
      const at = (selector: string, type: "mask" | "settle" | "media" | "rule", delay = 0) => prepare(group, group.querySelector(selector), type, delay);
      if (group.matches(".project")) {
        at(".project-visual", "media");
        // Entrance owns the frame; hover owns the image, so transforms cannot overwrite each other.
        const frame = group.querySelector(".project-screen");
        if (frame) {
          const a = frame.animate([{ transform: "translateY(25px) scale(1.08)" }, { transform: "translateY(0) scale(1)" }], { duration: tokens.slow, easing: tokens.ease, fill: "both" });
          a.pause(); timelines.get(group)!.push(a); a.finished.then(() => a.cancel(), () => {});
        }
        at(".project-info > div:first-child", "settle", 180);
        at(".project-description", "settle", 280);
      } else if (group.matches(".section-heading")) {
        at("h2", "mask"); at(".section-number", "settle", 80); at(":scope > p", "settle", 160);
        if (group.parentElement?.id === "experience") prepare(group, group.nextElementSibling, "rule");
      } else if (group.matches(".experience-row")) {
        prepare(group, group, "settle");
      } else if (group.id === "about") {
        at(".section-heading h2", "mask"); at(".about-title h3", "mask", 100); at(".about-copy", "settle", 220);
      } else if (group.matches(".toolbox")) {
        prepare(group, group, "rule");
        [...group.children].forEach((child, i) => prepare(group, child, i === 0 ? "mask" : "settle", 100 + i * 80));
      } else if (group.id === "life") {
        at("h2", "mask"); at(".personal-photo", "media", 160); at(".life-notes", "settle", 220);
      } else if (group.id === "contact") {
        at(".contact-links", "rule");
        at("h2", "mask", 80); at(".opportunity", "settle", 240); at(".contact-links", "settle", 320);
      } else prepare(group, group, "settle");
      observer.observe(group);
    });
    function finish(group: Element) { observer.unobserve(group); timelines.get(group)?.forEach(a => a.cancel()); }
    function interaction(event: Event) {
      if (!(event.target instanceof Element)) return;
      for (const group of timelines.keys()) if (group.contains(event.target)) finish(group);
    }
    function anchor() {
      // Native deep links and browser back should land on readable content immediately.
      let target: Element | null = null;
      try { target = document.getElementById(decodeURIComponent(location.hash.slice(1))); } catch {}
      if (target) for (const group of timelines.keys()) if (target.contains(group) || group.contains(target)) finish(group);
    }
    function stop() { observer.disconnect(); timelines.forEach(sequence => sequence.forEach(a => a.cancel())); }
    function preference() { if (reduced.matches) stop(); }
    function pageShow(event: PageTransitionEvent) { if (event.persisted) stop(); }
    function visibility() { if (document.hidden) stop(); }
    document.addEventListener("focusin", interaction);
    document.addEventListener("beforematch", interaction);
    document.addEventListener("visibilitychange", visibility);
    window.addEventListener("hashchange", anchor);
    window.addEventListener("beforeprint", stop);
    window.addEventListener("pageshow", pageShow);
    reduced.addEventListener("change", preference);
    // Disarm pending masks if the viewport changes: no stale geometry after rotation.
    const initialWidth = innerWidth;
    const resize = () => { if (!disposed && innerWidth !== initialWidth) stop(); };
    window.addEventListener("resize", resize);
    return () => {
      disposed = true; stop();
      document.removeEventListener("focusin", interaction);
      document.removeEventListener("beforematch", interaction);
      document.removeEventListener("visibilitychange", visibility);
      window.removeEventListener("hashchange", anchor);
      window.removeEventListener("beforeprint", stop);
      window.removeEventListener("pageshow", pageShow);
      window.removeEventListener("resize", resize);
      reduced.removeEventListener("change", preference);
    };
  }, []);
  return null;
}
