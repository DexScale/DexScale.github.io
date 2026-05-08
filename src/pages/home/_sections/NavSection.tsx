import { Link } from "@tanstack/react-router";
import type { Lang } from "@/components/home/i18n";
import logoSrc from "../assets/single.png";

interface NavSectionProps {
  lang: Lang;
  t: (key: string) => string;
  toggleLang: () => void;
}

const navLinks = [
  { href: "#stats", labelKey: "nav.stats" },
  { href: "#scenarios", labelKey: "nav.scenarios" },
  { href: "#multi-tasks", labelKey: "nav.multi_tasks" },
  // { href: "#whole-machine", labelKey: "nav.whole_machine" },
  { href: "#dexterous-hand", labelKey: "nav.dexterous_hand" },
  { href: "#teleoperation", labelKey: "nav.teleoperation" },
];

const handleAnchorClick = (href: string) => {
  const target = document.querySelector(href);
  if (!target) return;

  target.scrollIntoView({ behavior: "smooth" });
};

export const NavSection = ({ lang, t, toggleLang }: NavSectionProps) => {
  const handleNavLinkClick = (href: string) => {
    handleAnchorClick(href);
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-black/60 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <img
          src={logoSrc}
          onClick={() => handleNavLinkClick("#top")}
          className="w-auto h-10 cursor-pointer brightness-0 invert"
          alt="Linker Hand"
          aria-label="Scroll to top"
        />

        <nav
          id="home-mobile-nav"
          className="hidden lg:flex items-center gap-8 text-sm absolute left-1/2 -translate-x-1/2"
          aria-label="Primary navigation"
        >
          {navLinks.map((link) => (
            <button
              key={link.href}
              type="button"
              onClick={() => handleNavLinkClick(link.href)}
              className="transition-colors hover:text-(--hm-text)"
            >
              {t(link.labelKey)}
            </button>
          ))}
        </nav>
        <button
          type="button"
          onClick={toggleLang}
          className="text-xs px-3 py-1.5 rounded-full border border-gray-600 text-gray-300 hover:border-gray-400 hover:text-white transition-colors"
          aria-label="Toggle language"
        >
          {lang === "en" ? "中文" : "EN"}
        </button>
      </div>
    </header>
  );
};
