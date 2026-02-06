"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useHomeScrollAnimations } from "@/hooks/useHomeScrollAnimations";

export default function Home() {
  const {
    heroWidth,
    heroHeight,
    heroOpacity,
    bottomElementsY,
    bottomElementsOpacity,
  } = useHomeScrollAnimations();

  return (
    <div
      className="relative h-[150vh] scroll-smooth"
      style={{ scrollSnapType: "y mandatory" }}
    >
      {/* Fixed hero section that shrinks on scroll */}
      <div className="fixed inset-0 h-screen w-screen overflow-hidden scroll-snap-start">
        {/* Blackish background that gets revealed */}
        <div className="absolute inset-0 bg-[#141414]" />

        {/* Hero image container that crops (overflow hidden) */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden"
          style={{
            width: heroWidth,
            height: heroHeight,
            opacity: heroOpacity,
          }}
        >
          {/* Image stays at full size with object-cover, container crops it */}
          <Image
            src="/bg/hero.png"
            width={1920}
            height={1080}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            priority
          />
        </motion.div>

        <div className="absolute top-22 left-0 right-0 h-[calc(100vh-7.5rem)] py-24 flex flex-col justify-around w-screen items-center text-center">
          <p className="text-2xl">
            WE DON&apos;T RUSH FOUNDATIONS,
            <br /> EVEN ONLINE.
          </p>
          <p className="text-xl">
            OUR FULL WEBSITE IS
            <br /> LAUNCHING SOON.
          </p>
          <div className="flex flex-col gap-7">
            <p className="text-xl">
              TAKE A LOOK AT OUR
              <br /> ESTABLISHED PROJECTS
            </p>
            <div className="flex gap-12 items-center">
              <Link
                href="#"
                className="opacity-45 hover:opacity-100 transition-opacity"
              >
                <Image
                  src="/logos/kukun.svg"
                  width={96}
                  height={28}
                  alt="Kukun"
                  className="w-24 h-7 object-contain"
                />
              </Link>
              <Link
                href="#"
                className="opacity-45 hover:opacity-100 transition-opacity"
              >
                <Image
                  src="/logos/armonia.svg"
                  width={96}
                  height={28}
                  alt="Armonia"
                  className="w-24 h-7 object-contain"
                />
              </Link>
              <Link
                href="#"
                className="opacity-45 hover:opacity-100 transition-opacity"
              >
                <Image
                  src="/logos/ilbayou.svg"
                  width={96}
                  height={28}
                  alt="il bayou"
                  className="w-24 h-7 pt-2 object-contain"
                />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom elements that slide up */}
        <motion.div
          className="flex w-screen justify-between absolute inset-x-0 px-24 bottom-8 items-center"
          style={{
            y: bottomElementsY,
            opacity: bottomElementsOpacity,
          }}
        >
          <p>THE RIGHT CHOICE</p>
          <Image
            src="/logos/the-land-developers.png"
            width={243}
            height={12}
            alt="the land developers logo"
            className="w-60 h-3"
          />
        </motion.div>
      </div>
    </div>
  );
}
