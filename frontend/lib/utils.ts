import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { CSSProperties } from "react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const usd = (n: number) => `$${n}`;

// --i staggers the .hi / .rv entrance animations in glimzi.css
export const stagger = (i: number) => ({ "--i": i }) as CSSProperties;
