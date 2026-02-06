"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useHomeScrollAnimations } from "@/hooks/useHomeScrollAnimations";
import { useNavbar } from "@/contexts/NavbarContext";
import { useSearchParams } from "next/navigation";

const projectLogos = [
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
  {
    src: "/logos/kukun.svg",
    alt: "Kukun Project",
    href: "/projects?project=kukun",
  },
];

function SocialLinks() {
  return (
    <div className="flex gap-6">
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
          className="size-5"
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
          className="size-5"
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
          className="size-5"
        />
      </Link>
    </div>
  );
}

function ContactButton() {
  return (
    <button className="px-6 py-2 text-sm font-medium tracking-wide">
      CONTACT US
    </button>
  );
}

function ProjectLogos() {
  const searchParams = useSearchParams();
  const project = searchParams.get("project");

  return (
    <div className="flex items-center gap-8">
      {projectLogos.map((logo) => {
        const projectKey = logo.href.split("project=")[1];
        return (
          <Link key={logo.alt} href={logo.href} scroll={false}>
            <Image
              src={logo.src}
              alt={logo.alt}
              width={120}
              height={40}
              className={`${project === projectKey ? "opacity-100" : "opacity-45"} ${projectKey === "ilbayou" ? "pt-2" : ""} h-8 w-auto hover:opacity-100 transition-opacity`}
            />
          </Link>
        );
      })}
    </div>
  );
}

export function Navbar() {
  const { variant } = useNavbar();
  const { navElementsY, navElementsOpacity } = useHomeScrollAnimations();

  const isProjects = variant === "projects";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xs bg-black/30 rounded-br-3xl w-full flex items-center rounded-bl-3xl h-20 px-8">
      {isProjects ? (
        // Projects layout: Logo (left) | Project logos (center) | Social + Contact (right)
        <>
          {/* Left: Main Logo */}
          <div className="flex-1 flex justify-start">
            <Link href="/">
              <Image
                src="/logo.png"
                alt="Logo"
                width={97}
                height={32}
                className="w-24 h-8"
              />
            </Link>
          </div>

          {/* Center: Project Logos */}
          <div className="flex-1 flex justify-center">
            <ProjectLogos />
          </div>

          {/* Right: Social Links + Contact */}
          <div className="flex-1 flex justify-end items-center gap-6">
            <SocialLinks />
            <ContactButton />
          </div>
        </>
      ) : (
        // Default layout: Social (left) | Logo (center) | Contact (right) - with scroll animations
        <>
          {/* Social links - hidden initially above page, slide down on scroll */}
          <motion.div
            className="flex-1 flex justify-start"
            style={{
              opacity: navElementsOpacity,
              y: navElementsY,
            }}
          >
            <SocialLinks />
          </motion.div>

          {/* Logo - always visible */}
          <div className="flex-1 flex justify-center">
            <Link href="/">
              <Image
                src="/logo.png"
                alt="Logo"
                width={97}
                height={32}
                className="w-24 h-8"
              />
            </Link>
          </div>

          {/* Contact button - hidden initially above page, slides down on scroll */}
          <motion.div
            className="flex-1 flex justify-end"
            style={{
              opacity: navElementsOpacity,
              y: navElementsY,
            }}
          >
            <ContactButton />
          </motion.div>
        </>
      )}
    </nav>
  );
}
