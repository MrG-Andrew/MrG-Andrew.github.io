import { useState } from "react";
import { PhoneFrame } from "./PhoneFrame";

type Stock = { id: string; name: string; price: number; qty: number };
type BasketLine = { id: string; name: string; price: number; qty: number };

const seed: Stock[] = [
  { id: "para", name: "Paracetamol 500", price: 12, qty: 24 },
  { id: "amox", name: "Amoxicillin 500", price: 28.5, qty: 6 },
  { id: "ors", name: "ORS sachets", price: 8, qty: 18 },
  { id: "vitc", name: "Vitamin C", price: 18, qty: 4 },
];

const stockShot: Stock[] = [
  { id: "para", name: "Paracetamol 500", price: 12, qty: 24 },
  { id: "amox", name: "Amoxicillin 500", price: 28.5, qty: 3 },
  { id: "ors", name: "ORS sachets", price: 8, qty: 18 },
  { id: "vitc", name: "Vitamin C", price: 18, qty: 4 },
];

const basketShot: BasketLine[] = [
  { id: "para", name: "Paracetamol 500", price: 12, qty: 2 },
  { id: "vitc", name: "Vitamin C", price: 18, qty: 1 },
];

function egp(amount: number) {
  return `${amount.toFixed(2)} EGP`;
}

function StockList({ rows, onPick }: { rows: Stock[]; onPick?: (id: string) => void }) {
  return (
    <ul className="lines">
      {rows.map((row) => {
        const low = row.qty > 0 && row.qty <= 5;
        const qty = row.qty === 0 ? "Out" : low ? `${row.qty} Low` : String(row.qty);
        const body = (
          <>
            <span className="name">{row.name}</span>
            <span className={low || row.qty === 0 ? "qty is-low" : "qty"}>{qty}</span>
            <span className="money" dir="ltr">
              {egp(row.price)}
            </span>
          </>
        );
        return (
          <li key={row.id}>
            {onPick ? (
              <button type="button" className="line" disabled={row.qty === 0} onClick={() => onPick(row.id)}>
                {body}
              </button>
            ) : (
              <div className="line">{body}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

function BasketList({ lines, announce = false }: { lines: BasketLine[]; announce?: boolean }) {
  const total = lines.reduce((sum, line) => sum + line.price * line.qty, 0);
  return (
    <>
      <ul className="lines">
        {lines.map((line) => (
          <li key={line.id}>
            <div className="line">
              <span className="name">
                {line.name} × {line.qty}
              </span>
              <span className="money" dir="ltr">
                {egp(line.price * line.qty)}
              </span>
            </div>
          </li>
        ))}
      </ul>
      <p className="total-row" aria-live={announce ? "polite" : undefined}>
        <span>Total</span>
        <span className="money" dir="ltr">
          {egp(total)}
        </span>
      </p>
    </>
  );
}

export function PharmacyDemo() {
  const [stock, setStock] = useState<Stock[]>(seed);
  const [basket, setBasket] = useState<BasketLine[]>([]);

  function add(id: string) {
    const item = stock.find((row) => row.id === id);
    if (!item || item.qty <= 0) return;
    setStock((rows) => rows.map((row) => (row.id === id ? { ...row, qty: row.qty - 1 } : row)));
    setBasket((rows) => {
      const found = rows.find((row) => row.id === id);
      if (!found) return [...rows, { id: item.id, name: item.name, price: item.price, qty: 1 }];
      return rows.map((row) => (row.id === id ? { ...row, qty: row.qty + 1 } : row));
    });
  }

  return (
    <div className="demo-stage">
      <div className="live-col">
        <PhoneFrame live label="Counter">
          <p className="hint">Tap a row to add one.</p>
          <StockList rows={stock} onPick={add} />
          <p className="phone-label">Basket</p>
          {basket.length === 0 ? (
            <p className="quiet">Nothing in the basket yet.</p>
          ) : (
            <BasketList lines={basket} announce />
          )}
        </PhoneFrame>
      </div>
      <div className="shots">
        <PhoneFrame label="Basket">
          <BasketList lines={basketShot} />
        </PhoneFrame>
        <PhoneFrame label="Stock">
          <StockList rows={stockShot} />
        </PhoneFrame>
      </div>
    </div>
  );
}
