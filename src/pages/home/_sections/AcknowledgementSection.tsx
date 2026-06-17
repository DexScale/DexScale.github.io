import { Quote } from "lucide-react";
import { Reveal } from "./Reveal";

interface AcknowledgementSectionProps {
  t: (key: string) => string;
}

export const AcknowledgementSection = ({ t }: AcknowledgementSectionProps) => {
  const url = t("ack.url");

  return (
    <section
      id="acknowledgement"
      className="scroll-mt-20 bg-(--hm-bg) px-6 py-24 max-[900px]:px-5 max-[900px]:py-16"
    >
      <Reveal className="mx-auto max-w-4xl">
        <div className="relative overflow-hidden rounded-3xl border border-(--hm-line) bg-(--hm-panel) px-10 py-11 max-[900px]:px-6 max-[900px]:py-8">
          {/* Gradient accent bar */}
          <span
            aria-hidden
            className="absolute inset-y-0 left-0 w-1.5"
            style={{ background: "var(--hm-grad)" }}
          />

          <div className="pl-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-(--hm-line) px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-(--hm-cyan)">
              {t("ack.label")}
            </span>

            <h2 className="mt-5 text-3xl md:text-4xl font-bold leading-tight text-(--hm-text)">
              {t("ack.title")}
            </h2>

            <p className="mt-5 text-[15px] leading-[1.9] text-(--hm-muted)">
              {t("ack.intro")}{" "}
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-(--hm-cyan) underline decoration-(--hm-cyan)/40 underline-offset-4 transition-colors hover:decoration-(--hm-cyan)"
              >
                {url}
              </a>{" "}
              {t("ack.connector")}
            </p>

            {/* Citation block */}
            <figure className="mt-7 rounded-2xl border border-(--hm-line) bg-(--hm-bg-2) px-6 py-5">
              <Quote className="h-5 w-5 text-(--hm-cyan)/70" aria-hidden />
              <blockquote className="mt-2 text-base leading-[1.8] text-(--hm-text) italic">
                {t("ack.citation")}
              </blockquote>
            </figure>
          </div>
        </div>
      </Reveal>
    </section>
  );
};
