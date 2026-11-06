import type { gsap as Gsap } from "gsap";

let loaded: Promise<typeof Gsap> | null = null;

/** Loads GSAP on first use so it stays out of the initial bundle's hydration work. */
export function loadGsap(): Promise<typeof Gsap> {
  loaded ??= Promise.all([import("gsap"), import("gsap/ScrambleTextPlugin")]).then(
    ([{ gsap }, { ScrambleTextPlugin }]) => {
      gsap.registerPlugin(ScrambleTextPlugin);
      return gsap;
    },
  );
  return loaded;
}

export function prefersReducedMotion(): boolean {
  return matchMedia("(prefers-reduced-motion: reduce)").matches;
}
