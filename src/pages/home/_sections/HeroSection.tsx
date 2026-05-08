import { ArrowRight, Play } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
// import heroPoster from "../assets/heroBg.jpg";
import heroVideo from "../assets/linkerbot.mp4";

const PARTNER_LABEL_KEYS = [
  "hero.partners.lxxqs",
  "hero.partners.sjtu",
  "hero.partners.hku",
] as const;

interface HeroSectionProps {
  t: (key: string) => string;
}

export const HeroSection = ({ t }: HeroSectionProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  /** Native <video controls>: must be React-controlled so re-renders don't strip the attribute in fullscreen. */
  const [showNativeControls, setShowNativeControls] = useState(false);

  const restoreBackgroundMode = useCallback(() => {
    setShowNativeControls(false);
    const video = videoRef.current;
    if (video) void video.play().catch(() => {});
  }, []);

  useEffect(() => {
    const onFullscreenChange = () => {
      const fsEl =
        document.fullscreenElement ??
        (document as Document & { webkitFullscreenElement?: Element | null })
          .webkitFullscreenElement;
      if (!fsEl) {
        restoreBackgroundMode();
      }
    };

    document.addEventListener("fullscreenchange", onFullscreenChange);
    document.addEventListener("webkitfullscreenchange", onFullscreenChange);

    const video = videoRef.current;
    const onWebkitEnd = () => restoreBackgroundMode();
    video?.addEventListener("webkitendfullscreen", onWebkitEnd);

    return () => {
      document.removeEventListener("fullscreenchange", onFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", onFullscreenChange);
      video?.removeEventListener("webkitendfullscreen", onWebkitEnd);
    };
  }, [restoreBackgroundMode]);

  const handleWatchFullVideo = async () => {
    const video = videoRef.current;
    if (!video) return;

    setShowNativeControls(true);
    await new Promise<void>((resolve) => {
      requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
    });

    try {
      video.muted = false;
      video.loop = false;
      await video.play();

      if (video.requestFullscreen) {
        await video.requestFullscreen();
        return;
      }

      const webkitVideo = video as HTMLVideoElement & { webkitEnterFullscreen?: () => void };
      if (typeof webkitVideo.webkitEnterFullscreen === "function") {
        webkitVideo.webkitEnterFullscreen();
      }
    } catch {
      try {
        if (video.requestFullscreen) {
          await video.requestFullscreen();
        }
      } catch {
        /* user gesture or policy blocked */
      }
    }
  };

  const handleWatchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      void handleWatchFullVideo();
    }
  };

  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pb-28 pt-28"
    >
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          src={heroVideo}
          className="h-full w-full object-cover scale-105"
          controls={showNativeControls}
          autoPlay
          muted={!showNativeControls}
          loop={!showNativeControls}
          playsInline
          preload="auto"
          aria-label={t("hero.image_alt")}
        />
      </div>

      <div className="relative z-10 flex w-full max-w-4xl flex-col items-center text-center text-white">
        <h1 className="m-0 max-w-4xl text-[clamp(2rem,6.5vw,4rem)] font-bold uppercase leading-[1.08] tracking-[0.06em] text-white">
          {t("hero.brand")}
        </h1>

        <p className="mt-5 max-w-2xl text-base font-medium leading-relaxed text-white md:text-lg">
          {t("hero.title")}
        </p>

        <button
          type="button"
          onClick={() => void handleWatchFullVideo()}
          onKeyDown={handleWatchKeyDown}
          className="mt-10 inline-flex items-center gap-3 text-sm font-normal text-white transition-opacity hover:opacity-90"
          aria-label={t("hero.watch")}
        >
          <span>{t("hero.watch")}</span>
          <span
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/90 bg-white/10 backdrop-blur-sm"
            aria-hidden
          >
            <Play className="h-3.5 w-3.5 fill-white text-white" />
          </span>
        </button>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#stats"
            className="inline-flex items-center gap-2 rounded-full bg-black px-7 py-3 text-sm font-medium text-white shadow-lg transition-colors hover:bg-zinc-900"
          >
            {t("hero.download")}
            <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
          </a>
          <a
            href="#stats"
            className="inline-flex items-center gap-2 rounded-full bg-black px-7 py-3 text-sm font-medium text-white shadow-lg transition-colors hover:bg-zinc-900"
          >
            {t("hero.paper")}
            <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
          </a>
        </div>

        <aside
          className="hero-credits mt-20 w-full"
          aria-label={`${t("hero.partners.title")} · ${t("hero.authors.title")}`}
        >
          <div className="hero-credits-block-a">
            <h2 className="hero-credits-label">
              <span className="hero-credits-label-text">{t("hero.partners.title")}</span>
            </h2>
            <div className="hero-credits-partners">
              {PARTNER_LABEL_KEYS.map((key) => (
                <span key={key} className="hero-credits-partner-name">
                  {t(key)}
                </span>
              ))}
            </div>
          </div>

          <div className="hero-credits-divider" aria-hidden />

          <div className="hero-credits-block-b">
            <h2 className="hero-credits-label hero-credits-label--violet">
              <span className="hero-credits-label-text">{t("hero.authors.title")}</span>
            </h2>
            <p className="hero-credits-placeholder">{t("hero.authors.placeholder")}</p>
          </div>
        </aside>
      </div>
    </section>
  );
};
