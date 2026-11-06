import Image from "next/image";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import type { Project } from "@/data/profile";

/** The Desk Caddy steps as plain lines, for the backdrop behind the project list. */
export const voiceFlow = ["Inbound call", "Capture request", "Save & notify"];

export function ProjectPanel({ project }: { project: Project }) {
  return (
    <div className="project-panel">
      <div className="project-visual">
        {project.media.kind === "screenshot" ? (
          <>
            <div className="visual-topline">
              <span>{project.media.label}</span>
              <span>{project.media.tagline}</span>
            </div>
            <div className="project-screen">
              <Image
                src={project.media.src}
                alt={project.media.alt}
                width={project.media.width}
                height={project.media.height}
                loading="lazy"
                sizes="(max-width: 700px) 90vw, 80vw"
                unoptimized
              />
            </div>
            <div className="visual-bottomline">
              <span>{project.media.footline}</span>
              <span>{project.media.caption}</span>
            </div>
          </>
        ) : project.media.kind === "pipeline" ? (
          <>
            <div className="visual-topline">
              <span>{project.media.label}</span>
              <span>PACKETS → CONTEXT</span>
            </div>
            <div className="network-study">
              <p className="network-question">
                What makes a<br />
                <span>flow unusual?</span>
              </p>
              <ol
                className="network-pipeline"
                aria-label="NetWatch processing architecture"
              >
                {project.media.steps.map((step, stepIndex) => (
                  <li key={step.title}>
                    <span className="pipeline-index">0{stepIndex + 1}</span>
                    <div>
                      <strong>{step.title}</strong>
                      <p>{step.detail}</p>
                    </div>
                    <span aria-hidden="true">↓</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="flow-key">
              <span>ONE FLOW / FIVE FIELDS</span>
              <p>
                Source IP · Destination IP · Source port · Destination port ·
                Protocol
              </p>
            </div>
            <div className="visual-bottomline">
              <span>{project.media.caption}</span>
              <span>CAPTURE / ANALYSIS / UI</span>
            </div>
          </>
        ) : (
          <>
            <div className="visual-topline">
              <span>{project.media.label}</span>
              <span>SYSTEM FLOW</span>
            </div>
            <div
              className="voice-diagram"
              aria-label="System flow: inbound call, capture appointment request, save lead, notify business owner"
            >
              <span className="diagram-caption">
                FROM A CALL TO A FOLLOW-UP.
              </span>
              <div className="flow">
                <span>
                  Inbound
                  <br />
                  call
                </span>
                <b aria-hidden="true">→</b>
                <span>
                  Capture
                  <br />
                  request
                </span>
                <b aria-hidden="true">→</b>
                <span>
                  Save &<br />
                  notify
                </span>
              </div>
              <div className="diagram-note">
                <span aria-hidden="true">↳</span> Collect a request. Leave the
                booking to a person.
              </div>
            </div>
            <div className="visual-bottomline">
              <span>CALL → REQUEST → FOLLOW-UP</span>
              <span>{project.media.caption}</span>
            </div>
          </>
        )}
      </div>
      <div className="project-description">
        <p>{project.description}</p>
        <ul className="technology-list" aria-label="Technologies">
          {project.stack.map((tool) => (
            <li key={tool}>{tool}</li>
          ))}
        </ul>
        <div className="project-actions">
          {project.live && (
            <InteractiveHoverButton text="Live project" icon="↗" href={project.live} target="_blank" rel="noreferrer">
              <span className="sr-only"> for {project.name} (opens in a new tab)</span>
            </InteractiveHoverButton>
          )}
          {project.github && (
            <InteractiveHoverButton
              text="GitHub / Source"
              icon="↗"
              variant="secondary"
              href={project.github}
              target="_blank"
              rel="noreferrer"
            >
              <span className="sr-only"> for {project.name} (opens in a new tab)</span>
            </InteractiveHoverButton>
          )}
        </div>
      </div>
      <p className="project-takeaway">
        <span>Engineering takeaway</span>
        {project.takeaway}
      </p>
      <details className="project-details">
        <summary>
          Inside {project.name}{" "}
          <span aria-hidden="true" className="details-icon">
            +
          </span>
        </summary>
        <div className="detail-grid">
          {project.details.map((detail) => (
            <div key={detail.label}>
              <h4>{detail.label}</h4>
              <p>{detail.text}</p>
            </div>
          ))}
        </div>
      </details>
    </div>
  );
}
