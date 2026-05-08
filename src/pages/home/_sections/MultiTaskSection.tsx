import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

import taskThread from "../assets/task2.png";
import taskTactile from "../assets/task3.png";
import taskIndustrial from "../assets/task1.jpg";
import taskMulti from "../assets/task1.jpg";
import taskTool from "../assets/task1.jpg";

const taskItems = [
  { titleKey: "multi.task.thread", img: taskThread },
  { titleKey: "multi.task.tactile", img: taskTactile },
  { titleKey: "multi.task.industrial", img: taskIndustrial },
  { titleKey: "multi.task.multi", img: taskMulti },
  { titleKey: "multi.task.tool", img: taskTool },
] as const;

type MultTaskProps = {
  t: (key: string) => string;
};

export const MultiTasksSection = ({ t }: MultTaskProps) => {
  const [taskIdx, setTaskIdx] = useState(0);
  const cur = taskItems[taskIdx];
  const title = t(cur.titleKey);

  return (
    <section id="multi-tasks" className="scroll-mt-20 py-24 px-6 bg-[#05060a]">
      <div className="max-w-7xl mx-auto text-white">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-(--hm-text) leading-tight">
              {t("multi.title")}
            </h2>
            <p className="max-w-2xl text-sm leading-[1.8] text-(--hm-muted)">{t("multi.sub")}</p>
          </div>
        </div>

        <div className="relative rounded-2xl overflow-hidden border border-gray-800 bg-[#0a0b10]">
          <img src={cur.img} alt={title} loading="lazy" className="w-full h-[60vh] object-cover" />
          <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="text-xs text-cyan-400 uppercase tracking-widest mb-2">
                {t("multi.task_word")} {taskIdx + 1} / {taskItems.length}
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white">{title}</h3>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setTaskIdx((i) => (i - 1 + taskItems.length) % taskItems.length)}
                className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition text-white border border-white/10"
                aria-label={t("multi.prev")}
              >
                <ChevronLeft className="w-5 h-5" aria-hidden />
              </button>
              <button
                type="button"
                onClick={() => setTaskIdx((i) => (i + 1) % taskItems.length)}
                className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition text-white border border-white/10"
                aria-label={t("multi.next")}
              >
                <ChevronRight className="w-5 h-5" aria-hidden />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-4">
          {taskItems.map((task, i) => {
            const taskTitle = t(task.titleKey);
            return (
              <button
                key={task.titleKey}
                type="button"
                onClick={() => setTaskIdx(i)}
                className={`relative aspect-video rounded-xl overflow-hidden border transition-all duration-300 ${i === taskIdx ? "border-cyan-400 ring-2 ring-cyan-400/20" : "border-gray-800 opacity-50 hover:opacity-80"}`}
              >
                <img
                  src={task.img}
                  alt={taskTitle}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent flex items-end p-3">
                  <span className="text-xs font-medium text-white/90">{taskTitle}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
