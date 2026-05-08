import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/pages/home";

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    meta: [
      { title: "Linker Hand — 大规模具身智能数据集" },
      {
        name: "description",
        content:
          "Linker Hand：首个面向具身智能的大规模、企业级、真实任务数据集与生态系统。1M+ 轨迹，100+ 真实场景，覆盖五大领域。",
      },
      { property: "og:title", content: "Linker Hand — Embodied AI Dataset" },
      {
        property: "og:description",
        content: "Large-Scale, Enterprise Quality, Realistic Task Dataset for Embodied AI.",
      },
    ],
  }),
});
