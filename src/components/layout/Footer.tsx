import Link from "next/link";
import { SocialLinks } from "./Navbar";

export function Footer() {
  return (
    <footer className="flex flex-col items-center gap-4 py-4 md:hidden">
      <SocialLinks size="large" />
      <Link
        href="tel:16170"
        className="flex flex-col items-center justify-center"
      >
        <p className="font-bold">CALL US AT</p>
        <p className="underline">16170</p>
      </Link>
      <div className="container mx-auto text-center text-sm">
        &copy; {new Date().getFullYear()} The Land Developers.
        <br />
        All rights reserved.
      </div>
    </footer>
  );
}
