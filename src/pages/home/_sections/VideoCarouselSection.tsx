import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";

// 场景数据
const scenarioItems = [
  {
    id: "bimanual",
    titleKey: "scenarios.bimanual",
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: "moving",
    titleKey: "scenarios.moving",
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: "tactile",
    titleKey: "scenarios.tactile",
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: "industrial",
    titleKey: "scenarios.industrial",
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: "domestic",
    titleKey: "scenarios.domestic",
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
] as const;

export const VideoCarouselSection = ({ t }: { t: (key: string) => string }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    skipSnaps: false,
    dragFree: false,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const currentItem = scenarioItems[selectedIndex];

  return (
    <section
      id="scenarios"
      className="scroll-mt-20 bg-gradient-to-b from-[var(--hm-bg)] to-[var(--hm-bg-2)] px-6 py-24 max-[900px]:px-5 max-[900px]:py-16"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-(--hm-text) leading-tight mb-4">
            {t("scenarios.title")}
          </h2>
          <p className="max-w-2xl mx-auto text-base leading-[1.8] text-(--hm-muted)">
            {t("scenarios.subtitle")}
          </p>
        </div>

        {/* Video Carousel */}
        <div className="relative">
          {/* Carousel Container */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {scenarioItems.map((item, index) => {
                const isSelected = index === selectedIndex;
                return (
                  <div
                    key={item.id}
                    className="flex-[0_0_85%] md:flex-[0_0_70%] lg:flex-[0_0_60%] min-w-0 pl-4 first:pl-0 transition-all duration-500"
                  >
                    <div
                      className={`relative rounded-2xl overflow-hidden transition-all duration-500 ${
                        isSelected ? "scale-100 opacity-100" : "scale-90 opacity-50"
                      }`}
                    >
                      {/* Video Container */}
                      <div className="relative aspect-video bg-[#0a0b10]">
                        <video
                          src={item.video}
                          className="w-full h-full object-cover"
                          autoPlay={isSelected}
                          muted
                          loop
                          playsInline
                          preload="metadata"
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                        {/* Title on Video */}
                        <div className="absolute top-0 left-0 right-0 p-6">
                          <h3 className="text-xl md:text-2xl font-semibold text-white text-center">
                            {t(item.titleKey)}
                          </h3>
                        </div>

                        {/* Play Indicator (only on selected) */}
                        {isSelected && (
                          <div className="absolute bottom-4 right-4 flex items-center gap-2 text-white/80 text-sm">
                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                            Playing
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-all text-white border border-white/10 z-10"
            aria-label={t("scenarios.prev")}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-all text-white border border-white/10 z-10"
            aria-label={t("scenarios.next")}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Bottom Info */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-xs text-cyan-400 uppercase tracking-widest mb-2">
              {t("scenarios.task_word")} {selectedIndex + 1} / {scenarioItems.length}
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white">
              {t(currentItem?.titleKey || "")}
            </h3>
          </div>
        </div>

        {/* Dot Indicators */}
        <div className="mt-8 flex justify-center gap-3">
          {scenarioItems.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === selectedIndex ? "bg-[#1a5fff] w-8" : "bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
