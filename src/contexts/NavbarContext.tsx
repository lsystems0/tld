"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type NavbarVariant = "default" | "projects";

interface NavbarContextType {
  variant: NavbarVariant;
  setVariant: (variant: NavbarVariant) => void;
}

const NavbarContext = createContext<NavbarContextType | undefined>(undefined);

export function NavbarProvider({ children }: { children: ReactNode }) {
  const [variant, setVariant] = useState<NavbarVariant>("default");

  return (
    <NavbarContext.Provider value={{ variant, setVariant }}>
      {children}
    </NavbarContext.Provider>
  );
}

export function useNavbar() {
  const context = useContext(NavbarContext);
  if (context === undefined) {
    throw new Error("useNavbar must be used within a NavbarProvider");
  }
  return context;
}
