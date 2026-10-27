import { cn } from "@/lib/utils";

// Icons and the logo are <symbol>s in public/sprite.svg (Lucide grammar, 24px viewBox).
export function Icon({ name, size, className }: { name: string; size?: "sm" | "lg"; className?: string }) {
  return (
    <svg className={cn("i", size && `i-${size}`, className)} aria-hidden="true">
      <use href={`/sprite.svg#i-${name}`} />
    </svg>
  );
}

export function Logo({ className = "brand-mark" }: { className?: string }) {
  return (
    <svg className={className} aria-hidden="true">
      <use href="/sprite.svg#logo" />
    </svg>
  );
}
