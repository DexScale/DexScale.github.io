import { ArrowRight, Play } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
// import heroPoster from "../assets/heroBg.jpg";
import heroVideo from "../assets/linkerbot.mp4";
import logoSJTU from "../assets/SJTU.png";
import logoHKU from "../assets/HKU.png";
import logoLinkerbot from "../assets/linerbotLogo.png";

const partners = [
  { name: "灵心巧手", logo: logoLinkerbot },
  { name: "上海交通大学", logo: logoSJTU },
  { name: "香港大学", logo: logoHKU },
] as const;

const authors = [
  { name: "穆尧", affil: "sjtu" },
  { name: "秦言", affil: "hku" },
  { name: "陈天行", affil: "hku" },
  { name: "邵彦铭", affil: "sjtu" },
  { name: "周永", affil: "灵心" },
  { name: "曹岗", affil: "灵心" },
  { name: "苏洋", affil: "灵心" },
  { name: "孙煜童", affil: "灵心" },
  { name: "周浩宇", affil: "灵心" },
  { name: "赵美涵", affil: "灵心" },
] as const;

type AuthorAffil = (typeof authors)[number]["affil"];

const AUTHOR_GROUP_ORDER: readonly AuthorAffil[] = ["sjtu", "hku", "灵心"];

const AFFIL_LABEL_KEY: Record<AuthorAffil, string> = {
  sjtu: "hero.authors.affil.sjtu",
  hku: "hero.authors.affil.hku",
  灵心: "hero.authors.affil.linker",
};

const groupedAuthors = AUTHOR_GROUP_ORDER.map((affil) => ({
  affil,
  labelKey: AFFIL_LABEL_KEY[affil],
  names: authors.filter((a) => a.affil === affil).map((a) => a.name),
})).filter((g) => g.names.length > 0);

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
        <h1 className="m-0 max-w-5xl text-[clamp(4rem,6.5vw,8.5rem)] font-bold uppercase leading-[1.38] tracking-[0.06em] text-white">
          {t("hero.brand")}
        </h1>

        <p className="mt-2 max-w-2xl text-xl font-medium leading-relaxed text-white md:text-2xl">
          {t("hero.title")}
        </p>

        <button
          type="button"
          onClick={() => void handleWatchFullVideo()}
          onKeyDown={handleWatchKeyDown}
          className="mt-5 inline-flex items-center gap-3 text-xl font-normal text-white transition-opacity hover:opacity-90"
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
            <br />
            {t("hero.wait")}
            <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
          </a>
          <a
            href="#stats"
            className="inline-flex items-center gap-2 rounded-full bg-black px-7 py-3 text-sm font-medium text-white shadow-lg transition-colors hover:bg-zinc-900"
          >
            {t("hero.paper")}
            <br />
            {t("hero.wait")}
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
              {partners.map((p) => (
                <div key={p.name} className="hero-credits-partner-logo " title={p.name}>
                  <img src={p.logo} alt={p.name} loading="lazy" />
                </div>
              ))}
            </div>
          </div>

          <div className="hero-credits-divider" aria-hidden />

          <div className="hero-credits-block-b">
            <h2 className="hero-credits-label">
              <span className="hero-credits-label-text">{t("hero.authors.title")}</span>
            </h2>
            <div className="flex flex-col items-center justify-center">
              <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
                <span className="author-equal">
                  Yao Mu<sup>2</sup>,
                </span>
                <span className="author-equal">
                  Yan Qin<sup>3</sup>,
                </span>
                <span className="author-equal">
                  Tianxing Chen<sup>3</sup>,
                </span>
                <span className="author-name">
                  Yanming Shao<sup>2</sup>,
                </span>
                <span className="author-equal">
                  Yong Zhou<sup>1</sup>,
                </span>
                <span className="author-equal">
                  Gang Cao<sup>1</sup>,
                </span>
                <span className="author-equal">
                  Yang Su<sup>1</sup>,
                </span>
                <span className="author-equal">
                  Yutong Sun<sup>1</sup>,
                </span>
                <span className="author-equal">
                  Haoyu Zhou<sup>1</sup>,
                </span>
                <span className="author-equal">
                  Meihan Zhao<sup>1</sup>
                </span>
              </div>
              <hr className="my-6 border-gray-300 w-full"></hr>

              <div className="flex flex-wrap justify-center gap-x-2 gap-y-1 affiliation">
                <span>
                  <sup>1</sup>Linkerbot Beijing Technology co., Ltd. ,
                </span>
                <span>
                  <sup>2</sup>Shanghai Jiao Tong University,
                </span>
                <span>
                  <sup>3</sup>The University of Hong Kong
                </span>
              </div>
              {/* <div className="flex flex-wrap justify-center gap-x-2 gap-y-1 affiliation">
                <span>
                  <sup>*</sup>Equal contribution,
                </span>
                <span>
                  <sup>⊠</sup>Corresponding author
                </span>
              </div> */}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
};
