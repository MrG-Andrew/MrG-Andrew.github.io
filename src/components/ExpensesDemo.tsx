import { useState } from "react";
import { PhoneFrame } from "./PhoneFrame";

type Lang = "en" | "ar";
type LineKey = "rent" | "groceries" | "power" | "other";
type Line = { id: string; key: LineKey; amount: number; suffix?: number };

const budget = 10000;

const text = {
  en: {
    dir: "ltr" as const,
    total: "Total",
    budget: "Budget",
    add: "Add",
    amount: "Amount",
    within: "Within budget",
    warn75: "Over 75% of the budget",
    warn90: "Over 90% of the budget",
    items: { rent: "Rent", groceries: "Groceries", power: "Power", other: "Other" },
  },
  ar: {
    dir: "rtl" as const,
    total: "الإجمالي",
    budget: "الميزانية",
    add: "إضافة",
    amount: "المبلغ",
    within: "ضمن الميزانية",
    warn75: "تجاوز ٧٥٪ من الميزانية",
    warn90: "تجاوز ٩٠٪ من الميزانية",
    items: { rent: "الإيجار", groceries: "البقالة", power: "الكهرباء", other: "أخرى" },
  },
};

const seed: Line[] = [
  { id: "rent", key: "rent", amount: 4500 },
  { id: "groceries", key: "groceries", amount: 1800 },
  { id: "power", key: "power", amount: 900 },
];

const warned: Line[] = [...seed, { id: "other-1", key: "other", amount: 1000 }];

function formatEgp(amount: number, lang: Lang) {
  const number = new Intl.NumberFormat("en-EG", { maximumFractionDigits: 0 }).format(amount);
  return lang === "ar" ? `${number} ج.م` : `${number} EGP`;
}

function lineName(line: Line, lang: Lang) {
  const base = text[lang].items[line.key];
  if (line.suffix && line.suffix > 1) return `${base} ${line.suffix}`;
  return base;
}

function ExpenseScreen({
  lang,
  lines,
  draft,
  onDraft,
  onAdd,
}: {
  lang: Lang;
  lines: Line[];
  draft?: string;
  onDraft?: (value: string) => void;
  onAdd?: () => void;
}) {
  const copy = text[lang];
  const total = lines.reduce((sum, line) => sum + line.amount, 0);
  const ratio = total / budget;
  const warn = ratio >= 0.75;
  const message = ratio >= 0.9 ? copy.warn90 : warn ? copy.warn75 : copy.within;
  const pct = Math.min(100, ratio * 100);

  return (
    <>
      <ul className="lines">
        {lines.map((line) => (
          <li key={line.id}>
            <div className="line">
              <span className="name">{lineName(line, lang)}</span>
              <span className="money" dir="ltr">
                {formatEgp(line.amount, lang)}
              </span>
            </div>
          </li>
        ))}
      </ul>
      <p className="total-row">
        <span>{copy.total}</span>
        <span className="money" dir="ltr">
          {formatEgp(total, lang)}
        </span>
      </p>
      <p className="budget-line">
        <span>{copy.budget}</span>
        <span className="money" dir="ltr">
          {formatEgp(budget, lang)}
        </span>
      </p>
      <div className={warn ? "bar is-warn" : "bar"} aria-hidden="true">
        <span style={{ width: `${pct}%` }} />
      </div>
      <p className={warn ? "warn" : "quiet"} aria-live={onAdd ? "polite" : undefined}>
        {message}
      </p>
      {onAdd ? (
        <form
          className="add-line"
          onSubmit={(event) => {
            event.preventDefault();
            onAdd();
          }}
        >
          <input
            aria-label={copy.amount}
            inputMode="numeric"
            placeholder={copy.amount}
            value={draft ?? ""}
            onChange={(event) => {
              const next = event.target.value;
              if (/^\d{0,7}$/.test(next)) onDraft?.(next);
            }}
          />
          <button type="submit" disabled={!draft || Number(draft) <= 0}>
            {copy.add}
          </button>
        </form>
      ) : null}
    </>
  );
}

export function ExpensesDemo() {
  const [lang, setLang] = useState<Lang>("en");
  const [lines, setLines] = useState<Line[]>(seed);
  const [draft, setDraft] = useState("");

  function addExpense() {
    const amount = Number(draft);
    if (!Number.isFinite(amount) || amount <= 0) return;
    setLines((current) => {
      const suffix = current.filter((line) => line.key === "other").length + 1;
      return [...current, { id: `other-${suffix}`, key: "other", amount, suffix }];
    });
    setDraft("");
  }

  return (
    <div className="demo-stage">
      <div className="live-col">
        <div className="segment" role="group" aria-label="Language">
          <button type="button" className={lang === "en" ? "is-on" : undefined} aria-pressed={lang === "en"} onClick={() => setLang("en")}>
            English
          </button>
          <button type="button" className={lang === "ar" ? "is-on" : undefined} aria-pressed={lang === "ar"} onClick={() => setLang("ar")}>
            العربية
          </button>
        </div>
        <PhoneFrame live label="Ledger" dir={text[lang].dir}>
          <ExpenseScreen lang={lang} lines={lines} draft={draft} onDraft={setDraft} onAdd={addExpense} />
        </PhoneFrame>
      </div>
      <div className="shots">
        <PhoneFrame label="Ledger, Arabic" dir="rtl">
          <ExpenseScreen lang="ar" lines={seed} />
        </PhoneFrame>
        <PhoneFrame label="Budget warning">
          <ExpenseScreen lang="en" lines={warned} />
        </PhoneFrame>
      </div>
    </div>
  );
}
