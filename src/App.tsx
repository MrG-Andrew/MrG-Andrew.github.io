import { useState, type ReactNode } from "react";
import { ExpensesDemo } from "./components/ExpensesDemo";
import { PharmacyDemo } from "./components/PharmacyDemo";
import { SidlabMock, SidlabStills } from "./components/SidlabMock";
import { contactPage, demos, featured, linkedIn } from "./data/projects";

type ThemeName = "light" | "dark";

function DemoArticle({ demo, children }: { demo: (typeof demos)[number]; children: ReactNode }) {
  return (
    <article className="feature" id={demo.id}>
      <div className="feature-copy">
        <h3>{demo.name}</h3>
        <p>{demo.summary}</p>
        <p className="stack">{demo.stack.join(" · ")}</p>
        <p className="status">{demo.status}</p>
      </div>
      {children}
    </article>
  );
}

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
  const expenses = demos.find((item) => item.id === "expenses");
  const pharmacy = demos.find((item) => item.id === "pharmacy");

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
            <p className="kicker">Full-stack software developer</p>
            <h1>Software across desktop, web, and mobile.</h1>
            <p className="lede">
              I design and ship complete products: interfaces, data, and the systems around them. SIDLAB is a Windows
              application for duct acoustics and flow. I also ship independent mobile tools and the public site at
              sidlab.se.
            </p>
          </div>
          <dl className="spec">
            <div>
              <dt>Focus</dt>
              <dd>Desktop, web, and mobile products</dd>
            </div>
            <div>
              <dt>Production</dt>
              <dd>Four SIDLAB releases, 1,000+ commits</dd>
            </div>
            <div>
              <dt>Stack</dt>
              <dd>TypeScript, React, Flutter, Firebase</dd>
            </div>
            <div>
              <dt>Also</dt>
              <dd>Vite, Expo, Electron, SQL</dd>
            </div>
          </dl>
        </section>

        <section className="work" id="work">
          <header className="section-head">
            <h2>Selected work</h2>
            <p>Employer source, client files, and secrets stay off this site.</p>
          </header>

          <div className="sidlab-block">
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
            <SidlabStills />
          </div>

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
            <p>Independent apps. Each one has a short sample and still frames.</p>
          </header>
          {expenses ? (
            <DemoArticle demo={expenses}>
              <ExpensesDemo />
            </DemoArticle>
          ) : null}
          {pharmacy ? (
            <DemoArticle demo={pharmacy}>
              <PharmacyDemo />
            </DemoArticle>
          ) : null}
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
