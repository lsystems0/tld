"use client";

import { useCallback, useEffect, useRef } from "react";
import { useScroll, useTransform } from "framer-motion";

// ── Snap thresholds ──────────────────────────────────────────────────
// Fraction of scrollYProgress at which the snap triggers.
// SNAP_FORWARD_AT: when scrolling down, snap to bottom once past this.
// SNAP_REVERSE_AT: when scrolling up, snap to top once past this.
// Both are measured from the top (0 = top, 1 = fully scrolled).

const SNAP_FORWARD_AT = 0.10;
const SNAP_REVERSE_AT = 0.90;

// Duration of the snap animation in milliseconds.
const SNAP_DURATION_MS = 900;

// ── Scroll animation timing ─────────────────────────────────────────
// All ranges are expressed as fractions of scrollYProgress (0 → 1).

const HERO_ANIMATION_START = 0;
const HERO_ANIMATION_END = 0.5;

// Nav + bottom bar share the same timing so they animate in sync.
const ENTRANCE_ANIMATION_START = 0;
const ENTRANCE_ANIMATION_END = 0.2;

// ── Hero crop configuration (percentages) ───────────────────────────

const HERO_WIDTH_START = 100;
const HERO_WIDTH_END = 60;
const HERO_HEIGHT_START = 100;
const HERO_HEIGHT_END = 25;

// ── Slide distances ─────────────────────────────────────────────────

const NAV_START_Y = -100; // starts above viewport
const NAV_END_Y = 0;

const BOTTOM_START_Y = 100; // starts below viewport
const BOTTOM_END_Y = 0;

// ── Easing ───────────────────────────────────────────────────────────

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// ─────────────────────────────────────────────────────────────────────

/**
 * Smoothly animate window.scrollTo over `duration` ms using
 * requestAnimationFrame so we control the speed (not the browser).
 */
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

// ─────────────────────────────────────────────────────────────────────

export function useHomeScrollAnimations() {
  const { scrollYProgress } = useScroll();
  const isSnapping = useRef(false);
  // Track whether we're in the "open" (scrolled-down) or "closed" (top) state
  // to avoid re-triggering in the same direction.
  const snappedState = useRef<"top" | "bottom">("top");

  // ── Snap logic ───────────────────────────────────────────────────
  const handleSnap = useCallback((latest: number) => {
    if (isSnapping.current) return;

    // Scrolling down past forward threshold → snap to bottom
    if (latest >= SNAP_FORWARD_AT && latest < 1 && snappedState.current === "top") {
      isSnapping.current = true;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      smoothScrollTo(maxScroll, SNAP_DURATION_MS).then(() => {
        snappedState.current = "bottom";
        isSnapping.current = false;
      });
    }
    // Scrolling up past reverse threshold → snap to top
    else if (latest <= SNAP_REVERSE_AT && latest > 0 && snappedState.current === "bottom") {
      isSnapping.current = true;
      smoothScrollTo(0, SNAP_DURATION_MS).then(() => {
        snappedState.current = "top";
        isSnapping.current = false;
      });
    }
  }, []);

  // Subscribe to scroll progress changes
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", handleSnap);
    return unsubscribe;
  }, [scrollYProgress, handleSnap]);

  // ── Animation transforms ─────────────────────────────────────────

  // Hero image container crops by reducing width/height
  const heroWidth = useTransform(
    scrollYProgress,
    [HERO_ANIMATION_START, HERO_ANIMATION_END],
    [`${HERO_WIDTH_START}%`, `${HERO_WIDTH_END}%`],
  );
  const heroHeight = useTransform(
    scrollYProgress,
    [HERO_ANIMATION_START, HERO_ANIMATION_END],
    [`${HERO_HEIGHT_START}%`, `${HERO_HEIGHT_END}%`],
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
    // Hero
    heroWidth,
    heroHeight,
    heroOpacity,
    // Navbar
    navElementsY,
    navElementsOpacity,
    // Bottom bar
    bottomElementsY,
    bottomElementsOpacity,
  };
}
