import { Suspense } from "react";
import { ProjectsContent } from "./ProjectsContent";
import { Navbar } from "@/components/layout/Navbar";

export default function ProjectsPage() {

  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center bg-[#141414]">
          <div className="animate-pulse text-white/50"></div>
        </div>
      }
    >
      <ProjectsContent />
    </Suspense>
  );
}
