import { useState } from "react";
import hand1 from "../assets/L20.png";
import hand2 from "../assets/L6.png";
import { Reveal } from "./Reveal";

interface DexterousHandSectionProps {
  t: (key: string) => string;
}

interface BasicSpecRow {
  rowKey: string;
  labelKey: string;
  valueKey: string;
}

interface ForceSpecRow {
  labelKey: string;
  value: string;
  unit: string;
}

interface HandProduct {
  id: string;
  modelKey: string;
  subtitleKey: string;
  dof: number;
  image: string;
  imageAltKey: string;
  accentColor: string;
  basicSpecs: BasicSpecRow[];
  forceSpecs: ForceSpecRow[];
}

const products: HandProduct[] = [
  {
    id: "l20",
    modelKey: "hand.l20.model",
    subtitleKey: "hand.l20.subtitle",
    dof: 16,
    image: hand1,
    imageAltKey: "hand.l20.alt",
    accentColor: "#22d3ee",
    basicSpecs: [
      { rowKey: "dof", labelKey: "hand.label.dof", valueKey: "hand.val.l20.dof" },
      { rowKey: "joints", labelKey: "hand.label.joints", valueKey: "hand.val.l20.joints" },
      {
        rowKey: "transmission",
        labelKey: "hand.label.transmission",
        valueKey: "hand.val.linkage",
      },
      { rowKey: "control", labelKey: "hand.label.control", valueKey: "hand.val.can_rs485" },
      { rowKey: "comm", labelKey: "hand.label.comm_freq", valueKey: "hand.val.l20.comm" },
      { rowKey: "weight", labelKey: "hand.label.weight", valueKey: "hand.val.l20.weight" },
      { rowKey: "load", labelKey: "hand.label.max_load", valueKey: "hand.val.l20.load" },
      { rowKey: "voltage", labelKey: "hand.label.voltage", valueKey: "hand.val.l20.voltage" },
      {
        rowKey: "static_i",
        labelKey: "hand.label.static_current",
        valueKey: "hand.val.l20.static_i",
      },
      { rowKey: "avg_i", labelKey: "hand.label.avg_current", valueKey: "hand.val.l20.avg_i" },
      { rowKey: "max_i", labelKey: "hand.label.max_current", valueKey: "hand.val.l20.max_i" },
      {
        rowKey: "repeat",
        labelKey: "hand.label.repeatability",
        valueKey: "hand.val.l20.repeat",
      },
      { rowKey: "open", labelKey: "hand.label.open_time", valueKey: "hand.val.l20.open" },
    ],
    forceSpecs: [
      { labelKey: "hand.force.thumb", value: "18", unit: "N" },
      { labelKey: "hand.force.four", value: "20", unit: "N" },
      { labelKey: "hand.force.five", value: "100", unit: "N" },
    ],
  },
  {
    id: "l6",
    modelKey: "hand.l6.model",
    subtitleKey: "hand.l6.subtitle",
    dof: 6,
    image: hand2,
    imageAltKey: "hand.l6.alt",
    accentColor: "#8b5cf6",
    basicSpecs: [
      { rowKey: "dof", labelKey: "hand.label.dof", valueKey: "hand.val.l6.dof" },
      { rowKey: "joints", labelKey: "hand.label.joints", valueKey: "hand.val.l6.joints" },
      {
        rowKey: "transmission",
        labelKey: "hand.label.transmission",
        valueKey: "hand.val.linkage",
      },
      { rowKey: "control", labelKey: "hand.label.control", valueKey: "hand.val.can_rs485" },
      { rowKey: "weight", labelKey: "hand.label.weight", valueKey: "hand.val.l6.weight" },
      { rowKey: "load", labelKey: "hand.label.max_load", valueKey: "hand.val.l6.load" },
      { rowKey: "voltage", labelKey: "hand.label.voltage", valueKey: "hand.val.l6.voltage" },
      {
        rowKey: "static_i",
        labelKey: "hand.label.static_current",
        valueKey: "hand.val.l6.static_i",
      },
      { rowKey: "avg_i", labelKey: "hand.label.avg_current", valueKey: "hand.val.l6.avg_i" },
      { rowKey: "max_i", labelKey: "hand.label.max_current", valueKey: "hand.val.l6.max_i" },
      {
        rowKey: "repeat",
        labelKey: "hand.label.repeatability",
        valueKey: "hand.val.l6.repeat",
      },
    ],
    forceSpecs: [
      { labelKey: "hand.force.thumb", value: "10", unit: "N" },
      { labelKey: "hand.force.four", value: "8", unit: "N" },
      { labelKey: "hand.force.five", value: "50", unit: "N" },
    ],
  },
];

interface ProductCardProps {
  product: HandProduct;
  t: (key: string) => string;
}

const ProductCard = ({ product, t }: ProductCardProps) => {
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  return (
    <div className="flex flex-col rounded-3xl border border-(--hm-line) bg-(--hm-panel) overflow-hidden">
      <div className="relative flex items-center justify-center bg-[#080a10] min-h-[320px] py-8 px-12 overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(50% 60% at 50% 60%, ${product.accentColor}, transparent)`,
          }}
        />
        <div
          className="absolute top-4 right-4 z-10 flex flex-col items-center rounded-2xl border px-3 py-2"
          style={{
            borderColor: `${product.accentColor}40`,
            background: `${product.accentColor}12`,
          }}
        >
          <span
            className="text-2xl font-extrabold leading-none tracking-tight"
            style={{ color: product.accentColor }}
          >
            {product.dof}
          </span>
          <span className="text-[10px] font-medium text-(--hm-muted) uppercase tracking-widest mt-0.5">
            {t("hand.dof_badge")}
          </span>
        </div>

        <img
          src={product.image}
          alt={t(product.imageAltKey)}
          loading="lazy"
          className="relative z-1 h-64 w-auto object-contain drop-shadow-2xl"
        />
      </div>

      <div className="px-7 pt-6 pb-4 border-b border-(--hm-line)">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs text-(--hm-muted) uppercase tracking-widest mb-1">
              {t(product.subtitleKey)}
            </p>
            <h3 className="text-xl font-bold text-(--hm-text)">{t(product.modelKey)}</h3>
          </div>
          <div
            className="shrink-0 mt-1 h-2 w-2 rounded-full animate-pulse"
            style={{ background: product.accentColor }}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 divide-x divide-(--hm-line) border-b border-(--hm-line)">
        {product.forceSpecs.map((spec) => (
          <div key={spec.labelKey} className="flex flex-col items-center py-4 px-2 text-center">
            <span
              className="text-2xl font-extrabold tracking-tight leading-none"
              style={{ color: product.accentColor }}
            >
              {spec.value}
              <span className="text-sm font-semibold ml-0.5">{spec.unit}</span>
            </span>
            <span className="mt-1.5 text-[10px] text-(--hm-muted) leading-[1.4]">
              {t(spec.labelKey)}
            </span>
          </div>
        ))}
      </div>

      <div className="flex-1 px-7 py-5">
        <p className="text-[11px] text-(--hm-muted) uppercase tracking-widest mb-3 font-medium">
          {t("hand.basic_heading")}
        </p>
        <table className="w-full text-sm">
          <tbody>
            {product.basicSpecs.map((spec) => {
              const label = t(spec.labelKey);
              const isHovered = hoveredRow === spec.rowKey;
              return (
                <tr
                  key={spec.rowKey}
                  className="group border-b border-(--hm-line) last:border-0 cursor-default transition-colors duration-150"
                  style={{
                    background: isHovered ? `${product.accentColor}08` : "transparent",
                  }}
                  onMouseEnter={() => setHoveredRow(spec.rowKey)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  <td className="py-2.5 pr-4 text-(--hm-muted) w-1/2 font-normal">{label}</td>
                  <td
                    className="py-2.5 font-medium text-right tabular-nums transition-colors duration-150"
                    style={{
                      color: isHovered ? product.accentColor : "var(--hm-text)",
                    }}
                  >
                    {t(spec.valueKey)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const DexterousHandSection = ({ t }: DexterousHandSectionProps) => {
  return (
    <section
      id="dexterous-hand"
      className="scroll-mt-20 bg-(--hm-bg) px-6 py-24 max-[900px]:px-5 max-[900px]:py-16"
    >
      <Reveal className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col items-start gap-3">
          <h2 className="text-3xl md:text-4xl font-bold text-(--hm-text) leading-tight">
            {t("hand.title")}
          </h2>
          <p className="max-w-2xl text-sm leading-[1.8] text-(--hm-muted)">{t("hand.desc")}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} t={t} />
          ))}
        </div>
      </Reveal>
    </section>
  );
};
