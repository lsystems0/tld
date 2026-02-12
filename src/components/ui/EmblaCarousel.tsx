"use client";

import { useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";

interface CarouselProps {
  images: readonly string[];
  className?: string;
  contain?: boolean;
}

export function EmblaCarousel({
  images,
  className = "",
  contain = false,
}: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const handleSelect = () => {
      // Handle select events if needed
    };

    emblaApi.on("select", handleSelect);

    return () => {
      emblaApi.off("select", handleSelect);
    };
  }, [emblaApi]);

  if (images.length === 0) return null;

  return (
    <div className={`relative ${className}`}>
      <div className="h-full overflow-hidden" ref={emblaRef}>
        <div className="flex h-full">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative h-full min-h-0 min-w-0 flex-[0_0_100%]"
            >
              <Image
                src={image}
                alt={`Gallery image ${index + 1}`}
                fill
                className={`${contain ? "object-contain" : "object-cover"}`}
              />
            </div>
          ))}
        </div>
      </div>

      {images.length > 1 && (
        <>
          <button
            onClick={scrollPrev}
            className="absolute top-1/2 left-4 z-10 -translate-y-1/2 p-2 transition-opacity hover:opacity-80"
            aria-label="Previous slide"
          >
            <svg
              width="17"
              height="24"
              viewBox="0 0 17 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="rotate-180"
            >
              <path
                d="M4.85554 0L0 4.79833L7.28612 11.9986L0 19.1989L4.85835 24L17 12.0014L4.85554 0Z"
                fill="white"
                fillOpacity="0.4"
              />
            </svg>
          </button>

          <button
            onClick={scrollNext}
            className="absolute top-1/2 right-4 z-10 -translate-y-1/2 p-2 transition-opacity hover:opacity-80"
            aria-label="Next slide"
          >
            <svg
              width="17"
              height="24"
              viewBox="0 0 17 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.85554 0L0 4.79833L7.28612 11.9986L0 19.1989L4.85835 24L17 12.0014L4.85554 0Z"
                fill="white"
                fillOpacity="0.4"
              />
            </svg>
          </button>
        </>
      )}
    </div>
  );
}
