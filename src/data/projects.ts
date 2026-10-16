export type FeaturedProject = {
  id: string;
  name: string;
  summary: string;
  details: string[];
  stack: string[];
  href?: string;
  hrefLabel?: string;
  status: string;
};

export type DemoProject = {
  id: string;
  name: string;
  summary: string;
  stack: string[];
  status: string;
};

export const featured: FeaturedProject[] = [
  {
    id: "sidlab",
    name: "SIDLAB 5",
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
    name: "sidlab.se",
    summary:
      "Product site for the same company: product and download pages, release notes, responsive layout, and light and dark themes. The running site is the demo.",
    details: [],
    stack: ["React", "TypeScript", "Vite"],
    href: "https://sidlab.se",
    hrefLabel: "Open sidlab.se",
    status: "Live site. The repository is private and is not part of this portfolio.",
  },
];

export const demos: DemoProject[] = [
  {
    id: "expenses",
    name: "Expenses Tracker",
    summary:
      "Bilingual household ledger for up to ten people, with Arabic and English and full right-to-left layout. Firestore snapshots sit on a local SQLite outbox so offline writes sync later. Budgets warn at 75% and 90%. Reports export to CSV and PDF. An optional assistant uses a key the user brings, and ledger context is anonymised before it leaves the device.",
    stack: ["Expo", "React Native", "Firebase", "SQLite", "Zustand", "Zod"],
    status: "Android-first independent app. Private repository. No keys are published here.",
  },
  {
    id: "pharmacy",
    name: "My Pharmacy",
    summary:
      "Offline-first point of sale and inventory for an independent Egyptian pharmacy. Local Drift/SQLite storage, Firestore sync, barcode scanning, paginated stock, and an Arabic and English interface.",
    stack: ["Flutter", "Riverpod", "Drift", "Firestore"],
    status: "Early-stage Android app. Private repository.",
  },
];

export const contactPage = "https://mrg-andrew.github.io/contact/";
export const linkedIn = "https://www.linkedin.com/in/andrew-yoakim/";
