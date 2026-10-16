import { useState } from "react";
import { SidlabMock } from "./components/SidlabMock";
import { contactPage, demos, featured, linkedIn } from "./data/projects";

type ThemeName = "light" | "dark";

function currentTheme(): ThemeName {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

export default function App() {
  const [theme, setTheme] = useState<ThemeName>(currentTheme);

  function toggleTheme() {
    const next: ThemeName = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("theme", next);
    setTheme(next);
  }

  const sidlab = featured[0];
  const rest = featured.slice(1);

  return (
    <>
      <a className="skip" href="#work">
        Skip to work
      </a>
      <div className="sheet">
        <header className="top">
          <a className="mark" href="#top">
            <span>AE</span>
            <span>
              <strong>Andrew Essam</strong>
              <small>Cairo</small>
            </span>
          </a>
          <nav aria-label="Sections">
            <a href="#work">Work</a>
            <a href="#demos">Demos</a>
            <a href="#contact">Contact</a>
          </nav>
          <button type="button" className="theme" onClick={toggleTheme} aria-pressed={theme === "dark"}>
            {theme === "dark" ? "Light" : "Dark"}
          </button>
        </header>

        <section className="hero" id="top">
          <div>
            <p className="kicker">Senior software developer</p>
            <h1>React interfaces for engineering desktop software.</h1>
            <p className="lede">
              I build the frontend of SIDLAB, a Windows application for duct acoustics and flow. Alongside that I
              ship independent mobile tools and the public site at sidlab.se.
            </p>
          </div>
          <dl className="spec">
            <div>
              <dt>Focus</dt>
              <dd>Diagrams, plots, instrument workflows, licensing</dd>
            </div>
            <div>
              <dt>Production</dt>
              <dd>Four SIDLAB releases, 1,000+ frontend commits</dd>
            </div>
            <div>
              <dt>Stack</dt>
              <dd>React, TypeScript, Vite, Redux Toolkit</dd>
            </div>
            <div>
              <dt>Also</dt>
              <dd>Expo, Flutter, Firebase, Electron</dd>
            </div>
          </dl>
        </section>

        <section className="work" id="work">
          <header className="section-head">
            <h2>Selected work</h2>
            <p>Employer source, client files, and secrets stay off this site.</p>
          </header>

          <article className="feature" id={sidlab.id}>
            <div className="feature-copy">
              <h3>{sidlab.name}</h3>
              <p>{sidlab.summary}</p>
              <ul>
                {sidlab.details.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="stack">{sidlab.stack.join(" · ")}</p>
              <p className="status">{sidlab.status}</p>
              {sidlab.href ? (
                <a className="text-link" href={sidlab.href}>
                  {sidlab.hrefLabel}
                </a>
              ) : null}
            </div>
            <SidlabMock />
          </article>

          <div className="rows">
            {rest.map((project) => (
              <article className="row" id={project.id} key={project.id}>
                <div>
                  <h3>{project.name}</h3>
                  <p>{project.summary}</p>
                  <p className="stack">{project.stack.join(" · ")}</p>
                  <p className="status">{project.status}</p>
                  {project.href ? (
                    <a className="text-link" href={project.href}>
                      {project.hrefLabel}
                    </a>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="demos" id="demos">
          <header className="section-head">
            <h2>Demos</h2>
            <p>Independent apps. The source stays private.</p>
          </header>
          <div className="rows">
            {demos.map((demo) => (
              <article className="row" id={demo.id} key={demo.id}>
                <div>
                  <h3>{demo.name}</h3>
                  <p>{demo.summary}</p>
                  <p className="stack">{demo.stack.join(" · ")}</p>
                  <p className="status">{demo.status}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="contact" id="contact">
          <header className="section-head">
            <h2>Contact</h2>
            <p>Send an email or open a LinkedIn message.</p>
          </header>
          <ul>
            <li>
              <a href={contactPage}>Send a message</a>
            </li>
            <li>
              <a href={linkedIn}>LinkedIn</a>
            </li>
            <li>
              <a href="https://github.com/MrG-Andrew">github.com/MrG-Andrew</a>
            </li>
          </ul>
        </section>

        <footer>
          <p>Static site. Hosted free on GitHub Pages.</p>
        </footer>
      </div>
    </>
  );
}
