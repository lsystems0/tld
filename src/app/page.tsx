"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useHomeScrollAnimations } from "@/hooks/useHomeScrollAnimations";
import { useNavbar } from "@/contexts/NavbarContext";
import { BracketedChild } from "@/components/ui/BracketedChild";
import { LOGO_TO_SIZE_MAP } from "@/components/layout/Navbar";

export default function Home() {
  const {
    heroWidth,
    heroHeight,
    heroOpacity,
    bottomElementsY,
    bottomElementsOpacity,
  } = useHomeScrollAnimations({ enableSnap: true });

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
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden"
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
            className="absolute inset-0 h-full w-full object-cover"
            priority
          />
        </motion.div>

        <div className="absolute top-22 right-0 left-0 flex h-[calc(100vh-7.5rem)] w-screen flex-col items-center justify-around text-center">
          <BracketedChild spacing="wide">
            <p className="z-1 px-4 text-lg whitespace-nowrap md:text-2xl">
              WE DON&apos;T RUSH FOUNDATIONS,
            </p>
            <p className="z-1 px-4 text-lg md:text-2xl">EVEN ONLINE.</p>
          </BracketedChild>
          <p className="text-sm md:text-xl">
            OUR FULL WEBSITE IS
            <br /> LAUNCHING SOON.
          </p>
          <div className="flex flex-col gap-4 md:gap-7">
            <p className="text-sm md:text-xl">
              TAKE A LOOK AT OUR
              <br /> ESTABLISHED PROJECTS
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12">
              <Link
                href="/projects?project=kukun"
                className="opacity-45 transition-opacity hover:opacity-100"
              >
                <Image
                  src="/logos/kukun.svg"
                  width={96}
                  height={28}
                  alt="Kukun"
                  className={`${LOGO_TO_SIZE_MAP["kukun"]} object-contain`}
                />
              </Link>
              <Link
                href="/projects?project=armonia"
                className="opacity-45 transition-opacity hover:opacity-100"
              >
                <Image
                  src="/logos/armonia.svg"
                  width={96}
                  height={28}
                  alt="Armonia"
                  className={`${LOGO_TO_SIZE_MAP["armonia"]} object-contain`}
                />
              </Link>
              <Link
                href="/projects?project=ilbayou"
                className="opacity-45 transition-opacity hover:opacity-100"
              >
                <Image
                  src="/logos/ilbayou.svg"
                  width={96}
                  height={28}
                  alt="il bayou"
                  className={`${LOGO_TO_SIZE_MAP["ilbayou"]} object-contain`}
                />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom elements that slide up */}
        <motion.div
          className="absolute inset-x-0 bottom-4 flex w-screen items-center justify-between px-4 md:bottom-8 md:px-24"
          style={{
            y: bottomElementsY,
            opacity: bottomElementsOpacity,
          }}
        >
          <p className="text-[10px] whitespace-nowrap md:text-base">
            THE RIGHT CHOICE
          </p>
          <Image
            src="/logos/the-land-developers.png"
            width={243}
            height={12}
            alt="the land developers logo"
            className="w-40 object-contain md:w-60"
          />
        </motion.div>
      </div>
    </div>
  );
}
