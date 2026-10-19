import { useRef, useState, type PointerEvent } from "react";

type Tab = "network" | "plot" | "acquisition" | "report";
type ElementId = "source" | "pipe-a" | "chamber" | "pipe-b" | "end";
type ValueKey = "pipeA" | "pipeB" | "chamber";
type Position = { x: number; y: number };
type Positions = Record<ElementId, Position>;
type SampleValues = Record<ValueKey, string>;
type FieldRow =
  | { label: string; value: string; key?: undefined; unit?: undefined }
  | { label: string; value: string; key: ValueKey; unit: string };

const NETWORK_W = 520;
const NETWORK_H = 220;
const PLOT_W = 520;
const PLOT_H = 244;

const tabOrder: Tab[] = ["network", "plot", "acquisition", "report"];
const tabLabel: Record<Tab, string> = {
  network: "Network",
  plot: "Plot",
  acquisition: "Acquisition",
  report: "Report",
};

const stages = [
  { id: "rig", label: "Rig check", progress: 30 },
  { id: "cal", label: "Calibration", progress: 60 },
  { id: "exc", label: "Excitation", progress: 90 },
  { id: "idle", label: "Idle", progress: 0 },
] as const;

const elementOrder: ElementId[] = ["source", "pipe-a", "chamber", "pipe-b", "end"];
const links: [ElementId, ElementId][] = [
  ["source", "pipe-a"],
  ["pipe-a", "chamber"],
  ["chamber", "pipe-b"],
  ["pipe-b", "end"],
];

const labels: Record<ElementId, string> = {
  source: "Source",
  "pipe-a": "Pipe A",
  chamber: "Chamber",
  "pipe-b": "Pipe B",
  end: "End",
};

const meta: Record<ElementId, { name: string; kind: string }> = {
  source: { name: "Source", kind: "Inlet" },
  "pipe-a": { name: "Pipe A", kind: "Duct" },
  chamber: { name: "Chamber", kind: "Expansion" },
  "pipe-b": { name: "Pipe B", kind: "Duct" },
  end: { name: "Termination", kind: "Open end" },
};

const defaultPositions: Positions = {
  source: { x: 28, y: 80 },
  "pipe-a": { x: 168, y: 86 },
  chamber: { x: 248, y: 68 },
  "pipe-b": { x: 338, y: 86 },
  end: { x: 408, y: 80 },
};

const defaultValues: SampleValues = {
  pipeA: "0.80",
  pipeB: "0.55",
  chamber: "160",
};

const modelPoints = "46,170 90,162 130,140 170,148 210,90 250,116 300,68 350,108 400,80 450,94 490,86";
const measuredPoints: [number, number][] = [
  [46, 178],
  [90, 148],
  [130, 150],
  [170, 132],
  [210, 104],
  [250, 106],
  [300, 84],
  [350, 116],
  [400, 92],
  [450, 82],
  [490, 96],
];

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function isElementId(value: string): value is ElementId {
  return elementOrder.includes(value as ElementId);
}

function nodeSize(id: ElementId) {
  if (id === "chamber") return { w: 90, h: 84 };
  if (id === "pipe-a" || id === "pipe-b") return { w: 52, h: 48 };
  return { w: 64, h: 60 };
}

function nodeCenter(id: ElementId, position: Position) {
  const { w, h } = nodeSize(id);
  return { x: position.x + w / 2, y: position.y + h / 2 };
}

function toSvg(svg: SVGSVGElement, clientX: number, clientY: number) {
  const matrix = svg.getScreenCTM();
  if (matrix) {
    const local = new DOMPoint(clientX, clientY).matrixTransform(matrix.inverse());
    return { x: local.x, y: local.y };
  }
  const rect = svg.getBoundingClientRect();
  return {
    x: ((clientX - rect.left) / (rect.width || 1)) * NETWORK_W,
    y: ((clientY - rect.top) / (rect.height || 1)) * NETWORK_H,
  };
}

function shown(value: string) {
  return value === "" ? "—" : value;
}

function fieldsFor(id: ElementId, values: SampleValues): FieldRow[] {
  if (id === "source") {
    return [
      { label: "Signal", value: "Sample" },
      { label: "Speed", value: "12 m/s" },
      { label: "Temperature", value: "20 °C" },
    ];
  }
  if (id === "pipe-a" || id === "pipe-b") {
    const key: ValueKey = id === "pipe-a" ? "pipeA" : "pipeB";
    return [
      { label: "Length", value: values[key], unit: "m", key },
      { label: "Diameter", value: "50 mm" },
      { label: "Medium", value: "Air" },
    ];
  }
  if (id === "chamber") {
    return [
      { label: "Length", value: "0.30 m" },
      { label: "Diameter", value: values.chamber, unit: "mm", key: "chamber" },
      { label: "Ports", value: "2" },
    ];
  }
  return [
    { label: "Condition", value: "Unflanged" },
    { label: "Medium", value: "Air" },
    { label: "Values", value: "Sample only" },
  ];
}

function NetworkNode({
  id,
  position,
  selected,
  onSelect,
}: {
  id: ElementId;
  position: Position;
  selected: boolean;
  onSelect?: (id: ElementId) => void;
}) {
  const { w, h } = nodeSize(id);
  const interactive = onSelect !== undefined;

  return (
    <g
      className={selected ? "node is-on" : "node"}
      data-node={id}
      transform={`translate(${position.x} ${position.y})`}
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-pressed={interactive ? selected : undefined}
      aria-label={interactive ? labels[id] : undefined}
      onKeyDown={
        interactive
          ? (event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onSelect(id);
              }
            }
          : undefined
      }
    >
      <rect width={w} height={h} rx="2" />
      <text x={w / 2} y={h / 2 + 4} textAnchor="middle">
        {labels[id]}
      </text>
    </g>
  );
}

function NetworkSvg({
  positions,
  selected,
  interactive = false,
  dragging = false,
  onSelect,
  onPointerDown,
  onPointerMove,
  onPointerUp,
}: {
  positions: Positions;
  selected?: ElementId;
  interactive?: boolean;
  dragging?: boolean;
  onSelect?: (id: ElementId) => void;
  onPointerDown?: (event: PointerEvent<SVGSVGElement>) => void;
  onPointerMove?: (event: PointerEvent<SVGSVGElement>) => void;
  onPointerUp?: (event: PointerEvent<SVGSVGElement>) => void;
}) {
  return (
    <svg
      className={interactive ? (dragging ? "network is-live is-dragging" : "network is-live") : "network"}
      viewBox={`0 0 ${NETWORK_W} ${NETWORK_H}`}
      role={interactive ? "group" : "img"}
      aria-label="Sample duct network"
      onPointerDown={interactive ? onPointerDown : undefined}
      onPointerMove={interactive ? onPointerMove : undefined}
      onPointerUp={interactive ? onPointerUp : undefined}
      onPointerCancel={interactive ? onPointerUp : undefined}
      onLostPointerCapture={interactive ? onPointerUp : undefined}
    >
      {links.map(([from, to]) => {
        const start = nodeCenter(from, positions[from]);
        const end = nodeCenter(to, positions[to]);
        return (
          <line key={`${from}-${to}`} className="pipe" x1={start.x} y1={start.y} x2={end.x} y2={end.y} />
        );
      })}
      {elementOrder.map((id) => (
        <NetworkNode
          key={id}
          id={id}
          position={positions[id]}
          selected={selected === id}
          onSelect={interactive ? onSelect : undefined}
        />
      ))}
    </svg>
  );
}

function PlotSvg() {
  return (
    <svg className="plot" viewBox={`0 0 ${PLOT_W} ${PLOT_H}`} role="img" aria-label="Sample model curve and measurement points">
      <line className="curve legend-swatch" x1="46" y1="16" x2="74" y2="16" />
      <text className="axis-label" x="80" y="20">
        Model
      </text>
      <circle className="sample-point" cx="168" cy="16" r="4" />
      <text className="axis-label" x="178" y="20">
        Measured
      </text>
      <line className="axis" x1="46" y1="36" x2="46" y2="200" />
      <line className="axis" x1="46" y1="200" x2="490" y2="200" />
      <polyline className="curve" points={modelPoints} />
      {measuredPoints.map(([x, y]) => (
        <circle key={`${x}-${y}`} className="sample-point" cx={x} cy={y} r="4" />
      ))}
      <text className="axis-label" x="250" y="228">
        Frequency, sample axis
      </text>
      <text className="axis-label" x="16" y="48">
        Level
      </text>
    </svg>
  );
}

function ReportPage({ positions, values }: { positions: Positions; values: SampleValues }) {
  return (
    <div className="report-page">
      <header className="report-head">
        <strong>Sample network</strong>
        <span>Preview</span>
      </header>
      <NetworkSvg positions={positions} selected="chamber" />
      <PlotSvg />
      <p className="report-note">
        Sample page. Chamber {shown(values.chamber)} mm, pipe A {shown(values.pipeA)} m, pipe B {shown(values.pipeB)} m.
      </p>
    </div>
  );
}

function PropertyList({
  id,
  values,
  onChange,
}: {
  id: ElementId;
  values: SampleValues;
  onChange: (key: ValueKey, value: string) => void;
}) {
  const rows = fieldsFor(id, values);

  return (
    <dl className="mock-props">
      <div>
        <dt>Element</dt>
        <dd>{meta[id].name}</dd>
      </div>
      <div>
        <dt>Kind</dt>
        <dd>{meta[id].kind}</dd>
      </div>
      {rows.map((row) => (
        <div key={row.label}>
          <dt>{row.label}</dt>
          <dd>
            {row.key ? (
              <>
                <input
                  aria-label={`${row.label} in ${row.unit}`}
                  inputMode="decimal"
                  value={row.value}
                  onChange={(event) => {
                    const next = event.target.value;
                    if (row.key && (next === "" || /^\d*\.?\d{0,2}$/.test(next))) onChange(row.key, next);
                  }}
                />
                <span className="unit">{row.unit}</span>
              </>
            ) : (
              row.value
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function SidlabMock() {
  const [tab, setTab] = useState<Tab>("network");
  const [selected, setSelected] = useState<ElementId>("chamber");
  const [positions, setPositions] = useState<Positions>(defaultPositions);
  const [values, setValues] = useState<SampleValues>(defaultValues);
  const [stageIndex, setStageIndex] = useState(stages.length - 1);
  const [dragging, setDragging] = useState(false);
  const dragRef = useRef<{ id: ElementId; dx: number; dy: number } | null>(null);
  const stage = stages[stageIndex];

  function endDrag() {
    dragRef.current = null;
    setDragging(false);
  }

  function onPointerDown(event: PointerEvent<SVGSVGElement>) {
    if (event.button !== 0) return;
    const node = (event.target as Element).closest("[data-node]");
    const id = node?.getAttribute("data-node");
    if (!id || !isElementId(id)) return;
    const point = toSvg(event.currentTarget, event.clientX, event.clientY);
    const position = positions[id];
    dragRef.current = { id, dx: point.x - position.x, dy: point.y - position.y };
    event.currentTarget.setPointerCapture(event.pointerId);
    setDragging(true);
    setSelected(id);
  }

  function onPointerMove(event: PointerEvent<SVGSVGElement>) {
    const drag = dragRef.current;
    if (!drag) return;
    const point = toSvg(event.currentTarget, event.clientX, event.clientY);
    const { w, h } = nodeSize(drag.id);
    const x = Math.round(clamp(point.x - drag.dx, 0, NETWORK_W - w));
    const y = Math.round(clamp(point.y - drag.dy, 0, NETWORK_H - h));
    setPositions((current) => {
      const previous = current[drag.id];
      if (previous.x === x && previous.y === y) return current;
      return { ...current, [drag.id]: { x, y } };
    });
  }

  function onValue(key: ValueKey, value: string) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  return (
    <figure className="mock">
      <figcaption className="mock-banner">Sample interface. Not the product, and not a calculation.</figcaption>
      <div className="mock-titlebar">
        <span>Sample network</span>
        <span className="mock-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
      </div>
      <div className="mock-ribbon" role="tablist" aria-label="Workspace">
        {tabOrder.map((item) => (
          <button
            key={item}
            id={`sidlab-tab-${item}`}
            type="button"
            role="tab"
            aria-selected={tab === item}
            aria-controls={`sidlab-panel-${item}`}
            className={tab === item ? "is-on" : undefined}
            onClick={() => setTab(item)}
          >
            {tabLabel[item]}
          </button>
        ))}
      </div>
      <div className="mock-body" id={`sidlab-panel-${tab}`} role="tabpanel" aria-labelledby={`sidlab-tab-${tab}`}>
        {tab === "network" ? (
          <>
            <div className="mock-canvas">
              <NetworkSvg
                positions={positions}
                selected={selected}
                interactive
                dragging={dragging}
                onSelect={setSelected}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={endDrag}
              />
            </div>
            <PropertyList id={selected} values={values} onChange={onValue} />
          </>
        ) : null}
        {tab === "plot" ? (
          <div className="mock-plot">
            <PlotSvg />
            <p>Sample axes. Model curve and measurement points.</p>
          </div>
        ) : null}
        {tab === "acquisition" ? (
          <div className="mock-acq">
            <p>Sample sequence. No instrument is attached.</p>
            <ol>
              {stages.map((item, index) => (
                <li key={item.id} className={index === stageIndex ? "is-current" : undefined}>
                  {item.label}
                </li>
              ))}
            </ol>
            <div className="progress" aria-hidden="true">
              <span style={{ width: `${stage.progress}%` }} />
            </div>
            <p aria-live="polite">
              {stage.label}. Sample progress {stage.progress}%.
            </p>
            <button type="button" onClick={() => setStageIndex((index) => (index + 1) % stages.length)}>
              Acquire
            </button>
          </div>
        ) : null}
        {tab === "report" ? (
          <div className="mock-report">
            <ReportPage positions={positions} values={values} />
          </div>
        ) : null}
      </div>
      <div className="mock-status">
        <span>{tab === "network" ? meta[selected].name : tabLabel[tab]}</span>
        <span>{tab === "network" ? "Drag a node" : "Sample data"}</span>
      </div>
    </figure>
  );
}

export function SidlabStills() {
  return (
    <div className="stills">
      <figure className="still">
        <figcaption>Network</figcaption>
        <NetworkSvg positions={defaultPositions} selected="chamber" />
      </figure>
      <figure className="still">
        <figcaption>Plot</figcaption>
        <PlotSvg />
      </figure>
      <figure className="still">
        <figcaption>Report</figcaption>
        <ReportPage positions={defaultPositions} values={defaultValues} />
      </figure>
    </div>
  );
}
