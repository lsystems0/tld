export function WeDontRush() {
  return (
    <div className="relative mx-6 px-0 py-0 md:px-6 md:py-5">
      {/* Top right corner */}
      <div className="bg-tld-yellow absolute -top-2 -right-2 h-2 w-6 md:h-3 md:w-8" />
      <div className="bg-tld-yellow absolute -top-2 -right-2 h-6 w-2 md:h-8 md:w-3" />

      {/* Bottom left corner */}
      <div className="bg-tld-yellow absolute -bottom-2 -left-2 h-2 w-6 md:h-3 md:w-8" />
      <div className="bg-tld-yellow absolute -bottom-2 -left-2 h-6 w-2 md:h-8 md:w-3" />

      <div>
        <p className="z-1 px-4 text-lg whitespace-nowrap md:text-2xl">
          WE DON&apos;T RUSH FOUNDATIONS,
        </p>
        <p className="z-1 px-4 text-lg md:text-2xl">EVEN ONLINE.</p>
      </div>
    </div>
  );
}
