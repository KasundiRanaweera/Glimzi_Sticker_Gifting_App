"use client";

import { useId, useState } from "react";
import { Icon } from "@/components/icons/Icon";
import { cn } from "@/lib/utils";

type Item = { id: string | number; question: string; answer: string };

// Disclosure list in the template's .acc markup; several items can be open at once.
export function Accordion({ items, className }: { items: Item[]; className?: string }) {
  const [open, setOpen] = useState<Item["id"][]>([]);
  const base = useId();
  const toggle = (id: Item["id"]) => setOpen((o) => (o.includes(id) ? o.filter((x) => x !== id) : [...o, id]));

  return (
    <div className={cn("acc", className)}>
      {items.map((item) => {
        const isOpen = open.includes(item.id);
        const q = `${base}-q-${item.id}`;
        const a = `${base}-a-${item.id}`;
        return (
          <div key={item.id} className={cn("acc-item", isOpen && "is-open")}>
            <h3>
              <button className="acc-q" type="button" id={q} aria-expanded={isOpen} aria-controls={a} onClick={() => toggle(item.id)}>
                {item.question}
                <span className="pm" aria-hidden="true">
                  <Icon name="plus" />
                </span>
              </button>
            </h3>
            {/* inert keeps collapsed answers out of the tab order and the accessibility tree */}
            <div className="acc-a" id={a} role="region" aria-labelledby={q} inert={!isOpen}>
              <div>
                <p>{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
