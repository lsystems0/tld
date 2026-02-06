"use client";

import { useScroll, useTransform } from "framer-motion";

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

// ─────────────────────────────────────────────────────────────────────

export function useHomeScrollAnimations() {
  const { scrollYProgress } = useScroll();

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
