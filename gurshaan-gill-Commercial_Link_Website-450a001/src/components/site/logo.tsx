import Image from "next/image";

import { company } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * "inline" sets the disc mark beside the wordmark for the header bar; "stacked" is the
 * original lockup. Both use the reversed artwork, so they only sit on dark surfaces.
 */
export function Logo({ variant = "inline", className }: { variant?: "inline" | "stacked"; className?: string }) {
  const { mark, wordmark, stacked } = company.logo;

  if (variant === "stacked") {
    return (
      <Image src={stacked} alt={company.name} priority sizes="176px" className={cn("h-auto w-44", className)} />
    );
  }

  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <Image src={mark} alt="" priority sizes="40px" className="size-10 shrink-0" />
      <Image src={wordmark} alt={company.name} priority sizes="150px" className="h-auto w-[150px]" />
    </span>
  );
}
