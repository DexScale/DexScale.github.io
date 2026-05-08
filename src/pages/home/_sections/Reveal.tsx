import type { PropsWithChildren } from "react";
import { useReveal } from "@/hooks/use-reveal";

interface RevealProps extends PropsWithChildren {
  className?: string;
}

export const Reveal = ({ children, className = "" }: RevealProps) => {
  const ref = useReveal<HTMLDivElement>();

  return (
    <div ref={ref} className={`home-reveal ${className}`}>
      {children}
    </div>
  );
};
