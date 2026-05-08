import { useLang } from "@/components/home/i18n";
import { FooterSection } from "./_sections/FooterSection";
import { HeroSection } from "./_sections/HeroSection";
import { IntroSection } from "./_sections/IntroSection";
import { NavSection } from "./_sections/NavSection";
import { StatsSection } from "./_sections/StatsSection";
import { MultiTasksSection } from "./_sections/MultiTaskSection";
import { TeleoperationSection } from "./_sections/TeleoperationSection";
import { DexterousHandSection } from "./_sections/DexterousHandSection";
import { WholeMachineSection } from "./_sections/WholeMachineSection";

import "./home.css";

export const HomePage = () => {
  const { lang, t, toggleLang } = useLang();

  return (
    <div className="home-page min-h-screen overflow-x-hidden">
      <NavSection lang={lang} t={t} toggleLang={toggleLang} />
      <main>
        <HeroSection t={t} />
        <IntroSection t={t} />
        <StatsSection t={t} />
        <MultiTasksSection t={t} />
        {/* <WholeMachineSection t={t} /> */}
        <DexterousHandSection t={t} />
        <TeleoperationSection t={t} />
      </main>
      {/* <FooterSection t={t} /> */}
    </div>
  );
};
