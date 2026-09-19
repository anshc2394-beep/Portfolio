"use client";

import { useEffect } from "react";

const ease = "cubic-bezier(0.22, 1, 0.36, 1)";
const groups = [
  ".section-heading",
  ".project-visual",
  ".project-info",
  ".experience-row",
  ".about-grid",
  ".toolbox",
  ".life-inner",
  ".contact > .eyebrow",
  ".contact-grid",
  ".contact-links",
  "footer",
].join(",");

/** Progressive enhancement: nothing is hidden while waiting for JS or an observer. */
export function MotionController() {
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (preference.matches || !("IntersectionObserver" in window)) return;

    const active = new Map<Animation, Element>();
    const seen = new WeakSet<Element>();
    const elements = document.querySelectorAll<HTMLElement>(groups);
    const mobile = window.matchMedia("(max-width: 760px)");

    function animate(element: Element, frames: Keyframe[], delay = 0, duration = 600) {
      const animation = element.animate(frames, { duration, delay, easing: ease, fill: "backwards" });
      active.set(animation, element);
      animation.finished.then(() => active.delete(animation), () => active.delete(animation));
    }

    function reveal(element: HTMLElement) {
      // A single observer per logical group, with a short stagger between columns.
      const media = element.matches(".project-visual");
      const quiet = element.matches(".experience-row, .life-inner, .contact-grid, .contact-links, footer");
      const children = element.matches(".project-info, .experience-row, .about-grid, .toolbox, .life-inner, .contact-grid")
        ? Array.from(element.children)
        : [element];

      if (media && !mobile.matches) {
        animate(element, [
          { opacity: 0.85, clipPath: "inset(0 0 5% 0)" },
          { opacity: 1, clipPath: "inset(0 0 0% 0)" },
        ], 0, 720);
        return;
      }

      children.forEach((child, index) => {
        const distance = quiet ? 0 : mobile.matches ? 10 : 18;
        animate(child, [
          { opacity: 0, transform: `translateY(${distance}px)` },
          { opacity: 1, transform: "translateY(0)" },
        ], Math.min(index * 55, 110), quiet ? 560 : 620);
      });

      if (element.matches(".experience-row") && !mobile.matches) {
        // Animate the existing bottom rule without changing its dimensions.
        animate(element, [{ "--rule-progress": "0" }, { "--rule-progress": "1" }], 0, 620);
      }
    }

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting || seen.has(entry.target)) continue;
        seen.add(entry.target);
        observer.unobserve(entry.target);
        // Fast scrolling and anchor jumps must not replay content above the viewport.
        if (entry.boundingClientRect.bottom > 0 && !preference.matches) {
          reveal(entry.target as HTMLElement);
        }
      }
    }, { threshold: 0, rootMargin: "0px 0px -10% 0px" });

    elements.forEach((element) => {
      // Do not fade out content that was already visible before hydration, including
      // restored scroll positions and direct links to lower sections.
      if (element.getBoundingClientRect().top < window.innerHeight) seen.add(element);
      else observer.observe(element);
    });

    function finishForInteraction(event: Event) {
      if (!(event.target instanceof Element)) return;
      const target = event.target;
      const group = target.closest(groups);
      if (group) { seen.add(group); observer.unobserve(group); }
      for (const [animation, element] of active) {
        if (element.contains(target) || target.contains(element)) animation.cancel();
      }
    }

    function stop() {
      observer.disconnect();
      for (const animation of active.keys()) animation.cancel();
      active.clear();
    }
    function onPreferenceChange() { if (preference.matches) stop(); }
    function onPageShow(event: PageTransitionEvent) { if (event.persisted) stop(); }

    document.addEventListener("focusin", finishForInteraction);
    document.addEventListener("beforematch", finishForInteraction);
    preference.addEventListener("change", onPreferenceChange);
    window.addEventListener("pageshow", onPageShow);
    window.addEventListener("beforeprint", stop);
    return () => {
      stop();
      document.removeEventListener("focusin", finishForInteraction);
      document.removeEventListener("beforematch", finishForInteraction);
      preference.removeEventListener("change", onPreferenceChange);
      window.removeEventListener("pageshow", onPageShow);
      window.removeEventListener("beforeprint", stop);
    };
  }, []);

  return null;
}
