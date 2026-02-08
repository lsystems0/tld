"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useScroll, useTransform } from "framer-motion";

// ── Snap thresholds ──────────────────────────────────────────────────
const SNAP_FORWARD_AT = 0.1;
const SNAP_REVERSE_AT = 0.9;
const SNAP_DURATION_MS = 900;

// ── Scroll animation timing ─────────────────────────────────────────
const HERO_ANIMATION_START = 0;
const HERO_ANIMATION_END = 0.5;
const ENTRANCE_ANIMATION_START = 0;
const ENTRANCE_ANIMATION_END = 0.2;

// ── Hero crop configuration (percentages) ───────────────────────────
const HERO_WIDTH_START_DESKTOP = 100;
const HERO_WIDTH_END_DESKTOP = 60;
const HERO_HEIGHT_START_DESKTOP = 100;
const HERO_HEIGHT_END_DESKTOP = 25;

const HERO_WIDTH_START_MOBILE = 100;
const HERO_WIDTH_END_MOBILE = 80;
const HERO_HEIGHT_START_MOBILE = 100;
const HERO_HEIGHT_END_MOBILE = 20;

// ── Slide distances ─────────────────────────────────────────────────
const NAV_START_Y = -100;
const NAV_END_Y = 0;
const BOTTOM_START_Y = 100;
const BOTTOM_END_Y = 0;

// ── Easing ───────────────────────────────────────────────────────────
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function smoothScrollTo(targetY: number, duration: number): Promise<void> {
  return new Promise((resolve) => {
    const startY = window.scrollY;
    const delta = targetY - startY;
    if (Math.abs(delta) < 1) {
      resolve();
      return;
    }
    const startTime = performance.now();

    function step(now: number) {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      window.scrollTo(0, startY + delta * easeInOutCubic(t));
      if (t < 1) {
        requestAnimationFrame(step);
      } else {
        resolve();
      }
    }
    requestAnimationFrame(step);
  });
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return isMobile;
}

export function useHomeScrollAnimations(options?: { enableSnap?: boolean }) {
  const { scrollYProgress } = useScroll();
  const isSnapping = useRef(false);
  const snappedState = useRef<"top" | "bottom">("top");
  const isMobile = useIsMobile();
  const enableSnap = options?.enableSnap ?? false;

  // ── Snap logic ───────────────────────────────────────────────────
  const handleSnap = useCallback((latest: number) => {
    if (isSnapping.current) return;

    if (
      latest >= SNAP_FORWARD_AT &&
      latest < 1 &&
      snappedState.current === "top"
    ) {
      isSnapping.current = true;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      smoothScrollTo(maxScroll, SNAP_DURATION_MS).then(() => {
        snappedState.current = "bottom";
        isSnapping.current = false;
      });
    } else if (
      latest <= SNAP_REVERSE_AT &&
      latest > 0 &&
      snappedState.current === "bottom"
    ) {
      isSnapping.current = true;
      smoothScrollTo(0, SNAP_DURATION_MS).then(() => {
        snappedState.current = "top";
        isSnapping.current = false;
      });
    }
  }, []);

  useEffect(() => {
    if (!enableSnap) return;
    const unsubscribe = scrollYProgress.on("change", handleSnap);
    return unsubscribe;
  }, [scrollYProgress, handleSnap, enableSnap]);

  // ── Animation transforms ─────────────────────────────────────────

  // Hero image container crops by reducing width/height
  const heroWidthStart = isMobile
    ? HERO_WIDTH_START_MOBILE
    : HERO_WIDTH_START_DESKTOP;
  const heroWidthEnd = isMobile
    ? HERO_WIDTH_END_MOBILE
    : HERO_WIDTH_END_DESKTOP;
  const heroHeightStart = isMobile
    ? HERO_HEIGHT_START_MOBILE
    : HERO_HEIGHT_START_DESKTOP;
  const heroHeightEnd = isMobile
    ? HERO_HEIGHT_END_MOBILE
    : HERO_HEIGHT_END_DESKTOP;

  const heroWidth = useTransform(
    scrollYProgress,
    [HERO_ANIMATION_START, HERO_ANIMATION_END],
    [`${heroWidthStart}%`, `${heroWidthEnd}%`],
  );
  const heroHeight = useTransform(
    scrollYProgress,
    [HERO_ANIMATION_START, HERO_ANIMATION_END],
    [`${heroHeightStart}%`, `${heroHeightEnd}%`],
  );
  const heroOpacity = useTransform(
    scrollYProgress,
    [HERO_ANIMATION_START, HERO_ANIMATION_END],
    [1, 0.8],
  );

  // Nav elements slide down from above
  const navElementsY = useTransform(
    scrollYProgress,
    [ENTRANCE_ANIMATION_START, ENTRANCE_ANIMATION_END],
    [NAV_START_Y, NAV_END_Y],
  );
  const navElementsOpacity = useTransform(
    scrollYProgress,
    [ENTRANCE_ANIMATION_START, ENTRANCE_ANIMATION_END],
    [0, 1],
  );

  // Bottom bar slides up from below
  const bottomElementsY = useTransform(
    scrollYProgress,
    [ENTRANCE_ANIMATION_START, ENTRANCE_ANIMATION_END],
    [BOTTOM_START_Y, BOTTOM_END_Y],
  );
  const bottomElementsOpacity = useTransform(
    scrollYProgress,
    [ENTRANCE_ANIMATION_START, ENTRANCE_ANIMATION_END],
    [0, 1],
  );

  return {
    heroWidth,
    heroHeight,
    heroOpacity,
    navElementsY,
    navElementsOpacity,
    bottomElementsY,
    bottomElementsOpacity,
  };
}
