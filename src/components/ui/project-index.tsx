"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { RefObject } from "react";
import { ProjectPanel, voiceFlow } from "@/components/project";
import { profile, projects } from "@/data/profile";
import type { Project } from "@/data/profile";
import { loadGsap, prefersReducedMotion } from "@/lib/scramble";

const IDLE_DELAY_MS = 4000;
const SCRAMBLE_CHARS = "qwerty1337h@ck3r";
const TIME_ZONE = "America/New_York";

/** Column text in display order. A missing year stays a dash rather than an invented date. */
function rowValues(project: Project): string[] {
  return [project.name, project.category, project.stack.join(" · "), project.year ?? "—"];
}
const ROW_CLASSES = ["project-row-title", "project-row-category", "project-row-stack", "project-row-year"];

function useScramble(spans: RefObject<(HTMLSpanElement | null)[]>, project: Project, isActive: boolean) {
  useEffect(() => {
    if (!isActive || prefersReducedMotion()) return;
    const values = rowValues(project);
    const targets = [...spans.current];
    let cancelled = false;
    let stop = () => {};
    loadGsap().then((gsap) => {
      if (cancelled) return;
      const tweens = targets.map((target, i) =>
        gsap.to(target, {
          duration: 0.8,
          scrambleText: { text: values[i], chars: SCRAMBLE_CHARS, revealDelay: 0.3, speed: 0.4 },
        }),
      );
      stop = () => tweens.forEach((tween) => tween.kill());
    });
    return () => {
      cancelled = true;
      stop();
      targets.forEach((target, i) => {
        if (target) target.textContent = values[i];
      });
    };
  }, [isActive, project, spans]);
}

/** Staggered blink from the reference, run only while the list is idle and on screen. */
function useIdleBlink(rows: RefObject<(HTMLElement | null)[]>, canIdle: boolean) {
  useEffect(() => {
    if (!canIdle || prefersReducedMotion()) return;
    // The row content, not the summary: the summary's CSS opacity transition would soften the blink.
    const items = rows.current.flatMap((row) => row?.querySelector(".project-row-data") ?? []);
    let cancelled = false;
    let stop = () => {};
    const timer = setTimeout(() => {
      loadGsap().then((gsap) => {
        if (cancelled) return;
        const timeline = gsap.timeline({ repeat: -1, repeatDelay: 2 });
        items.forEach((item, i) => {
          timeline.to(item, { opacity: 0.05, duration: 0.1, ease: "power2.inOut" }, i * 0.05);
          timeline.to(item, { opacity: 1, duration: 0.1, ease: "power2.inOut" }, items.length * 0.025 + i * 0.05);
        });
        stop = () => {
          timeline.kill();
          gsap.set(items, { clearProps: "opacity" });
        };
      });
    }, IDLE_DELAY_MS);
    return () => {
      cancelled = true;
      clearTimeout(timer);
      stop();
    };
  }, [canIdle, rows]);
}

function useInView(target: RefObject<HTMLElement | null>) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!target.current) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    observer.observe(target.current);
    return () => observer.disconnect();
  }, [target]);
  return inView;
}

const timeFormat = new Intl.DateTimeFormat("en-US", { timeZone: TIME_ZONE, hour: "numeric", minute: "2-digit" });
function subscribeToClock(notify: () => void) {
  const interval = setInterval(notify, 1000);
  return () => clearInterval(interval);
}

// The server renders no time, so hydration cannot mismatch; the client fills it in.
function LocalTime() {
  const time = useSyncExternalStore(subscribeToClock, () => timeFormat.format(new Date()), () => "");
  const [hours, rest = ""] = time.split(":");
  if (!time) return <span />;
  return (
    <time>
      {hours}
      <span className="time-blink">:</span>
      {rest} ET
    </time>
  );
}

function StageLayer({ project, isVisible }: { project: Project; isVisible: boolean }) {
  const { media } = project;
  const visibility = isVisible ? " is-visible" : "";
  if (media.kind === "screenshot") {
    return <div className={`stage-layer${visibility}`} style={{ backgroundImage: `url(${media.src})` }} />;
  }
  const lines = media.kind === "pipeline" ? media.steps.map((step) => step.title) : voiceFlow;
  return (
    <div className={`stage-layer stage-poster${visibility}`}>
      {lines.map((line) => (
        <span key={line}>{line}</span>
      ))}
    </div>
  );
}

type ProjectRowProps = {
  project: Project;
  isActive: boolean;
  summaryRef: (element: HTMLElement | null) => void;
  onActivate: () => void;
  onDeactivate: () => void;
  onToggle: (isOpen: boolean) => void;
};

function ProjectRow({ project, isActive, summaryRef, onActivate, onDeactivate, onToggle }: ProjectRowProps) {
  const spans = useRef<(HTMLSpanElement | null)[]>([]);
  useScramble(spans, project, isActive);
  const values = rowValues(project);
  return (
    <li className={`project-row project-${project.id}${isActive ? " is-active" : ""}`}>
      <details name="project-index" onToggle={(event) => onToggle(event.currentTarget.open)}>
        {/* Mouse and keyboard only: a tap's emulated hover or focus would never clear on touch. */}
        <summary
          ref={summaryRef}
          onPointerEnter={(event) => {
            if (event.pointerType === "mouse") onActivate();
          }}
          onFocus={(event) => {
            if (event.currentTarget.matches(":focus-visible")) onActivate();
          }}
          onBlur={onDeactivate}
        >
          <h3 className="project-row-heading">
            <span className="sr-only">
              {project.name}, {project.category}
              {project.year ? `, ${project.year}` : ""}
            </span>
            <span className="project-row-data" aria-hidden="true">
              {values.map((value, i) => (
                <span
                  key={ROW_CLASSES[i]}
                  className={ROW_CLASSES[i]}
                  ref={(element) => {
                    spans.current[i] = element;
                  }}
                >
                  {value}
                </span>
              ))}
              <span className="project-row-toggle">+</span>
            </span>
          </h3>
        </summary>
        <ProjectPanel project={project} />
      </details>
    </li>
  );
}

export function ProjectIndex() {
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [openIndex, setOpenIndex] = useState(-1);
  const stage = useRef<HTMLDivElement>(null);
  const summaries = useRef<(HTMLElement | null)[]>([]);
  const inView = useInView(stage);
  const activeIndex = hoveredIndex !== -1 ? hoveredIndex : openIndex;
  useIdleBlink(summaries, activeIndex === -1 && inView);

  return (
    <div className="project-stage" ref={stage}>
      <div className="stage-layers" aria-hidden="true">
        {projects.map((project, index) => (
          // An open panel carries the same visual, and its height would overstretch a backdrop.
          <StageLayer key={project.id} project={project} isVisible={openIndex === -1 && activeIndex === index} />
        ))}
      </div>
      <div className="stage-corners">
        <span className="stage-square" aria-hidden="true" />
        <nav className="stage-links" aria-label="Elsewhere">
          <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
          <a href={`mailto:${profile.email}`}>Email</a>
        </nav>
      </div>
      <ul className={`project-list${activeIndex !== -1 ? " has-active" : ""}`} onMouseLeave={() => setHoveredIndex(-1)}>
        {projects.map((project, index) => (
          <ProjectRow
            key={project.id}
            project={project}
            isActive={activeIndex === index}
            summaryRef={(element) => {
              summaries.current[index] = element;
            }}
            onActivate={() => setHoveredIndex(index)}
            onDeactivate={() => setHoveredIndex(-1)}
            onToggle={(isOpen) => {
              setOpenIndex((current) => (isOpen ? index : current === index ? -1 : current));
              // Closing a panel above this row moves it; keep the row just opened in view.
              if (isOpen) summaries.current[index]?.scrollIntoView({ block: "nearest" });
            }}
          />
        ))}
      </ul>
      <div className="stage-corners">
        <span>{profile.location}</span>
        <LocalTime />
      </div>
    </div>
  );
}
