import { useEffect, useRef, useState } from "react";

interface UseCounterOptions {
  target: number;
  suffix?: string;
  duration?: number;
}

const formatCounterValue = (value: number, target: number) => {
  if (target % 1 === 0) return Math.floor(value).toLocaleString();

  return value.toFixed(1);
};

export const useCounter = ({ target, suffix = "", duration = 1600 }: UseCounterOptions) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const hasAnimatedRef = useRef(false);
  const [displayValue, setDisplayValue] = useState(`0${suffix}`);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const animateCounter = () => {
      if (hasAnimatedRef.current) return;

      hasAnimatedRef.current = true;
      const startTime = performance.now();

      const tick = (now: number) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = target * eased;

        setDisplayValue(`${formatCounterValue(value, target)}${suffix}`);

        if (progress < 1) requestAnimationFrame(tick);
      };

      requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;

      animateCounter();
      observer.unobserve(element);
    });

    observer.observe(element);

    return () => observer.disconnect();
  }, [duration, suffix, target]);

  return { ref, displayValue };
};
