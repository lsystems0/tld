"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useHomeScrollAnimations } from "@/hooks/useHomeScrollAnimations";

export function Navbar() {
  const { navElementsY, navElementsOpacity } = useHomeScrollAnimations();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xs bg-black/30 rounded-br-3xl w-full flex justify-around items-center rounded-bl-3xl h-30">
      {/* Social links - hidden initially above page, slide down on scroll */}
      <motion.div
        className="flex gap-6"
        style={{
          opacity: navElementsOpacity,
          y: navElementsY,
        }}
      >
        <Link
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/social-icons/instagram.svg"
            width={21}
            height={20}
            alt="instagram account"
            className="size-5"
          />
        </Link>
        <Link
          href="https://www.facebook.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/social-icons/facebook.svg"
            width={21}
            height={20}
            alt="facebook page"
            className="size-5"
          />
        </Link>
        <Link
          href="https://www.linkedin.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/social-icons/linkedin.svg"
            width={21}
            height={20}
            alt="linkedin account"
            className="size-5"
          />
        </Link>
      </motion.div>

      {/* Logo - always visible */}
      <Link href="/">
        <Image
          src="/logo.png"
          alt="Logo"
          width={97}
          height={32}
          className="w-24 h-8"
        />
      </Link>

      {/* Contact button - hidden initially above page, slides down on scroll */}
      <motion.button
        style={{
          opacity: navElementsOpacity,
          y: navElementsY,
        }}
      >
        CONTACT US
      </motion.button>
    </nav>
  );
}
