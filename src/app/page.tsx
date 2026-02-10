"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useHomeScrollAnimations } from "@/hooks/useHomeScrollAnimations";
import { BracketedChild } from "@/components/ui/BracketedChild";
import { LOGO_TO_SIZE_MAP, Navbar } from "@/components/layout/Navbar";
import { InquiryForm } from "@/components/InquiryForm";

export default function Home() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hoverFlash, setHoverFlash] = useState<number | null>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Trigger hover flash animation on page load (all at once)
    const timeouts: NodeJS.Timeout[] = [];
    timeouts.push(
      setTimeout(() => {
        setHoverFlash(-1); // Special value to trigger all
        timeouts.push(
          setTimeout(() => {
            setHoverFlash(null);
          }, 600),
        );
      }, 900),
    );

    return () => {
      window.removeEventListener("resize", checkMobile);
      timeouts.forEach(clearTimeout);
    };
    // prettier-ignore
  }, []);

  const {
    heroWidth,
    heroHeight,
    heroOpacity,
    bottomElementsY,
    bottomElementsOpacity,
  } = useHomeScrollAnimations({ enableSnap: true });

  const toggleForm = () => setIsFormOpen(!isFormOpen);

  // Form width on desktop
  const formWidth = 380;

  return (
    <>
      <Navbar variant="home" onContactClick={toggleForm} />

      {/* Main content - shifts left when form opens by animating 'right' position */}
      <motion.div
        className="relative h-[150vh]"
        animate={{
          marginRight: !isMobile && isFormOpen ? formWidth : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Fixed hero section - animates right position to make room for form */}
        <motion.div
          className="fixed top-0 bottom-0 left-0 overflow-hidden"
          animate={{
            right: !isMobile && isFormOpen ? formWidth : 0,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
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
              className="h-full w-full object-cover"
              priority
            />
          </motion.div>

          <div className="absolute top-16 right-0 left-0 flex h-[calc(100vh-7.5rem)] flex-col items-center justify-around text-center">
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
                <Link href="/projects?project=kukun">
                  <div className="group flex flex-col gap-2">
                    <Image
                      src="/logos/kukun.svg"
                      width={96}
                      height={28}
                      alt="Kukun"
                      className={`${LOGO_TO_SIZE_MAP["kukun"]} object-contain opacity-45 transition-opacity duration-500 group-hover:opacity-100 ${hoverFlash === 0 || hoverFlash === -1 ? "opacity-100!" : ""}`}
                    />
                    <div
                      className={`h-0.5 bg-white transition-[width] duration-500 group-hover:w-full ${hoverFlash === 0 || hoverFlash === -1 ? "w-full" : "w-0"}`}
                    ></div>
                  </div>
                </Link>
                <Link href="/projects?project=armonia">
                  <div className="group flex flex-col gap-2">
                    <Image
                      src="/logos/armonia.svg"
                      width={96}
                      height={28}
                      alt="Armonia"
                      className={`${LOGO_TO_SIZE_MAP["armonia"]} object-contain opacity-45 transition-opacity duration-500 group-hover:opacity-100 ${hoverFlash === 1 || hoverFlash === -1 ? "opacity-100!" : ""}`}
                    />
                    <div
                      className={`h-0.5 bg-white transition-[width] duration-500 group-hover:w-full ${hoverFlash === 1 || hoverFlash === -1 ? "w-full" : "w-0"}`}
                    ></div>
                  </div>
                </Link>
                <Link href="/projects?project=ilbayou">
                  <div className="group flex flex-col gap-2">
                    <Image
                      src="/logos/ilbayou.svg"
                      width={96}
                      height={28}
                      alt="il bayou"
                      className={`${LOGO_TO_SIZE_MAP["ilbayou"]} object-contain opacity-45 transition-opacity duration-500 group-hover:opacity-100 ${hoverFlash === 2 || hoverFlash === -1 ? "opacity-100!" : ""}`}
                    />
                    <div
                      className={`h-0.5 bg-white transition-[width] duration-500 group-hover:w-full ${hoverFlash === 2 || hoverFlash === -1 ? "w-full" : "w-0"}`}
                    ></div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom elements - fixed at full width, does NOT shift with form */}
      <motion.div
        className="fixed inset-x-0 bottom-4 z-40 flex w-screen items-center justify-between px-4 md:bottom-8 md:px-24"
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

      {/* Form panel - slides in from the right */}
      <motion.div
        className="fixed top-0 right-0 z-30 h-screen overflow-y-auto bg-[#141414]"
        initial={{ width: 0 }}
        animate={{
          width: isMobile
            ? isFormOpen
              ? "100%"
              : 0
            : isFormOpen
              ? formWidth
              : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="relative flex h-full w-full flex-col items-center justify-center p-10">
          {/* Close button - inside the form panel so it slides with it */}
          <motion.button
            onClick={toggleForm}
            className="absolute top-24 right-6 p-2 text-[#ededed] transition-colors hover:text-white"
            aria-label="Close form"
            initial={{ opacity: 0 }}
            animate={{ opacity: isFormOpen ? 1 : 0 }}
            transition={{ duration: 0.2, delay: isFormOpen ? 0.2 : 0 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </motion.button>

          {/* Simple centered form */}
          <div className="w-full max-w-sm">
            <h2 className="mb-8 text-center text-2xl font-medium tracking-wide">
              CONTACT US
            </h2>
            <InquiryForm />
          </div>
        </div>
      </motion.div>
    </>
  );
}
