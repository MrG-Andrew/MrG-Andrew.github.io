import { useState } from "react";
import { SidlabMock } from "./components/SidlabMock";
import { archive, demos, featured } from "./data/projects";

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
            <a href="#archive">Archive</a>
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
              Since 2021 I have built the frontend of SIDLAB, a Windows application for duct acoustics and flow.
              Alongside that I ship independent mobile tools and the public site at sidlab.se.
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
              <p className="index">
                {sidlab.index}
                <span>{sidlab.years}</span>
              </p>
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
                <p className="index">
                  {project.index}
                  <span>{project.years}</span>
                </p>
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
            <h2>Live demos</h2>
            <p>Public web projects that run on GitHub Pages without a server or an API key.</p>
          </header>
          <ul className="demo-list">
            {demos.map((demo) => (
              <li key={demo.repo}>
                <div>
                  <a href={demo.live}>{demo.name}</a>
                  <p>{demo.summary}</p>
                </div>
                <span className="meta">
                  {demo.year}
                  <span>{demo.stack}</span>
                </span>
                <a className="repo-link" href={demo.repo}>
                  GitHub
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className="archive" id="archive">
          <header className="section-head">
            <h2>Public archive</h2>
            <p>
              The other {archive.length} public repositories. Forks are marked. PHP, Java, and anything that needs a
              key or a database stays linked here instead of hosted.
            </p>
          </header>
          <details>
            <summary>Show {archive.length} repositories</summary>
            <ul className="archive-list">
              {archive.map((repo) => (
                <li key={repo.repo}>
                  <a href={repo.repo}>{repo.name}</a>
                  <span>
                    {repo.year} · {repo.language}
                    {repo.fork ? " · fork" : ""}
                  </span>
                  <p>{repo.summary}</p>
                </li>
              ))}
            </ul>
          </details>
        </section>

        <section className="contact" id="contact">
          <header className="section-head">
            <h2>Contact</h2>
          </header>
          <ul>
            <li>
              <a href="mailto:andrewessam01@gmail.com">andrewessam01@gmail.com</a>
            </li>
            <li>
              <a href="https://github.com/MrG-Andrew">github.com/MrG-Andrew</a>
            </li>
            <li>Cairo, Egypt</li>
          </ul>
        </section>

        <footer>
          <p>Static site. Hosted free on GitHub Pages.</p>
        </footer>
      </div>
    </>
  );
}
