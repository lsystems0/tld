"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useHomeScrollAnimations } from "@/hooks/useHomeScrollAnimations";
import { useNavbar } from "@/contexts/NavbarContext";

export default function Home() {
  const {
    heroWidth,
    heroHeight,
    heroOpacity,
    bottomElementsY,
    bottomElementsOpacity,
  } = useHomeScrollAnimations();

  const { setVariant } = useNavbar();

  useEffect(() => {
    setVariant("default");
  }, [setVariant]);

  return (
    <div className="relative h-[150vh]">
      {/* Fixed hero section that shrinks on scroll */}
      <div className="fixed inset-0 h-screen w-screen overflow-hidden">
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
          <p className="text-xl md:text-2xl">
            WE DON&apos;T RUSH FOUNDATIONS,
            <br /> EVEN ONLINE.
          </p>
          <p className="md:text-xl">
            OUR FULL WEBSITE IS
            <br /> LAUNCHING SOON.
          </p>
          <div className="flex flex-col gap-7">
            <p className="md:text-xl">
              TAKE A LOOK AT OUR
              <br /> ESTABLISHED PROJECTS
            </p>
            <div className="flex gap-12 items-center">
              <Link
                href="/projects?project=kukun"
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
                href="/projects?project=armonia"
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
                href="/projects?project=ilbayou"
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
          className="flex w-screen justify-between absolute inset-x-0 px-8 md:px-24 bottom-8 items-center"
          style={{
            y: bottomElementsY,
            opacity: bottomElementsOpacity,
          }}
        >
          <p className="text-xs md:text-base whitespace-nowrap">
            THE RIGHT CHOICE
          </p>
          <Image
            src="/logos/the-land-developers.png"
            width={243}
            height={12}
            alt="the land developers logo"
            className="w-50 md:w-60 object-contain"
          />
        </motion.div>
      </div>
    </div>
  );
}
