import type { CSSProperties } from "react";
import type { LucideIcon } from "lucide-react";
import { ArmchairIcon, Camera, CircuitBoard, Weight, Zap } from "lucide-react";
import machineImg from "../assets/remoteOperation4.png";
import { Reveal } from "./Reveal";

interface WholeMachineSectionProps {
  t: (key: string) => string;
}

interface Kpi {
  label: string;
  value: string;
  unit?: string;
}

interface SpecRow {
  label: string;
  value: string;
}

interface SpecGroup {
  id: string;
  title: string;
  icon: LucideIcon;
  borderAccent: string;
  rows: SpecRow[];
}

const keyMetrics: Kpi[] = [
  { label: "整机自由度（不含末端）", value: "14", unit: "DoF" },
  { label: "整机重量（带外壳）", value: "≈45", unit: "kg" },
  { label: "单臂臂展", value: "580", unit: "mm" },
  { label: "单臂最大负载", value: "≈3", unit: "kg" },
];

const specGroups: SpecGroup[] = [
  {
    id: "mech",
    title: "机械与精度",
    icon: ArmchairIcon,
    borderAccent: "border-l-[var(--wm-accent-a)]",
    rows: [
      { label: "整机自由度（不含末端执行器）", value: "14 DoF" },
      { label: "单臂自由度", value: "7 DoF" },
      { label: "整机重量（带外壳）", value: "约 45 kg" },
      {
        label: "手臂长（肩部重心到腕部中心）",
        value: "580 mm",
      },
      { label: "最大负载（单臂）", value: "约 3 kg" },
      { label: "重复定位精度（单臂）", value: "0.165 mm" },
    ],
  },
  {
    id: "vision",
    title: "视觉与末端",
    icon: Camera,
    borderAccent: "border-l-[var(--wm-accent-b)]",
    rows: [
      { label: "头部视觉系统", value: "双目深度相机 × 1" },
      { label: "腕部视觉系统", value: "双目深度相机 × 2" },
      { label: "末端配置", value: "Linker Hand 系列" },
    ],
  },
  {
    id: "io",
    title: "接口与控制",
    icon: CircuitBoard,
    borderAccent: "border-l-[var(--wm-accent-c)]",
    rows: [
      { label: "扩展接口", value: "USB、RJ45、HDMI" },
      { label: "按钮配置", value: "急停按钮" },
      { label: "状态显示", value: "状态指示灯" },
      { label: "通信方式", value: "CAN" },
    ],
  },
  {
    id: "power",
    title: "电气与环境",
    icon: Zap,
    borderAccent: "border-l-[var(--wm-accent-d)]",
    rows: [
      { label: "输入电压", value: "AC 220V" },
      { label: "额定功率（3 kg 负载）", value: "650 W" },
      { label: "工作温度", value: "0–50 ℃" },
    ],
  },
];

export const WholeMachineSection = (_props: WholeMachineSectionProps) => {
  return (
    <section
      id="whole-machine"
      className="whole-machine-section scroll-mt-20 relative bg-(--hm-bg-2) px-0 py-24 max-[900px]:py-16"
      style={
        {
          "--wm-accent-a": "#38bdf8",
          "--wm-accent-b": "#a78bfa",
          "--wm-accent-c": "#34d399",
          "--wm-accent-d": "#fb7185",
        } as CSSProperties
      }
    >
      <div className="mx-auto max-w-7xl px-6 max-[900px]:px-5">
        <Reveal>
          <header className="mx-auto max-w-3xl text-center mb-14 max-[900px]:mb-10">
            <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight text-(--hm-text)">
              人形机器人规格
            </h2>
            <p className="mt-4 text-sm leading-[1.85] text-(--hm-muted)">
              人形上身与移动底盘一体化设计，双臂七自由度配合多路深度视觉与 Linker Hand
              末端，面向数据采集与遥操作部署的一体化硬件平台。
            </p>
          </header>

          {/* Cinematic product band — distinct from split layout & dual cards */}
          <div className="relative mb-20 rounded-[20px] border border-(--hm-line) bg-[#06080d] shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset] overflow-hidden max-[900px]:mb-10 md:mb-24">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(56,189,248,0.12),transparent_65%)]" />
            <div className="pointer-events-none absolute inset-0 opacity-[0.07] bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.5)_2px,rgba(255,255,255,0.5)_3px)]" />

            <div className="relative flex min-h-[min(72vw,520px)] items-stretch justify-center px-4 pt-10 pb-28 max-[900px]:min-h-[340px] max-[900px]:pb-24">
              <img
                src={machineImg}
                alt="人形机器人整机 — 上身双臂与移动底盘"
                loading="lazy"
                className="relative z-1 max-h-[min(68vh,560px)] w-auto max-w-full object-contain object-bottom drop-shadow-[0_24px_80px_rgba(0,0,0,0.55)]"
              />
            </div>

            {/* KPI rail overlapping image bottom
            <div className="absolute bottom-0 left-0 right-0 z-2 translate-y-1/2 px-4 max-[900px]:static max-[900px]:translate-y-0 max-[900px]:px-3 max-[900px]:pb-6">
              <div className="mx-auto grid max-w-5xl grid-cols-2 gap-px rounded-2xl border border-(--hm-line) bg-(--hm-line) shadow-[0_20px_50px_-24px_rgba(0,0,0,0.8)] md:grid-cols-4">
                {keyMetrics.map((k) => (
                  <div
                    key={k.label}
                    className="flex flex-col items-center justify-center bg-[#0c1018] px-4 py-5 text-center max-[900px]:py-4"
                  >
                    <div className="flex items-baseline justify-center gap-0.5">
                      <span className="text-2xl font-black tabular-nums tracking-tight text-(--hm-text) md:text-3xl">
                        {k.value}
                      </span>
                      {k.unit ? (
                        <span className="text-sm font-bold text-(--hm-cyan)">{k.unit}</span>
                      ) : null}
                    </div>
                    <span className="mt-1.5 max-w-38 text-[10px] font-medium leading-snug text-(--hm-muted) md:max-w-none md:text-[11px]">
                      {k.label}
                    </span>
                  </div>
                ))}
              </div>
            </div> */}
          </div>

          {/* Bento grid — grouped specs */}
          <div className="mt-16 grid gap-4 md:grid-cols-2 max-[900px]:mt-6">
            {specGroups.map((group) => {
              const Icon = group.icon;
              return (
                <article
                  key={group.id}
                  className={`rounded-2xl border border-(--hm-line) bg-(--hm-panel)/80 ${group.borderAccent} border-l-4 pl-5 pr-5 py-5 backdrop-blur-sm`}
                >
                  <div className="mb-4 flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/5 text-(--hm-text) ring-1 ring-white/10">
                      <Icon className="h-4 w-4 opacity-90" aria-hidden />
                    </span>
                    <h3 className="text-sm font-bold tracking-wide text-(--hm-text)">
                      {group.title}
                    </h3>
                  </div>
                  <dl className="space-y-0 divide-y divide-(--hm-line)">
                    {group.rows.map((row) => (
                      <div
                        key={row.label}
                        className="flex flex-col gap-0.5 py-3 first:pt-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                      >
                        <dt className="text-[13px] text-(--hm-muted)">{row.label}</dt>
                        <dd className="text-right text-[13px] font-semibold tabular-nums text-(--hm-text) sm:max-w-[55%] sm:text-left">
                          {row.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </article>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
};
