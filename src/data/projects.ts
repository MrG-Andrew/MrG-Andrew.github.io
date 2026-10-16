export type FeaturedProject = {
  id: string;
  index: string;
  name: string;
  years: string;
  summary: string;
  details: string[];
  stack: string[];
  href?: string;
  hrefLabel?: string;
  status: string;
};

export type DemoProject = {
  name: string;
  year: string;
  stack: string;
  summary: string;
  repo: string;
  live: string;
};

export type ArchiveRepo = {
  name: string;
  year: string;
  language: string;
  summary: string;
  repo: string;
  fork: boolean;
};

const gh = (name: string) => `https://github.com/MrG-Andrew/${name}`;
const pages = (name: string) => `https://mrg-andrew.github.io/${name}/`;

export const featured: FeaturedProject[] = [
  {
    id: "sidlab",
    index: "01",
    name: "SIDLAB 5",
    years: "2021 — present",
    summary:
      "Frontend for a commercial Windows application that models duct, exhaust, muffler, ventilation, and acoustics networks. The numerical engine is maintained by a specialist team. My work is the interface: workspaces, diagrams, plots, measurement screens, and licensing.",
    details: [
      "Ribbon navigation, multi-tab workspaces, editable component properties, units, and project save/load.",
      "Network editing with draggable nodes, ports, connectors, multi-select, alignment, zoom, and durable diagram state.",
      "Scientific plots, comparison with measurements, and DOCX reports that include the network and the charts.",
      "Acquisition screens for rig setup, calibration, fan speed, absorption, transmission loss, and live progress.",
      "In-product activation and a React admin portal for roles, customers, and offline licenses.",
      "Moved the production app from Create React App to Vite, onto React 18 and Ant Design 6, with about 95 Vitest tests around diagram edits.",
    ],
    stack: ["React 18", "TypeScript", "Vite", "Redux Toolkit", "Ant Design", "Vitest"],
    href: "https://sidlab.se",
    hrefLabel: "sidlab.se",
    status: "Desktop product. Source stays private. The panel on this page is a reconstruction, not the application.",
  },
  {
    id: "sidlab-site",
    index: "02",
    name: "sidlab.se",
    years: "2026",
    summary:
      "Product site for the same company: product and download pages, release notes, responsive layout, and light and dark themes. The running site is the demo.",
    details: [],
    stack: ["React", "TypeScript", "Vite"],
    href: "https://sidlab.se",
    hrefLabel: "Open sidlab.se",
    status: "Live site. The repository is private and is not part of this portfolio.",
  },
  {
    id: "expenses",
    index: "03",
    name: "Expenses Tracker",
    years: "2026",
    summary:
      "Bilingual household ledger for up to ten people, with Arabic and English and full right-to-left layout. Firestore snapshots sit on a local SQLite outbox so offline writes sync later. Budgets warn at 75% and 90%. Reports export to CSV and PDF. An optional assistant uses a key the user brings, and ledger context is anonymised before it leaves the device.",
    details: [],
    stack: ["Expo", "React Native", "Firebase", "SQLite", "Zustand", "Zod"],
    status: "Android-first independent app. Private repository. No keys are published here.",
  },
  {
    id: "pharmacy",
    index: "04",
    name: "My Pharmacy",
    years: "2026",
    summary:
      "Offline-first point of sale and inventory for an independent Egyptian pharmacy. Local Drift/SQLite storage, Firestore sync, barcode scanning, paginated stock, and an Arabic and English interface.",
    details: [],
    stack: ["Flutter", "Riverpod", "Drift", "Firestore"],
    status: "Early-stage Android app. Private repository.",
  },
];

export const demos: DemoProject[] = [
  {
    name: "Landing Page",
    year: "2021",
    stack: "HTML",
    summary: "Multi-section page whose navigation is built from the sections on the page.",
    repo: gh("Landing-Page"),
    live: pages("Landing-Page"),
  },
  {
    name: "Barto Club",
    year: "2021",
    stack: "HTML, CSS",
    summary: "Small club site. The live copy is static HTML so it can run without PHP.",
    repo: gh("barto-club-by-HTML-CSS"),
    live: pages("barto-club-by-HTML-CSS"),
  },
  {
    name: "Calculator",
    year: "2021",
    stack: "JavaScript",
    summary: "Four-function calculator in one HTML page.",
    repo: gh("calculator"),
    live: pages("calculator"),
  },
  {
    name: "Calculator TS",
    year: "2023",
    stack: "TypeScript",
    summary: "Calculator with a pi key. The page runs the compiled script.",
    repo: gh("calc-ts"),
    live: pages("calc-ts"),
  },
  {
    name: "Memory Game",
    year: "2021",
    stack: "React",
    summary: "Card-matching game.",
    repo: gh("Memory-Game"),
    live: pages("Memory-Game"),
  },
  {
    name: "Hangman",
    year: "2023",
    stack: "React, TypeScript",
    summary: "Hangman built with React and TypeScript.",
    repo: gh("hagman-ts"),
    live: pages("hagman-ts"),
  },
  {
    name: "Markdown",
    year: "2023",
    stack: "React, TypeScript",
    summary: "Markdown editor in the browser.",
    repo: gh("markdown-ts"),
    live: pages("markdown-ts"),
  },
  {
    name: "Mars Rover",
    year: "2025",
    stack: "JavaScript",
    summary: "Rover that takes F, B, L, and R commands and stops on obstacles. The live page is a grid for those commands.",
    repo: gh("Mars-Rover"),
    live: pages("Mars-Rover"),
  },
  {
    name: "Library",
    year: "2023",
    stack: "Angular",
    summary: "Book library screens in Angular.",
    repo: gh("library-Angular"),
    live: pages("library-Angular"),
  },
  {
    name: "Wishlist",
    year: "2023",
    stack: "Angular",
    summary: "Wishlist screens in Angular. The live page is the browser build.",
    repo: gh("Wishlist-Angular"),
    live: pages("Wishlist-Angular"),
  },
  {
    name: "Redux counter",
    year: "2021",
    stack: "React, Redux",
    summary: "Counter wired through Redux.",
    repo: gh("redux-counter"),
    live: pages("redux-counter"),
  },
  {
    name: "Redux login",
    year: "2021",
    stack: "React, Redux",
    summary: "Practice login screen. It does not talk to a real account system.",
    repo: gh("basic-login-system-with-redux"),
    live: pages("basic-login-system-with-redux"),
  },
];

export const archive: ArchiveRepo[] = [
  {
    name: "admin-dashboard-react",
    year: "2022",
    language: "JavaScript",
    summary: "Admin dashboard layout.",
    repo: gh("admin-dashboard-react"),
    fork: false,
  },
  {
    name: "ai-image-generator",
    year: "2023",
    language: "CSS",
    summary: "Image generator UI. It needs an API key, so it is not hosted.",
    repo: gh("ai-image-generator"),
    fork: false,
  },
  {
    name: "awesome-chatgpt-prompts",
    year: "2023",
    language: "—",
    summary: "Fork of a public prompt collection.",
    repo: gh("awesome-chatgpt-prompts"),
    fork: true,
  },
  {
    name: "church-reservation",
    year: "2022",
    language: "JavaScript",
    summary: "Reservation interface.",
    repo: gh("church-reservation"),
    fork: false,
  },
  {
    name: "Codex-Ai",
    year: "2022",
    language: "JavaScript",
    summary: "Small AI interface experiment.",
    repo: gh("Codex-Ai"),
    fork: false,
  },
  {
    name: "computer-science",
    year: "2025",
    language: "—",
    summary: "Fork of the OSSU computer science curriculum.",
    repo: gh("computer-science"),
    fork: true,
  },
  {
    name: "crypto-with-react-redux",
    year: "2021",
    language: "JavaScript",
    summary: "Crypto prices with React and Redux. Needs a remote API.",
    repo: gh("crypto-with-react-redux"),
    fork: false,
  },
  {
    name: "E-Commerce",
    year: "2022",
    language: "JavaScript",
    summary: "E-commerce interface exercise.",
    repo: gh("E-Commerce"),
    fork: false,
  },
  {
    name: "electron-react-boilerplate",
    year: "2024",
    language: "—",
    summary: "Fork of an Electron and React starter.",
    repo: gh("electron-react-boilerplate"),
    fork: true,
  },
  {
    name: "Evaluate-News",
    year: "2022",
    language: "JavaScript",
    summary: "News-article scoring with a language API.",
    repo: gh("Evaluate-News"),
    fork: false,
  },
  {
    name: "fend-webpack-content",
    year: "2021",
    language: "—",
    summary: "Fork of Udacity webpack course files.",
    repo: gh("fend-webpack-content"),
    fork: true,
  },
  {
    name: "fend-webpack-sass",
    year: "2021",
    language: "—",
    summary: "Fork of Udacity webpack and Sass course files.",
    repo: gh("fend-webpack-sass"),
    fork: true,
  },
  {
    name: "java-course",
    year: "2023",
    language: "Java",
    summary: "Spring-style API from a Java course.",
    repo: gh("java-course"),
    fork: false,
  },
  {
    name: "Jobathon-OCT-23",
    year: "2023",
    language: "JavaScript",
    summary: "Hackathon project from October 2023.",
    repo: gh("Jobathon-OCT-23"),
    fork: false,
  },
  {
    name: "JSearch-React-Native",
    year: "2023",
    language: "JavaScript",
    summary: "Job search app in React Native.",
    repo: gh("JSearch-React-Native"),
    fork: false,
  },
  {
    name: "MyReads",
    year: "2021",
    language: "JavaScript",
    summary: "Book-shelf app from the Udacity React course.",
    repo: gh("MyReads"),
    fork: false,
  },
  {
    name: "nodeBlogs",
    year: "2022",
    language: "EJS",
    summary: "Blog server rendered with EJS.",
    repo: gh("nodeBlogs"),
    fork: false,
  },
  {
    name: "Pizza-house",
    year: "2021",
    language: "PHP",
    summary: "Laravel pizza shop with owner and customer views.",
    repo: gh("Pizza-house"),
    fork: false,
  },
  {
    name: "pizza-project-with-php-sql",
    year: "2021",
    language: "PHP",
    summary: "Pizza ordering with PHP and SQL.",
    repo: gh("pizza-project-with-php-sql"),
    fork: false,
  },
  {
    name: "Portfolio",
    year: "2023",
    language: "JavaScript",
    summary: "Earlier portfolio repository. This site replaces it.",
    repo: gh("Portfolio"),
    fork: false,
  },
  {
    name: "react-course-with-net-ninja",
    year: "2021",
    language: "JavaScript",
    summary: "Exercises from a React course.",
    repo: gh("react-course-with-net-ninja"),
    fork: false,
  },
  {
    name: "reactnd-contacts-app",
    year: "2021",
    language: "—",
    summary: "Fork of a Udacity contacts starter.",
    repo: gh("reactnd-contacts-app"),
    fork: true,
  },
  {
    name: "react-super-treeview",
    year: "2022",
    language: "—",
    summary: "Fork of a React tree-view component.",
    repo: gh("react-super-treeview"),
    fork: true,
  },
  {
    name: "restaurant",
    year: "2021",
    language: "PHP",
    summary: "Restaurant management system.",
    repo: gh("restaurant"),
    fork: false,
  },
  {
    name: "StudentApi",
    year: "2023",
    language: "Java",
    summary: "Spring Boot student API.",
    repo: gh("StudentApi"),
    fork: false,
  },
  {
    name: "todo-next.js",
    year: "2023",
    language: "TypeScript",
    summary: "Todo app with Next.js and Prisma. Needs a database.",
    repo: gh("todo-next.js"),
    fork: false,
  },
  {
    name: "Udacity-Would-u-rather",
    year: "2022",
    language: "JavaScript",
    summary: "Would You Rather app from the Udacity Redux course.",
    repo: gh("Udacity-Would-u-rather"),
    fork: false,
  },
  {
    name: "Weather-app-robusta",
    year: "2022",
    language: "JavaScript",
    summary: "Weather app. Needs a weather API.",
    repo: gh("Weather-app-robusta"),
    fork: false,
  },
  {
    name: "weather-journal",
    year: "2021",
    language: "JavaScript",
    summary: "Weather journal that combines a web API with notes.",
    repo: gh("weather-journal"),
    fork: false,
  },
  {
    name: "Youtube-Clone",
    year: "2023",
    language: "TypeScript",
    summary: "YouTube interface clone. Needs an API key.",
    repo: gh("Youtube-Clone"),
    fork: false,
  },
];
