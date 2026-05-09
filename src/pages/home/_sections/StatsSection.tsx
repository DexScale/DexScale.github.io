import type { CSSProperties } from "react";
import { useCounter } from "@/hooks/use-counter";
import { Reveal } from "./Reveal";
import videoSrc from "../assets/linkerbot.mp4";
import videoSrc2 from "../assets/l6_torch.webm";

interface StatsSectionProps {
  t: (key: string) => string;
}

const topStats = [
  { label: "COLOR", key: "color" },
  { label: "DEPTH", key: "depth" },
  { label: "TACTILE", key: "tactile" },
  { label: "LANGUAGE", key: "language" },
];

const stats = [
  { target: 10, suffix: "W+", label: "TRAJECTORIES" },
  { target: 300, suffix: "+", label: "TASKS" },
  { target: 10, suffix: "+", label: "SCENARIOS" },
];

const distributions = [
  {
    title: "Scenarios Distribution",
    rows: [
      { name: "Kitchen & Cooking", width: "92%", value: "23%" },
      { name: "Music & Toys", width: "76%", value: "22%" },
      { name: "Office & Study", width: "52%", value: "12%" },
      { name: "Personal Care", width: "48%", value: "11%" },
      { name: "Living Room", width: "43%", value: "10%" },
      { name: "Others", width: "76%", value: "22%" },
    ],
  },
  {
    title: "Atomic-Skills Distribution",
    rows: [
      { name: "Pick & Place", width: "88%", value: "28%" },
      { name: "Insert", width: "64%", value: "20%" },
      { name: "Open / Close & Press", width: "42%", value: "18%" },
      { name: "Tool Use", width: "36%", value: "7%" },
      { name: "Pour & apply", width: "36%", value: "7%" },
      { name: "Others", width: "76%", value: "20%" },
    ],
  },
  {
    title: "Object Categories",
    rows: [
      { name: "Kitchenware", width: "72%", value: "27%" },
      { name: "Toys, Games & Music", width: "60%", value: "18%" },
      { name: "Office Items", width: "52%", value: "12%" },
      { name: "Electronics & Travel", width: "52%", value: "12%" },
      { name: "Clothing & Fabric", width: "48%", value: "12%" },
      { name: "Others", width: "76%", value: "19%" },
    ],
  },
  {
    title: "Episode Duration",
    rows: [
      { name: "< 30s", width: "76%", value: "38%" },
      { name: "30s–1min", width: "58%", value: "36%" },
      { name: "1–3min", width: "48%", value: "26%" },
    ],
  },
];

const StatCard = ({ target, suffix, label }: (typeof stats)[number]) => {
  const { ref, displayValue } = useCounter({ target, suffix });

  return (
    <div className="rounded-[18px] border border-[var(--hm-line)] bg-white/[0.03] p-7 text-center">
      <div ref={ref} className="home-gradient-text text-[44px] font-extrabold">
        {displayValue}
      </div>
      <div className="mt-1.5 text-[13px] tracking-[0.08em] text-[var(--hm-muted)]">{label}</div>
    </div>
  );
};

const TextCard = ({ label }: { label: string }) => {
  return (
    <div className="rounded-[18px] border border-[var(--hm-line)] bg-white/[0.03] p-4 text-center">
      <div className="home-gradient-text text-[38px] font-extrabold">{label}</div>
    </div>
  );
};

export const StatsSection = ({ t }: StatsSectionProps) => {
  return (
    <section
      id="stats"
      className="scroll-mt-20 bg-gradient-to-b from-[var(--hm-bg)] to-[var(--hm-bg-2)] px-6 py-24 max-[900px]:px-5 max-[900px]:py-16"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-14 text-center">
          <h2 className="mb-3 text-[clamp(28px,3.4vw,44px)] font-extrabold tracking-[-0.01em]">
            {t("stats.title")}
          </h2>
          <p className="m-0 text-base text-[var(--hm-muted)]">{t("stats.sub")}</p>
        </Reveal>

        <Reveal className="mb-14 rounded-2xl overflow-hidden">
          <video
            src={videoSrc}
            className="w-full h-full object-cover"
            controls
            autoPlay
            muted
            loop
            preload="auto"
            disablePictureInPicture
          />
        </Reveal>

        <div className="grid grid-cols-2 gap-6 max-[900px]:grid-cols-1">
          {distributions.map((distribution) => (
            <Reveal
              key={distribution.title}
              className="rounded-[18px] border border-[var(--hm-line)] bg-white/[0.03] p-6"
            >
              <h4 className="mb-4 text-base font-semibold text-[var(--hm-text)]">
                {distribution.title}
              </h4>
              <div className="space-y-3">
                {distribution.rows.map((row) => (
                  <div
                    key={row.name}
                    className="flex items-center gap-3 text-[13px] text-[var(--hm-muted)]"
                  >
                    <div className="w-[130px] shrink-0">{row.name}</div>
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
                      <div
                        className="home-bar-fill home-gradient-bg h-full rounded-full"
                        style={{ "--w": row.width } as CSSProperties}
                      />
                    </div>
                    <div>{row.value}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14 grid grid-cols-4 gap-6">
          {topStats.map((stat) => (
            <TextCard key={stat.key} label={stat.label} />
          ))}
        </Reveal>

        <Reveal className="mt-14">
          <div className="grid grid-cols-8 gap-6">
            {/* 左侧视频  80%*/}
            <div className="col-span-8 md:col-span-6 rounded-2xl overflow-hidden">
              <video
                src={videoSrc2}
                className="w-full h-full object-cover"
                controls
                autoPlay
                muted
                loop
                preload="auto"
                disablePictureInPicture
              />
            </div>
            {/* 右侧三个 card：顶底贴边，中间 flex-1 自适应（与左侧视频行等高时生效） */}
            <div className="col-span-8 md:col-span-2 flex h-full min-h-0 flex-col md:justify-between">
              {stats.map((stat) => (
                <StatCard key={stat.label} {...stat} />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
