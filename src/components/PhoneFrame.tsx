import type { ReactNode } from "react";

export function PhoneFrame({
  label,
  dir = "ltr",
  live = false,
  children,
}: {
  label: string;
  dir?: "ltr" | "rtl";
  live?: boolean;
  children: ReactNode;
}) {
  return (
    <figure className={live ? "phone is-live" : "phone"}>
      <figcaption className="phone-caption">{label}</figcaption>
      <div className="phone-bar" aria-hidden="true">
        <span>Sample</span>
        <span className="mock-dots">
          <i />
          <i />
          <i />
        </span>
      </div>
      <div className="phone-screen" dir={dir}>
        {children}
      </div>
    </figure>
  );
}
