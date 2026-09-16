import { profile } from "@/data/profile";

export function SectionHeading({
  number,
  title,
  note,
}: {
  number: string;
  title: string;
  note?: string;
}) {
  return (
    <div className="section-heading">
      <div>
        <span className="section-number">{number} /</span>
        <h2>{title}</h2>
      </div>
      {note && <p>{note}</p>}
    </div>
  );
}

export function Experience() {
  return (
    <section id="experience" className="section experience">
      <SectionHeading
        number="02"
        title="Learning on the job."
        note="Real products. New perspectives."
      />
      <div className="experience-list">
        {profile.experience.map((job) => (
          <article key={job.company} className="experience-row">
            <div className="job-date">{job.date ?? job.context}</div>
            <div className="job-title">
              <h3>{job.company}</h3>
              <p>{job.role}</p>
            </div>
            <div className="job-description">
              <p>{job.description}</p>
              <span>{job.tags}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function About() {
  return (
    <section id="about" className="section about">
      <SectionHeading number="03" title="Still early. All in." />
      <div className="about-grid">
        <div className="about-title">
          <p className="eyebrow">A LITTLE CONTEXT</p>
          <h3>
            Curious about
            <br /> the whole
            <br /> <span>system.</span>
          </h3>
        </div>
        <div className="about-copy">
          <p>{profile.bio}</p>
          <p>{profile.bioContinued}</p>
          <div className="education">
            <span className="eyebrow">
              EDUCATION / {profile.education.start} —{" "}
              {profile.education.graduation}
            </span>
            <h4>{profile.education.school}</h4>
            <p>
              {profile.education.degree}
              <br />
              {profile.education.emphasis}
            </p>
          </div>
        </div>
      </div>
      <div id="skills" className="toolbox">
        <div className="toolbox-title">
          <h3>
            The working
            <br />
            toolbox.
          </h3>
          <p>
            Tools I use. Ideas I’m
            <br />
            getting deeper into.
          </p>
        </div>
        {profile.skills.map((group) => (
          <div key={group.title}>
            <h4>
              {group.title}
              {group.title === "Exploring further" && (
                <span className="accent"> ↗</span>
              )}
            </h4>
            <ul>
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Life() {
  return (
    <section id="life" className="life">
      <div className="life-inner">
        <div className="life-heading">
          <p className="eyebrow">04 / AWAY FROM THE KEYBOARD</p>
          <h2>
            Not always
            <br />
            at my desk<span>.</span>
          </h2>
          <p>
            There’s usually a game to play,
            <br />a set to finish, or something on repeat.
          </p>
        </div>
        <div className="life-notes">
          <div className="activity-note">
            <span className="eyebrow">OFFLINE ROTATION</span>
            {profile.interests.map((interest, index) => (
              <div key={interest}>
                <span>0{index + 1}</span>
                <h3>{interest}</h3>
              </div>
            ))}
          </div>
          <div className="music-note">
            <span className="eyebrow">IN THE ROTATION</span>
            <p>{profile.artists.join(" / ")}</p>
            <span className="music-caption">
              Good music makes a long day better.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section id="contact" className="section contact">
      <p className="eyebrow">05 / WHAT’S NEXT</p>
      <div className="contact-grid">
        <h2>
          Good work starts
          <br />
          with a{" "}
          <a href={`mailto:${profile.email}`}>
            conversation<span aria-hidden="true">↗</span>
          </a>
        </h2>
        <div className="opportunity">
          <span className="availability">
            LOOKING AHEAD / {profile.opportunity.term.toUpperCase()}
          </span>
          <p>
            I’m looking for an internship where I can contribute, ask better
            questions, and learn from people who care about what they build.
          </p>
          <p className="opportunity-roles">{profile.opportunity.roles}</p>
          <p className="muted">{profile.opportunity.relocation}</p>
        </div>
      </div>
      <div className="contact-links">
        <a className="email-link" href={`mailto:${profile.email}`}>
          {profile.email}
          <span aria-hidden="true">↗</span>
        </a>
        <div>
          <a href={profile.github} target="_blank" rel="noreferrer">
            GitHub ↗
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">
            LinkedIn ↗
          </a>
          <a href={profile.resume} download="Ansh-Chaudhary-Resume.pdf">
            Download résumé ↓
          </a>
        </div>
      </div>
    </section>
  );
}
