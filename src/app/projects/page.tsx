"use client";
import { useEffect } from "react";
import { useNavbar } from "@/contexts/NavbarContext";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function ProjectsPage() {
  const searchParams = useSearchParams();
  const project = searchParams.get("project");

  const projectData = PROJECTS.find((p) => p.id === project);

  const { setVariant } = useNavbar();

  useEffect(() => {
    setVariant("projects");
    return () => {
      setVariant("default");
    };
  }, [setVariant]);

  if (!projectData) {
    return <></>;
  }

  return (
    <div className="bg-[#141414]">
      <section className="flex items-center justify-center h-[85vh] relative text-center">
        <Image
          src={projectData.hero_img}
          alt={projectData.name}
          width={1920}
          height={1080}
          className="absolute inset-0 w-full h-full object-cover -z-1"
        />
        <p className="text-xl md:text-2xl">
          WE DON&apos;T RUSH FOUNDATIONS,
          <br /> EVEN ONLINE.
        </p>
        <div className="flex w-screen justify-between absolute inset-x-0 px-8 md:px-24 bottom-8 items-center">
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

      <section className="flex gap-16 p-24 items-center justify-center">
        <div className="flex flex-col gap-16 flex-40">
          <div className="flex justify-between items-center">
            <Image
              src={projectData.logo}
              width={290}
              height={56}
              alt={projectData.name + " logo"}
            />
            <Link href="#" className="underline">
              DOWNLOAD BROCHURE
            </Link>
          </div>
          <p>{projectData.description}</p>
        </div>
        <div className="flex-60">
          <Image
            src={projectData.description_img}
            width={835}
            height={418}
            className="w-208 h-104 object-contain"
            alt=""
          />
        </div>
      </section>

      <section className="flex "></section>
    </div>
  );
}

const PROJECTS = [
  {
    id: "armonia",
    name: "Armonia",
    logo: "/logos/armonia.svg",
    description:
      "Discover a rhythm of life where nature and architecture coexist. Armonia, located in the heart of the New Capital’s R7 district, offers a rare standard of living across 42 acres, exclusively featuring stand-alone buildings. Designed for privacy without isolation, it’s more than a home, it’s a daily practice in balance, comfort, and peace, where every element harmonizes with its surroundings to elevate everyday life.",
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
