"use client";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useHomeScrollAnimations } from "@/hooks/useHomeScrollAnimations";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const projectLogos = [
  {
    src: "/logos/kukun.svg",
    alt: "Kukun Project",
    href: "/projects?project=kukun",
  },
  {
    src: "/logos/armonia.svg",
    alt: "Armonia Project",
    href: "/projects?project=armonia",
  },
  {
    src: "/logos/ilbayou.svg",
    alt: "Il Bayou Project",
    href: "/projects?project=ilbayou",
  },
];

export function SocialLinks({
  size = "normal",
}: {
  size?: "large" | "normal";
}) {
  return (
    <div
      className={`flex ${size === "large" ? "gap-6 md:gap-8" : "gap-4 md:gap-6"}`}
    >
      <Link
        href="https://www.instagram.com/thelanddevelopers"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          src="/social-icons/instagram.svg"
          width={21}
          height={20}
          alt="instagram account"
          className={size === "large" ? "size-6 md:size-6" : "size-4 md:size-5"}
        />
      </Link>
      <Link
        href="https://www.facebook.com/TheLandDevelopers"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          src="/social-icons/facebook.svg"
          width={21}
          height={20}
          alt="facebook page"
          className={size === "large" ? "size-6 md:size-6" : "size-4 md:size-5"}
        />
      </Link>
      <Link
        href="https://www.linkedin.com/company/thelanddevelopers"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          src="/social-icons/linkedin.svg"
          width={21}
          height={20}
          alt="linkedin account"
          className={size === "large" ? "size-6 md:size-6" : "size-4 md:size-5"}
        />
      </Link>
    </div>
  );
}

function ContactButton({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="text-sm font-medium tracking-wide md:px-6 md:py-2"
    >
      CONTACT US
    </button>
  );
}

function ProjectLogos() {
  const searchParams = useSearchParams();
  const project = searchParams.get("project");

  return (
    <div className="flex flex-col items-center gap-2 md:flex-row">
      {projectLogos.map((logo) => {
        const projectKey = logo.href.split("project=")[1];
        return (
          <Link
            key={logo.alt}
            href={logo.href}
            scroll={false}
            className="flex items-center"
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={120}
              height={40}
              className={`${project === projectKey ? "opacity-100" : "opacity-45"} ${LOGO_TO_SIZE_MAP[projectKey]} min-h-0 min-w-0 transition-opacity hover:opacity-100`}
              unoptimized
            />
          </Link>
        );
      })}
    </div>
  );
}

const LOGO_TO_SIZE_MAP: Record<string, string> = {
  armonia: "h-6.5 md:h-6",
  ilbayou: "md:pt-1 h-7.5 md:h-8",
  kukun: "h-8 md:h-7",
};

function HamburgerButton({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="relative flex h-8 w-8 flex-col items-center justify-center gap-1.5 md:hidden"
      aria-label={isOpen ? "Close menu" : "Open menu"}
    >
      <motion.span
        animate={{
          rotate: isOpen ? 45 : 0,
          y: isOpen ? 8 : 0,
        }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="block h-0.5 w-6 origin-center bg-white"
      />
      <motion.span
        animate={{
          opacity: isOpen ? 0 : 1,
          scaleX: isOpen ? 0 : 1,
        }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="block h-0.5 w-6 bg-white"
      />
      <motion.span
        animate={{
          rotate: isOpen ? -45 : 0,
          y: isOpen ? -8 : 0,
        }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="block h-0.5 w-6 origin-center bg-white"
      />
    </button>
  );
}

export function Navbar({
  variant,
  onContactClick,
}: {
  variant: "projects" | "home";
  onContactClick?: () => void;
}) {
  const { navElementsY, navElementsOpacity } = useHomeScrollAnimations();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isProjects = variant === "projects";

  return (
    <motion.nav
      initial={false}
      animate={{
        height: isProjects && isMobileMenuOpen ? "auto" : 80,
      }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="fixed top-0 right-0 left-0 z-50 w-full flex-col rounded-br-3xl rounded-bl-3xl bg-black/30 px-4 backdrop-blur-xs md:px-8"
    >
      {/* Main navbar row - always visible */}
      <div className="flex h-20 w-full items-center">
        {isProjects ? (
          // Projects layout: Logo (left) | Project logos (center) | Social + Contact (right)
          <>
            {/* Left: Main Logo */}
            <div className="flex shrink-0 justify-start md:flex-1">
              <Link href="/">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={97}
                  height={32}
                  className="h-auto w-20 md:w-24"
                />
              </Link>
            </div>

            {/* Center: Project Logos - hidden on mobile */}
            <div className="hidden flex-1 items-center justify-center px-2 pb-2 md:flex md:px-4 md:pb-0">
              <ProjectLogos />
            </div>

            {/* Right: Hamburger (mobile) / Social Links + Contact (desktop) */}
            <div className="flex flex-1 shrink-0 items-center justify-end gap-4 lg:gap-6">
              <div className="hidden md:flex md:items-center md:gap-4 lg:gap-6">
                <SocialLinks />
                <ContactButton onClick={onContactClick} />
              </div>
              <HamburgerButton
                isOpen={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              />
            </div>
          </>
        ) : (
          // Default layout: Social (left) | Logo (center) | Contact (right) - with scroll animations
          <>
            {/* Social links - hidden initially above page, slide down on scroll */}
            <motion.div
              className="flex flex-1 justify-start"
              style={{
                opacity: navElementsOpacity,
                y: navElementsY,
              }}
            >
              <SocialLinks />
            </motion.div>

            {/* Logo - always visible */}
            <div className="flex flex-1 justify-center">
              <Link href="/">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={97}
                  height={32}
                  className="h-auto w-18 md:w-24"
                />
              </Link>
            </div>

            {/* Contact button - hidden initially above page, slides down on scroll */}
            <motion.div
              className="flex flex-1 justify-end"
              style={{
                opacity: navElementsOpacity,
                y: navElementsY,
              }}
            >
              <ContactButton onClick={onContactClick} />
            </motion.div>
          </>
        )}
      </div>

      {/* Mobile Menu Content - only for projects page, expands within the same nav */}
      <AnimatePresence>
        {isProjects && isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="flex flex-col gap-6 overflow-hidden px-6 pb-6 md:hidden"
          >
            <ProjectLogos />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
