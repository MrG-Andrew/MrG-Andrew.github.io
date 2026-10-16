import { useState } from "react";

type Tab = "network" | "plot" | "acquisition";

type ElementId = "source" | "pipe-a" | "chamber" | "pipe-b" | "end";

type ElementSpec = {
  id: ElementId;
  name: string;
  kind: string;
  fields: [string, string][];
};

const elements: ElementSpec[] = [
  {
    id: "source",
    name: "Source",
    kind: "Inlet",
    fields: [
      ["Signal", "Sample"],
      ["Speed", "12 m/s"],
      ["Temperature", "20 °C"],
    ],
  },
  {
    id: "pipe-a",
    name: "Pipe A",
    kind: "Duct",
    fields: [
      ["Length", "0.80 m"],
      ["Diameter", "50 mm"],
      ["Medium", "Air"],
    ],
  },
  {
    id: "chamber",
    name: "Chamber",
    kind: "Expansion",
    fields: [
      ["Length", "0.30 m"],
      ["Diameter", "160 mm"],
      ["Ports", "2"],
    ],
  },
  {
    id: "pipe-b",
    name: "Pipe B",
    kind: "Duct",
    fields: [
      ["Length", "0.55 m"],
      ["Diameter", "50 mm"],
      ["Medium", "Air"],
    ],
  },
  {
    id: "end",
    name: "Termination",
    kind: "Open end",
    fields: [
      ["Condition", "Unflanged"],
      ["Medium", "Air"],
      ["Values", "Sample only"],
    ],
  },
];

const tabs: { id: Tab; label: string }[] = [
  { id: "network", label: "Network" },
  { id: "plot", label: "Plot" },
  { id: "acquisition", label: "Acquisition" },
];

export function SidlabMock() {
  const [tab, setTab] = useState<Tab>("network");
  const [selected, setSelected] = useState<ElementId>("chamber");
  const current = elements.find((item) => item.id === selected) ?? elements[0];

  return (
    <figure className="mock">
      <figcaption className="mock-banner">
        Portfolio reconstruction. Not the SIDLAB product, and not a calculation.
      </figcaption>
      <div className="mock-titlebar">
        <span>Sample network</span>
        <span className="mock-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
      </div>
      <div className="mock-ribbon" role="tablist" aria-label="Workspace">
        {tabs.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={tab === item.id}
            className={tab === item.id ? "is-on" : undefined}
            onClick={() => setTab(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="mock-body">
        {tab === "network" ? (
          <>
            <div className="mock-canvas" role="group" aria-label="Sample duct network">
              <svg viewBox="0 0 520 220" className="network">
                <line className="pipe" x1="78" y1="110" x2="168" y2="110" />
                <line className="pipe" x1="248" y1="110" x2="338" y2="110" />
                <NetworkNode
                  id="source"
                  x={28}
                  y={80}
                  label="Source"
                  selected={selected}
                  onSelect={setSelected}
                />
                <NetworkNode
                  id="pipe-a"
                  x={168}
                  y={86}
                  label="Pipe A"
                  compact
                  selected={selected}
                  onSelect={setSelected}
                />
                <NetworkNode
                  id="chamber"
                  x={248}
                  y={68}
                  label="Chamber"
                  wide
                  selected={selected}
                  onSelect={setSelected}
                />
                <NetworkNode
                  id="pipe-b"
                  x={338}
                  y={86}
                  label="Pipe B"
                  compact
                  selected={selected}
                  onSelect={setSelected}
                />
                <NetworkNode
                  id="end"
                  x={408}
                  y={80}
                  label="End"
                  selected={selected}
                  onSelect={setSelected}
                />
              </svg>
            </div>
            <dl className="mock-props">
              <div>
                <dt>Element</dt>
                <dd>{current.name}</dd>
              </div>
              <div>
                <dt>Kind</dt>
                <dd>{current.kind}</dd>
              </div>
              {current.fields.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </>
        ) : null}
        {tab === "plot" ? (
          <div className="mock-plot">
            <svg viewBox="0 0 520 220" role="img" aria-label="Sample transmission curve">
              <line className="axis" x1="46" y1="20" x2="46" y2="180" />
              <line className="axis" x1="46" y1="180" x2="490" y2="180" />
              <polyline
                className="curve"
                points="46,150 90,142 130,120 170,128 210,70 250,96 300,48 350,88 400,60 450,74 490,66"
              />
              <text className="axis-label" x="250" y="208">
                Frequency, sample axis
              </text>
              <text className="axis-label" x="16" y="24">
                Level
              </text>
            </svg>
            <p>Drawn for this page. It is not a solver result.</p>
          </div>
        ) : null}
        {tab === "acquisition" ? (
          <div className="mock-acq">
            <p>No instrument is attached. This panel only shows the shape of a measurement screen.</p>
            <ol>
              <li>Rig check</li>
              <li>Calibration</li>
              <li>Excitation</li>
              <li>Idle</li>
            </ol>
            <button type="button" disabled>
              Acquire
            </button>
          </div>
        ) : null}
      </div>
      <div className="mock-status">
        <span>{tab === "network" ? current.name : tabs.find((item) => item.id === tab)?.label}</span>
        <span>Sample data</span>
      </div>
    </figure>
  );
}

function NetworkNode({
  id,
  x,
  y,
  label,
  selected,
  onSelect,
  compact = false,
  wide = false,
}: {
  id: ElementId;
  x: number;
  y: number;
  label: string;
  selected: ElementId;
  onSelect: (id: ElementId) => void;
  compact?: boolean;
  wide?: boolean;
}) {
  const width = wide ? 90 : compact ? 52 : 64;
  const height = wide ? 84 : compact ? 48 : 60;
  const on = selected === id;

  return (
    <g
      className={on ? "node is-on" : "node"}
      transform={`translate(${x} ${y})`}
      onClick={() => onSelect(id)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect(id);
        }
      }}
      role="button"
      tabIndex={0}
      aria-pressed={on}
      aria-label={label}
    >
      <rect width={width} height={height} rx="2" />
      <text x={width / 2} y={height / 2 + 4} textAnchor="middle">
        {label}
      </text>
    </g>
  );
}
