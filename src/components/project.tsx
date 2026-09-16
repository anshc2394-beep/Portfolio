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
        {project.id === "world-cup-path" ? (
          <>
            <div className="visual-topline">
              <span>WORLD CUP PATH / 2026</span>
              <span>48 TEAMS. ONE TROPHY.</span>
            </div>
            <div className="project-screen">
              <Image
                src="/world-cup-path.webp"
                alt="World Cup Path application: tournament simulator with group-stage predictions, knockout paths, and Monte Carlo probabilities"
                width={1440}
                height={748}
                sizes="(max-width: 700px) 90vw, 80vw"
                unoptimized
              />
            </div>
            <div className="visual-bottomline">
              <span>EXPLORE EVERY POSSIBLE PATH</span>
              <span>ACTUAL PROJECT CAPTURE ↗</span>
            </div>
          </>
        ) : (
          <>
            <div className="visual-topline">
              <span>DESK CADDY AI</span>
              <span>SYSTEM FLOW / 01</span>
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
                <span aria-hidden="true">↳</span> Keep the context. Handle the
                unexpected.
              </div>
            </div>
            <div className="visual-bottomline">
              <span>VOICE → INTENT → ACTION</span>
              <span>ARCHITECTURE SKETCH</span>
            </div>
          </>
        )}
      </div>
      <div className="project-info">
        <div>
          <p className="eyebrow">
            0{index + 1} / {project.category}{" "}
            <span className="project-year">{project.year}</span>
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
                View source <span aria-hidden="true">↗</span>
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
      <details className="project-details">
        <summary>
          Inside the project{" "}
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
