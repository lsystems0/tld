import Link from "next/link";
import { SocialLinks } from "./Navbar";

export function Footer() {
  return (
    <footer className="flex flex-col items-center gap-4 py-4 md:hidden">
      <SocialLinks size="large" />
      <div className="container mx-auto text-center text-sm">
        &copy; {new Date().getFullYear()} The Land Developers.
        <br />
        All rights reserved.
      </div>
    </footer>
  );
}
