import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

// CSS-built phone. The screen is a real mini UI but decorative, so the frame carries one aria-label.
export function Phone({ label, className, children }: { label: string; className?: string; children: ReactNode }) {
  return (
    <div className={cn("phone", className)} role="img" aria-label={label}>
      <div className="screen" aria-hidden="true">
        <div className="sb">
          <span>9:41</span>
          <span className="sig">
            <i />
            <i />
          </span>
        </div>
        {children}
      </div>
    </div>
  );
}
