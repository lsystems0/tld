"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { EmblaCarousel } from "@/components/ui/EmblaCarousel";
import { InquiryForm } from "@/components/InquiryForm";
import { motion, AnimatePresence } from "framer-motion";
import { BracketedChild } from "@/components/ui/BracketedChild";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

function FadeImage({
  src,
  alt,
  className,
  width,
  height,
  priority,
}: {
  src: {
    desktop: string;
    mobile: string;
  };
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="absolute inset-0"
    >
      <Image
        src={src.desktop}
        alt={alt}
        className={`${className || ""} hidden h-full w-full object-cover md:block`}
        width={width}
        height={height}
        priority={priority}
      />
      <Image
        src={src.mobile}
        alt={alt}
        className={`${className || ""} h-full w-full object-contain md:hidden`}
        width={width}
        height={height}
        priority={priority}
      />
    </motion.div>
  );
}

function FadeContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ProjectsContent() {
  const searchParams = useSearchParams();
  const project = searchParams.get("project");
  const [currentProject, setCurrentProject] = useState(project);

  const projectData = PROJECTS.find((p) => p.id === currentProject);

  useEffect(() => {
    if (project && project !== currentProject) {
      setCurrentProject(project);

      const startPosition = window.scrollY;
      const duration = 1200;
      const startTime = performance.now();
      const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

      const animateScroll = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutCubic(progress);
        window.scrollTo(0, startPosition * (1 - easedProgress));
        if (progress < 1) requestAnimationFrame(animateScroll);
      };
      requestAnimationFrame(animateScroll);
    }
  }, [project, currentProject]);

  const handleContactClick = () => {
    const contactSection = document.querySelector("#gallery-form");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (!projectData) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#141414]">
        <div className="animate-pulse text-white/50">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <Navbar variant="projects" onContactClick={handleContactClick} />
      <div className="min-h-screen bg-[#141414]">
        {/* Hero Section */}
        <section className="relative flex h-[85vh] items-center justify-center overflow-hidden text-center">
          <AnimatePresence mode="popLayout">
            <FadeImage
              key={`hero-${currentProject}`}
              src={projectData.hero_img}
              alt={projectData.name}
              width={1920}
              height={1080}
              priority
            />
          </AnimatePresence>
        </section>

        {/* Description Section */}
        <section className="flex flex-col items-center justify-center gap-8 px-0 pt-8 pb-14 md:p-12 lg:flex-row lg:gap-16 lg:p-24">
          <div className="flex w-full flex-col gap-8 p-6 md:p-0 lg:max-w-[40%] lg:flex-[40%] lg:gap-16">
            <div className="relative flex flex-col items-start justify-between gap-4">
              <div className="relative h-12 w-full md:h-14 md:w-72.5">
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={`logo-${currentProject}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="absolute inset-0 flex items-center"
                  >
                    <Image
                      src={projectData.logo}
                      width={290}
                      height={56}
                      alt={projectData.name + " logo"}
                      className="h-12 w-auto object-contain md:h-14"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
              <Link
                href={projectData.brochure}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm whitespace-nowrap underline md:text-base"
              >
                DOWNLOAD BROCHURE
              </Link>
            </div>
            <div className="relative min-h-30 md:min-h-37.5 lg:min-h-50">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={`desc-${currentProject}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  <p className="text-sm leading-relaxed md:text-base">
                    {projectData.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          <div className="relative h-60 w-full md:h-80 lg:flex-[60%]">
            <AnimatePresence mode="popLayout">
              <FadeContent
                key={`desc-img-${currentProject}`}
                className="absolute inset-0"
              >
                <Image
                  src={projectData.description_img}
                  width={835}
                  height={418}
                  className="h-full w-full object-contain"
                  alt=""
                />
              </FadeContent>
            </AnimatePresence>
          </div>
        </section>

        {/* Gallery and Form Section */}
        <section
          id="gallery-form"
          className="flex flex-col-reverse gap-8 pb-12 md:flex-col md:px-12 md:pb-24 lg:flex-row lg:gap-30 lg:px-24"
        >
          <div
            id="project-gallery"
            className="relative order-2 h-64 w-full md:h-80 lg:order-1 lg:h-104 lg:max-w-[60%] lg:flex-[60%]"
          >
            <AnimatePresence mode="popLayout">
              <FadeContent
                key={`gallery-${currentProject}`}
                className="absolute inset-0"
              >
                <EmblaCarousel
                  images={projectData.gallery}
                  className="h-full"
                />
              </FadeContent>
            </AnimatePresence>
          </div>
          <div
            id="inquiry-form"
            className="relative order-1 flex w-full flex-col gap-6 px-6 md:px-0 lg:order-2 lg:max-w-[40%] lg:flex-[40%] lg:gap-11"
          >
            <p className="text-xl md:text-2xl">Fill the form for more info</p>
            <InquiryForm inquiringForm={projectData.name} />
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

const PROJECTS = [
  {
    id: "armonia",
    name: "Armonia",
    logo: "/logos/armonia.svg",
    brochure:
      "https://drive.google.com/file/d/1A7qYOM9gZTLfWKeal28oZit00VPvfWRM/view",
    description:
      "Discover a rhythm of life where nature and architecture coexist. Armonia, located in the heart of the New Capital's R7 district, offers a rare standard of living across 42 acres, exclusively featuring stand-alone buildings. Designed for privacy without isolation, it's more than a home, it's a daily practice in balance, comfort, and peace, where every element harmonizes with its surroundings to elevate everyday life.",
    description_img:
      "https://yvxmjnhe4p.ufs.sh/f/DlMPtHS05XgUbXfuNLm8zh4rOgUWebVZFDnA1NdTmpo6u7fc",
    hero_img: {
      desktop:
        "https://yvxmjnhe4p.ufs.sh/f/DlMPtHS05XgUsP6Lhk9tcYkA3boXP8aFfpWyTl4wnhrLBOde",
      mobile:
        "https://yvxmjnhe4p.ufs.sh/f/DlMPtHS05XgUM7ZcyW7XtFquGZS9IC4idahYjrWKNDkgElHc",
    },
    gallery: [
      "https://yvxmjnhe4p.ufs.sh/f/DlMPtHS05XgUcdIIpQAEm9OA7hCnkDJ6KoULdluYz1ZexrHf",
      "https://yvxmjnhe4p.ufs.sh/f/DlMPtHS05XgUpcPciXlnRgmws3BiOYMLfd4A9FPIQ6eEDGko",
      "https://yvxmjnhe4p.ufs.sh/f/DlMPtHS05XgUwXM2jpsYkxvyHDt7MbnhZsP3RiomYcKlIdpr",
      "https://yvxmjnhe4p.ufs.sh/f/DlMPtHS05XgUy0bB9N2lWTpPnz9uk7c5tQEFxOw2BGgeHSXU",
      "https://yvxmjnhe4p.ufs.sh/f/DlMPtHS05XgU2ZBSE2wjJQ7gcmVUaA8SrXPtIp6KDzk0w9Ro",
      "https://yvxmjnhe4p.ufs.sh/f/DlMPtHS05XgU5o1i5mJgtm0Df4R7MWkOawGsSoxI2UpLcNXv",
      "https://yvxmjnhe4p.ufs.sh/f/DlMPtHS05XgUgKQxakPbZw24lETdoxuyrnp8Uf3RQXPL09BD",
      "https://yvxmjnhe4p.ufs.sh/f/DlMPtHS05XgUXfYNNBTMo3e5JNistYa0qELOG8zX2w1vWRPK",
    ],
  },
  {
    id: "ilbayou",
    name: "Il Bayou",
    logo: "/logos/ilbayou.svg",
    brochure:
      "https://drive.google.com/file/d/1wR-vo-NwooVIYNugXmlQk2ZcnR-vhYDU/view",
    description:
      "il bayou is an exclusive fully-serviced compound nestled along the pristine shores of Sahl Hasheesh, Red Sea. Spanning 30 acres, it offers a rare balance between tranquility and accessibility, with beautifully crafted chalets and townhouses. Designed to harmonize with nature, il bayou provides a sanctuary of beauty and relaxation, where every element invites serenity and enhances the coastal living experience. With its seamless connection to both nature and community, this destination delivers a unique, year-round Red Sea experience.",
    description_img:
      "https://yvxmjnhe4p.ufs.sh/f/DlMPtHS05XgUKr5ii5FhEdFokqmHTMRUPXaNSJl8tDzh5Afu",
    hero_img: {
      desktop:
        "https://yvxmjnhe4p.ufs.sh/f/DlMPtHS05XgUMUi6kMXtFquGZS9IC4idahYjrWKNDkgElHcV",
      mobile:
        "https://yvxmjnhe4p.ufs.sh/f/DlMPtHS05XgU52nOuiJgtm0Df4R7MWkOawGsSoxI2UpLcNXv",
    },
    gallery: [
      "https://yvxmjnhe4p.ufs.sh/f/DlMPtHS05XgUgDBqzNfPbZw24lETdoxuyrnp8Uf3RQXPL09B",
      "https://yvxmjnhe4p.ufs.sh/f/DlMPtHS05XgUVNleEwDB1OP76Vy9KELhGioZFCS8IcNvWDM0",
      "https://yvxmjnhe4p.ufs.sh/f/DlMPtHS05XgUYTfuSIVMAlMGPmEOI0k8oKC5j7T9drBWfFXg",
      "https://yvxmjnhe4p.ufs.sh/f/DlMPtHS05XgUAP1fVgqpACgowyT1VWNGu0B8mjPan7RMHfEJ",
      "https://yvxmjnhe4p.ufs.sh/f/DlMPtHS05XgUPS8tdpVsdjAGL38J4QrUOMgt6v9XlfzZI25V",
      "https://yvxmjnhe4p.ufs.sh/f/DlMPtHS05XgUXNEQlTMo3e5JNistYa0qELOG8zX2w1vWRPKU",
      "https://yvxmjnhe4p.ufs.sh/f/DlMPtHS05XgUCmAX7ZsF0HrBStzUDPTOsY4mKpAhV5deyqMi",
      "https://yvxmjnhe4p.ufs.sh/f/DlMPtHS05XgUPkkx7KVsdjAGL38J4QrUOMgt6v9XlfzZI25V",
      "https://yvxmjnhe4p.ufs.sh/f/DlMPtHS05XgUxfRngGIKqFXmAIS8YBhWMkyGrNe3R9JD5w7l",
    ],
  },
  {
    id: "kukun",
    name: "Kukun",
    logo: "/logos/kukun.svg",
    brochure:
      "https://drive.google.com/file/d/1pwY58cR-AsjDnOSjTRdzmO2CRP9JVoQI/view",
    description:
      "Kukūn is a wellness-integrated boutique compound in the heart of Mostakbal City, designed to balance privacy and community with refined architecture and a lifestyle-driven vision. Spanning 20 acres, the development features landscaped valleys, a central canal, and a wellness-focused clubhouse that cultivates connection, calm, and belonging. Offering a unique blend of townhouses, Kukūn is where luxury meets purpose, creating an environment that encourages relaxation, mindfulness, and modern living.",
    description_img:
      "https://yvxmjnhe4p.ufs.sh/f/DlMPtHS05XgUesgsu73QKu049YfMCrcjH67XdsEi3v1SLbh5",
    hero_img: {
      desktop:
        "https://yvxmjnhe4p.ufs.sh/f/DlMPtHS05XgUQiACkTSdIfyX6DvbAHqLRuSY5TOs2woGkEh1",
      mobile:
        "https://yvxmjnhe4p.ufs.sh/f/DlMPtHS05XgUmChVkZ6Qnq4XxVGZRJzdtCyPoFlrw9sbaNvB",
    },
    gallery: [
      "https://yvxmjnhe4p.ufs.sh/f/DlMPtHS05XgU5RBBwfJgtm0Df4R7MWkOawGsSoxI2UpLcNXv",
      "https://yvxmjnhe4p.ufs.sh/f/DlMPtHS05XgU8mL6PdgyhnKtk2DMdX34OY9jvAel1EqLBGxU",
      "https://yvxmjnhe4p.ufs.sh/f/DlMPtHS05XgUjrMuvJbq9y6stNuaWYPgB7h0FoeVMrAcOfmG",
    ],
  },
] as const;