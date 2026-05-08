import { useCounter } from "@/hooks/use-counter";
import { Reveal } from "./Reveal";

interface IntroSectionProps {
  t: (key: string) => string;
}

const introStats = [
  { target: 10000, suffix: "+", label: "Trajectories" },
  { target: 100, suffix: "+", label: "Robots" },
  { target: 100, suffix: "+", label: "Scenarios" },
  { target: 5, suffix: "", label: "Domains" },
];

const IntroCounter = ({ target, suffix, label }: (typeof introStats)[number]) => {
  const { ref, displayValue } = useCounter({ target, suffix });

  return (
    <div className="p-6 rounded-2xl bg-(--hm-bg) border border-(--hm-line)">
      <div ref={ref} className="font-display text-4xl font-bold text-gradient">
        {displayValue}
      </div>
      <div className="mt-2 text-sm text-muted-foreground">{label}</div>
    </div>
  );
};

export const IntroSection = ({ t }: IntroSectionProps) => {
  return (
    <section
      id="dataset"
      className="scroll-mt-20 bg-(--hm-bg) px-6 py-24 max-[900px]:px-5 max-[900px]:py-16"
    >
      <Reveal className="mx-auto max-w-6xl">
        <div className="max-w-4xl mx-auto space-y-8 text-lg leading-relaxed text-(--hm-muted)">
          <div className="space-y-4 text-base leading-[1.8] text-(--hm-muted)">
            <p>{t("intro.p1")}</p>
            <p>{t("intro.p2")}</p>
            <p>{t("intro.p3")}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12">
            {introStats.map((stat) => (
              <IntroCounter key={stat.label} {...stat} />
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
};
