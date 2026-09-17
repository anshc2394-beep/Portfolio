import Image from "next/image";
import type { Project } from "@/data/profile";

export function ProjectFeature({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <article className={`project project-${project.id}`}>
      <div className="project-visual">
        {project.media.kind === "screenshot" ? (
          <>
            <div className="visual-topline">
              <span>{project.media.label}</span>
              <span>48 TEAMS. ONE TROPHY.</span>
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
              <span>EXPLORE EVERY POSSIBLE PATH</span>
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
      <div className="project-info">
        <div>
          <p className="eyebrow">
            0{index + 1} / {project.category}{" "}
            {project.year && (
              <span className="project-year">{project.year}</span>
            )}
          </p>
          <h3>
            {project.name}
            <span className="accent">.</span>
          </h3>
        </div>
        <div className="project-description">
          <p>{project.description}</p>
          <ul className="technology-list" aria-label="Technologies">
            {project.stack.map((tool) => (
              <li key={tool}>{tool}</li>
            ))}
          </ul>
          <div className="project-actions">
            {project.github && (
              <a
                className="text-link"
                href={project.github}
                target="_blank"
                rel="noreferrer"
              >
                GitHub / Source <span aria-hidden="true">↗</span>
                <span className="sr-only">
                  {" "}
                  for {project.name} (opens in a new tab)
                </span>
              </a>
            )}
            {project.live && (
              <a
                className="text-link"
                href={project.live}
                target="_blank"
                rel="noreferrer"
              >
                Live project ↗
              </a>
            )}
          </div>
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
    </article>
  );
}
