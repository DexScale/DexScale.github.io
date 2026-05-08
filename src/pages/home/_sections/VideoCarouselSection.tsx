import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Maximize,
  Minimize,
  MoreVertical,
  Pause,
  Play,
  Volume2,
  VolumeX,
} from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import video2 from "../assets/video2.mp4";
import video3 from "../assets/video3.mp4";
import video4 from "../assets/video4.mp4";
import video5 from "../assets/video5.mp4";
import video6 from "../assets/video6.mp4";

const scenarioItems = [
  {
    id: "moving",
    titleKey: "scenarios.moving",
    video: video2,
  },
  {
    id: "tactile",
    titleKey: "scenarios.tactile",
    video: video3,
  },
  {
    id: "industrial",
    titleKey: "scenarios.industrial",
    video: video4,
  },
  {
    id: "domestic",
    titleKey: "scenarios.domestic",
    video: video5,
  },
  {
    id: "multimodal",
    titleKey: "scenarios.domestic",
    video: video6,
  },
] as const;

const formatTime = (seconds: number) => {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
};

interface VideoCarouselSectionProps {
  t: (key: string) => string;
}

export const VideoCarouselSection = ({ t }: VideoCarouselSectionProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    skipSnaps: false,
    dragFree: false,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFs, setIsFs] = useState(false);

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index);
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

  /* Only the centered slide plays; others stay paused (fixes “always first video” bug). */
  useEffect(() => {
    scenarioItems.forEach((_, index) => {
      const el = videoRefs.current[index];
      if (!el) return;
      if (index === selectedIndex) {
        el.loop = true;
        void el.play().catch(() => setIsPlaying(false));
      } else {
        el.pause();
        el.currentTime = 0;
      }
    });
  }, [selectedIndex]);

  useEffect(() => {
    const el = videoRefs.current[selectedIndex];
    if (!el) return;

    const syncTime = () => {
      setCurrentTime(el.currentTime);
      setDuration(Number.isFinite(el.duration) ? el.duration : 0);
    };

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    el.addEventListener("timeupdate", syncTime);
    el.addEventListener("loadedmetadata", syncTime);
    el.addEventListener("durationchange", syncTime);
    el.addEventListener("play", onPlay);
    el.addEventListener("pause", onPause);

    syncTime();
    setIsPlaying(!el.paused);

    return () => {
      el.removeEventListener("timeupdate", syncTime);
      el.removeEventListener("loadedmetadata", syncTime);
      el.removeEventListener("durationchange", syncTime);
      el.removeEventListener("play", onPlay);
      el.removeEventListener("pause", onPause);
    };
  }, [selectedIndex]);

  useEffect(() => {
    const onFs = () => setIsFs(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  const handleTogglePlay = useCallback(() => {
    const el = videoRefs.current[selectedIndex];
    if (!el) return;
    if (el.paused) {
      void el.play();
    } else {
      el.pause();
    }
  }, [selectedIndex]);

  const handleSeek = useCallback(
    (value: number) => {
      const el = videoRefs.current[selectedIndex];
      if (!el || !Number.isFinite(value)) return;
      el.currentTime = value;
      setCurrentTime(value);
    },
    [selectedIndex],
  );

  const handleToggleMute = useCallback(() => {
    setIsMuted((m) => !m);
  }, []);

  const handleToggleFullscreen = useCallback(() => {
    const el = videoRefs.current[selectedIndex];
    if (!el) return;
    if (document.fullscreenElement) {
      void document.exitFullscreen();
    } else {
      void el.requestFullscreen?.();
    }
  }, [selectedIndex]);

  const handlePlayKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleTogglePlay();
    }
  };

  const currentItem = scenarioItems[selectedIndex];
  const dur = duration > 0 ? duration : 0;
  const seekProgressPct = dur > 0 ? Math.min(100, Math.max(0, (currentTime / dur) * 100)) : 0;

  return (
    <section
      id="scenarios"
      className="scroll-mt-20 bg-linear-to-b from-(--hm-bg) to-(--hm-bg-2) px-6 py-24 max-[900px]:px-5 max-[900px]:py-16"
    >
      <div className="mx-auto max-w-screen-2xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl leading-tight font-bold text-(--hm-text) md:text-5xl">
            {t("scenarios.title")}
          </h2>
          <p className="mx-auto max-w-2xl text-base leading-[1.8] text-(--hm-muted)">
            {t("scenarios.subtitle")}
          </p>
        </div>

        <div className="relative px-0 md:px-4" style={{ perspective: "1400px" }}>
          <div className="overflow-hidden py-4 md:py-8" ref={emblaRef}>
            <div className="flex items-center [-webkit-tap-highlight-color:transparent]">
              {scenarioItems.map((item, index) => {
                const isSelected = index === selectedIndex;
                return (
                  <div
                    key={item.id}
                    className="min-w-0 flex-[0_0_92%] pl-2 transition-[flex-basis] duration-300 first:pl-0 min-[640px]:flex-[0_0_76%] min-[640px]:pl-4 min-[900px]:flex-[0_0_68%] min-[1200px]:flex-[0_0_58%] min-[1200px]:pl-5"
                  >
                    <div
                      className={`relative origin-center transition-all duration-500 ease-out transform-3d ${
                        isSelected
                          ? "z-20 scale-100 opacity-100"
                          : "z-0 scale-[0.78] opacity-45 md:scale-[0.82]"
                      }`}
                    >
                      <div
                        className={`group/slide relative overflow-hidden rounded-2xl bg-[#0a0b10] ${
                          isSelected ? "ring-1 ring-white/10 shadow-2xl" : ""
                        }`}
                      >
                        <div className="relative aspect-video">
                          <video
                            ref={(node) => {
                              videoRefs.current[index] = node;
                            }}
                            src={item.video}
                            className="h-full w-full object-cover"
                            muted={index !== selectedIndex ? true : isMuted}
                            loop
                            playsInline
                            preload="metadata"
                          />

                          <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/85 via-black/15 to-transparent" />

                          {/* <div className="pointer-events-none absolute top-0 right-0 left-0 p-5 md:p-6">
                            <h3 className="text-center text-lg font-semibold text-white md:text-2xl">
                              {t(item.titleKey)}
                            </h3>
                          </div> */}

                          {isSelected && (
                            <div className="absolute inset-x-0 bottom-0 opacity-0 pointer-events-none transition-opacity duration-200 group-hover/slide:pointer-events-auto group-hover/slide:opacity-100 focus-within:pointer-events-auto focus-within:opacity-100">
                              <div className="px-3 pt-2 pb-1">
                                <div className="relative flex h-4 w-full items-center">
                                  <div
                                    className="pointer-events-none absolute right-0 left-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-white/22"
                                    aria-hidden
                                  />
                                  <div
                                    className="pointer-events-none absolute top-1/2 left-0 h-1 -translate-y-1/2 rounded-full bg-white"
                                    style={{
                                      width: `${seekProgressPct}%`,
                                      maxWidth: "100%",
                                    }}
                                    aria-hidden
                                  />
                                  <input
                                    type="range"
                                    min={0}
                                    max={dur || 0}
                                    step={0.05}
                                    value={Math.min(currentTime, dur || 0)}
                                    onChange={(e) => handleSeek(parseFloat(e.target.value))}
                                    onInput={(e) =>
                                      handleSeek(parseFloat((e.target as HTMLInputElement).value))
                                    }
                                    className="video-scrub absolute inset-0 z-10 h-full w-full cursor-pointer"
                                    aria-label="Seek"
                                  />
                                </div>
                              </div>

                              <div className="flex items-center gap-2 bg-black/55 px-3 py-2 backdrop-blur-md">
                                <button
                                  type="button"
                                  onClick={handleTogglePlay}
                                  onKeyDown={handlePlayKeyDown}
                                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-white hover:bg-white/10"
                                  aria-label={
                                    isPlaying ? t("scenarios.pause") : t("scenarios.play")
                                  }
                                >
                                  {isPlaying ? (
                                    <Pause className="h-4 w-4" fill="currentColor" />
                                  ) : (
                                    <Play className="h-4 w-4" fill="currentColor" />
                                  )}
                                </button>
                                <span className="shrink-0 font-mono text-xs tabular-nums text-white/90">
                                  {formatTime(currentTime)} / {formatTime(dur)}
                                </span>
                                <div className="flex-1" />
                                <button
                                  type="button"
                                  onClick={handleToggleMute}
                                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-white hover:bg-white/10"
                                  aria-label={isMuted ? t("scenarios.unmute") : t("scenarios.mute")}
                                >
                                  {isMuted ? (
                                    <VolumeX className="h-4 w-4" />
                                  ) : (
                                    <Volume2 className="h-4 w-4" />
                                  )}
                                </button>
                                <button
                                  type="button"
                                  onClick={handleToggleFullscreen}
                                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-white hover:bg-white/10"
                                  aria-label={
                                    isFs
                                      ? t("scenarios.exit_fullscreen")
                                      : t("scenarios.fullscreen")
                                  }
                                >
                                  {isFs ? (
                                    <Minimize className="h-4 w-4" />
                                  ) : (
                                    <Maximize className="h-4 w-4" />
                                  )}
                                </button>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <button
                                      type="button"
                                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-white hover:bg-white/10"
                                      aria-label={t("scenarios.more_options")}
                                    >
                                      <MoreVertical className="h-4 w-4" />
                                    </button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end" className="min-w-40">
                                    <DropdownMenuItem
                                      onSelect={() => void videoRefs.current[selectedIndex]?.play()}
                                    >
                                      {t("scenarios.play")}
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onSelect={() => videoRefs.current[selectedIndex]?.pause()}
                                    >
                                      {t("scenarios.pause")}
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <button
            type="button"
            onClick={scrollPrev}
            className="absolute top-1/2 left-0 z-30 flex h-12 w-12 -translate-x-1 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/20 md:-translate-x-4"
            aria-label={t("scenarios.prev")}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={scrollNext}
            className="absolute top-1/2 right-0 z-30 flex h-12 w-12 translate-x-1 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/20 md:translate-x-4"
            aria-label={t("scenarios.next")}
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="mb-2 text-xs tracking-widest text-cyan-400 uppercase">
              {`${t("scenarios.task_word")} ${selectedIndex + 1} / ${scenarioItems.length}`}
            </div>
            {/* <h3 className="text-2xl font-bold text-white md:text-3xl">
              {t(currentItem?.titleKey ?? "")}
            </h3> */}
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-3">
          {scenarioItems.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => scrollTo(index)}
              className={`h-3 rounded-full transition-all duration-300 ${index === selectedIndex ? "w-8 bg-[#1a5fff]" : "w-3 bg-white/30 hover:bg-white/50"}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
