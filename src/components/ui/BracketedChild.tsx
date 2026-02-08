import { PropsWithChildren } from "react";

export function BracketedChild({
  children,
  spacing,
}: PropsWithChildren<{ spacing: "normal" | "wide" }>) {
  return (
    <div
      className={`relative flex ${spacing === "wide" ? "h-18 w-96 md:h-32 md:w-lg" : "h-16 w-70 md:h-24 md:w-96"} items-center justify-center`}
    >
      {/* Top right corner */}
      <div className="bg-tld-yellow absolute -top-2 -right-2 h-2 w-6 md:h-3 md:w-8" />
      <div className="bg-tld-yellow absolute -top-2 -right-2 h-6 w-2 md:h-8 md:w-3" />

      {/* Bottom left corner */}
      <div className="bg-tld-yellow absolute -bottom-2 -left-2 h-2 w-6 md:h-3 md:w-8" />
      <div className="bg-tld-yellow absolute -bottom-2 -left-2 h-6 w-2 md:h-8 md:w-3" />

      <div>{children}</div>
    </div>
  );
}

/*
        <p className="z-1 px-4 text-lg whitespace-nowrap md:text-2xl">
          WE DON&apos;T RUSH FOUNDATIONS,
        </p>
        <p className="z-1 px-4 text-lg md:text-2xl">EVEN ONLINE.</p>
        */
