import { useEffect, useRef } from "react";

export const useReveal = <TElement extends HTMLElement>() => {
  const ref = useRef<TElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        element.classList.add("visible");
        observer.unobserve(element);
      },
      { rootMargin: "0px 0px -80px 0px" },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return ref;
};
