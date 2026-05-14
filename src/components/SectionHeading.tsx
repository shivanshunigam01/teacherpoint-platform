import type { ReactNode } from "react";

export function SectionHeading({ eyebrow, title, subtitle, action }: { eyebrow?: string; title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="flex items-end justify-between gap-4 mb-8">
      <div>
        {eyebrow && <div className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">{eyebrow}</div>}
        <h2 className="font-display font-bold text-2xl md:text-3xl">{title}</h2>
        {subtitle && <p className="text-muted-foreground mt-2 max-w-2xl">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
