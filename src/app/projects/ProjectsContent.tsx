"use client";
import { useEffect, useState } from "react";
import { useNavbar } from "@/contexts/NavbarContext";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { EmblaCarousel } from "@/components/ui/EmblaCarousel";
import { InquiryForm } from "@/components/InquiryForm";
import { motion, AnimatePresence } from "framer-motion";

const fadeTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.5, ease: "easeInOut" as const },
};

function FadeImage({
  src,
  alt,
  className,
  ...props
}: {
  src: string;
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
        src={src}
        alt={alt}
        className={`${className || ""} w-full h-full object-cover`}
        {...props}
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

  const { setVariant } = useNavbar();

  useEffect(() => {
    setVariant("projects");
  }, [setVariant]);

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

  if (!projectData) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#141414]">
        <div className="animate-pulse text-white/50">Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-[#141414] min-h-screen">
      {/* Hero Section */}
      <section className="flex items-center justify-center h-[85vh] relative text-center overflow-hidden">
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

        <p className="text-xl md:text-2xl z-1 relative">
          WE DON&apos;T RUSH FOUNDATIONS,
          <br /> EVEN ONLINE.
        </p>
        <div className="flex w-screen justify-between absolute inset-x-0 px-8 md:px-24 bottom-8 items-center z-1">
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
        </div>
      </section>

      {/* Description Section */}
      <section className="flex gap-16 p-24 items-center justify-center">
        <div className="flex flex-col gap-16 flex-40">
          <div className="flex justify-between items-center relative">
            <div className="relative h-14 w-72.5">
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
                    className="w-auto h-14 object-contain"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
            <Link href="#" className="underline ml-4">
              DOWNLOAD BROCHURE
            </Link>
          </div>
          <div className="relative min-h-[200px]">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={`desc-${currentProject}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <p>{projectData.description}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <div className="flex-60 relative h-104">
          <AnimatePresence mode="popLayout">
            <FadeContent
              key={`desc-img-${currentProject}`}
              className="absolute inset-0"
            >
              <Image
                src={projectData.description_img}
                width={835}
                height={418}
                className="w-full h-full object-contain"
                alt=""
              />
            </FadeContent>
          </AnimatePresence>
        </div>
      </section>

      {/* Gallery and Form Section */}
      <section className="flex gap-30 px-24 pb-24">
        <div id="project-gallery" className="flex-60 relative h-104">
          <AnimatePresence mode="popLayout">
            <FadeContent
              key={`gallery-${currentProject}`}
              className="absolute inset-0"
            >
              <EmblaCarousel images={projectData.gallery} className="h-full" />
            </FadeContent>
          </AnimatePresence>
        </div>
        <div
          id="inquiry-form"
          className="flex-40 flex flex-col gap-11 relative"
        >
          <AnimatePresence mode="popLayout">
            <FadeContent
              key={`form-${currentProject}`}
              className="flex flex-col gap-11"
            >
              <p className="text-2xl">Fill the form for more info</p>
              <InquiryForm inquiringForm={projectData.name} />
            </FadeContent>
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}

const PROJECTS = [
  {
    id: "armonia",
    name: "Armonia",
    logo: "/logos/armonia.svg",
    description:
      "Discover a rhythm of life where nature and architecture coexist. Armonia, located in the heart of the New Capital's R7 district, offers a rare standard of living across 42 acres, exclusively featuring stand-alone buildings. Designed for privacy without isolation, it's more than a home, it's a daily practice in balance, comfort, and peace, where every element harmonizes with its surroundings to elevate everyday life.",
    description_img:
      "https://yvxmjnhe4p.ufs.sh/f/DlMPtHS05XgUbXfuNLm8zh4rOgUWebVZFDnA1NdTmpo6u7fc",
    hero_img:
      "https://yvxmjnhe4p.ufs.sh/f/DlMPtHS05XgUDSBS4H05XgUufbkFidheEQ67YyqGSTKnL4jD",
    gallery: [
      "https://yvxmjnhe4p.ufs.sh/f/DlMPtHS05XgUXAoKoITMo3e5JNistYa0qELOG8zX2w1vWRPK",
      "https://yvxmjnhe4p.ufs.sh/f/DlMPtHS05XgU2rR1TxwjJQ7gcmVUaA8SrXPtIp6KDzk0w9Ro",
      "https://yvxmjnhe4p.ufs.sh/f/DlMPtHS05XgUFIN1NB8XVmCgMkO24LYuBpjZ7fUeKiqaIh6n",
    ],
  },
  {
    id: "ilbayou",
    name: "Il Bayou",
    logo: "/logos/ilbayou.svg",
    description:
      "il bayou is an exclusive fully-serviced compound nestled along the pristine shores of Sahl Hasheesh, Red Sea. Spanning 30 acres, it offers a rare balance between tranquility and accessibility, with beautifully crafted chalets and townhouses. Designed to harmonize with nature, il bayou provides a sanctuary of beauty and relaxation, where every element invites serenity and enhances the coastal living experience. With its seamless connection to both nature and community, this destination delivers a unique, year-round Red Sea experience.",
    description_img:
      "https://yvxmjnhe4p.ufs.sh/f/DlMPtHS05XgUKr5ii5FhEdFokqmHTMRUPXaNSJl8tDzh5Afu",
    hero_img:
      "https://yvxmjnhe4p.ufs.sh/f/DlMPtHS05XgUAIig3LqpACgowyT1VWNGu0B8mjPan7RMHfEJ",
    gallery: [
      "https://yvxmjnhe4p.ufs.sh/f/DlMPtHS05XgUOxV16XUNWDGbqk3VnXtS7QfAUB5aT80pZioz",
      "https://yvxmjnhe4p.ufs.sh/f/DlMPtHS05XgUM7Nv0IyXtFquGZS9IC4idahYjrWKNDkgElHc",
      "https://yvxmjnhe4p.ufs.sh/f/DlMPtHS05XgUUvXmgYiIDXg7GsfYQrhFW10RdlJB9CntqTNk",
    ],
  },
  {
    id: "kukun",
    name: "Kukun",
    logo: "/logos/kukun.svg",
    description:
      "Kukūn is a wellness-integrated boutique compound in the heart of Mostakbal City, designed to balance privacy and community with refined architecture and a lifestyle-driven vision. Spanning 20 acres, the development features landscaped valleys, a central canal, and a wellness-focused clubhouse that cultivates connection, calm, and belonging. Offering a unique blend of townhouses, Kukūn is where luxury meets purpose, creating an environment that encourages relaxation, mindfulness, and modern living.",
    description_img:
      "https://yvxmjnhe4p.ufs.sh/f/DlMPtHS05XgUesgsu73QKu049YfMCrcjH67XdsEi3v1SLbh5",
    hero_img:
      "https://yvxmjnhe4p.ufs.sh/f/DlMPtHS05XgU0IrKBBpQHwPTbFXjBnRVIDCWoGhm7ukr1KaY",
    gallery: [
      "https://yvxmjnhe4p.ufs.sh/f/DlMPtHS05XgU5RBBwfJgtm0Df4R7MWkOawGsSoxI2UpLcNXv",
      "https://yvxmjnhe4p.ufs.sh/f/DlMPtHS05XgU8mL6PdgyhnKtk2DMdX34OY9jvAel1EqLBGxU",
      "https://yvxmjnhe4p.ufs.sh/f/DlMPtHS05XgUjrMuvJbq9y6stNuaWYPgB7h0FoeVMrAcOfmG",
    ],
  },
] as const;
