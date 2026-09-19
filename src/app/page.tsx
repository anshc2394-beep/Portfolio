import { Navigation } from "@/components/navigation";
import { ProjectFeature } from "@/components/project";
import {
  About,
  Contact,
  Experience,
  Life,
  SectionHeading,
} from "@/components/sections";
import { profile, projects } from "@/data/profile";

export default function Home() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Navigation />
      <main id="main">
        <section className="hero" id="top">
          <div className="hero-top">
            <span className="eyebrow">
              COMPUTER ENGINEERING × SOFTWARE × AI
            </span>
            <a href="#contact" className="availability">
              <span className="status-dot" /> OPEN TO{" "}
              {profile.opportunity.term.toUpperCase()} INTERNSHIPS
            </a>
          </div>
          <h1>
            <span><span className="hero-ink">Ansh</span></span>
            <span>
              <span className="hero-ink">Chaudhary<span className="name-period">.</span></span>
            </span>
          </h1>
          <div className="hero-bottom">
            <div className="hero-coordinate">
              <span className="coordinate-mark" aria-hidden="true">
                ↳
              </span>
              <div>
                BASED IN ATHENS, GEORGIA
                <br />
                UGA · EXPECTED MAY 2029
              </div>
            </div>
            <div className="hero-intro">
              <h2>{profile.headline}</h2>
              <p>{profile.intro}</p>
              <div className="hero-actions">
                <a className="button" href="#projects">
                  Explore my work <span aria-hidden="true">↓</span>
                </a>
                <a
                  className="text-link"
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub ↗
                </a>
              </div>
            </div>
          </div>
          <div className="hero-foot">
            <span>SOPHOMORE / UNIVERSITY OF GEORGIA</span>
            <a href="#projects">
              SCROLL TO EXPLORE <span aria-hidden="true">↓</span>
            </a>
          </div>
        </section>
        <section className="section projects" id="projects">
          <SectionHeading
            number="01"
            title="Selected projects."
            note="Software, networks & applied ML"
          />
          {projects.map((project, index) => (
            <ProjectFeature key={project.id} project={project} index={index} />
          ))}
        </section>
        <Experience />
        <About />
        <Life />
        <Contact />
      </main>
      <footer>
        <a className="wordmark" href="#top" aria-label="Back to top">
          ac<span>.</span>
        </a>
        <span>
          {profile.name} · {profile.location}
        </span>
        <a href="#top">Back to top ↑</a>
      </footer>
    </>
  );
}
