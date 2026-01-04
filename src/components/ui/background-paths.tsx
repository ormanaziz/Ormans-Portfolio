"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { TrackElementWithinViewport } from "@/components/ui/track-element-within-viewport";

function FloatingPaths({ position }: { position: number }) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${380 - i * 5 * position} -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${152 - i * 5 * position} ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${684 - i * 5 * position} ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    color: `rgba(15,23,42,${0.1 + i * 0.03})`,
    width: 0.5 + i * 0.03,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg className="w-full h-full text-foreground/80" viewBox="0 0 696 316" fill="none">
        <title>Background Paths</title>
        {paths.map((path) => {
          const duration = 20 + ((path.id * 7) % 10);
          return (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={0.1 + path.id * 0.03}
            initial={{ pathLength: 0.3, opacity: 0.6 }}
            animate={{
              pathLength: 1,
              opacity: [0.3, 0.6, 0.3],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        );
        })}
      </svg>
    </div>
  );
}

export function BackgroundPaths({
  title = "Orman",
}: {
  title?: string;
}) {
  const words = title.split(" ");
  const [showResume, setShowResume] = useState(false);
  const resumeRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (showResume && resumeRef.current) {
      resumeRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [showResume]);

  const handleDiscoverClick = () => {
    if (showResume) {
      resumeRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    setShowResume(true);
  };

  return (
    <div className="relative w-full bg-background text-foreground transition-colors duration-500">
      <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <FloatingPaths position={1} />
          <FloatingPaths position={-1} />
        </div>

        <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="mx-auto max-w-4xl"
          >
            <h1 className="mb-8 text-5xl font-bold tracking-tighter text-foreground sm:text-7xl md:text-8xl">
              {words.map((word, wordIndex) => (
                <span key={wordIndex} className="mr-4 inline-block last:mr-0">
                  {word.split("").map((letter, letterIndex) => (
                    <motion.span
                      key={`${wordIndex}-${letterIndex}`}
                      initial={{ y: 100, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        delay: wordIndex * 0.1 + letterIndex * 0.03,
                        type: "spring",
                        stiffness: 150,
                        damping: 25,
                      }}
                      className="inline-block"
                    >
                      {letter}
                    </motion.span>
                  ))}
                </span>
              ))}
            </h1>

            <p className="mx-auto mb-10 max-w-2xl text-lg text-foreground/80">
              Orchestrating products at the intersection of craft, systems, and AI.
              I lead multidisciplinary teams to ship experiences that feel inevitable.
            </p>

            <div className="group relative inline-block overflow-hidden rounded-2xl bg-gradient-to-b from-foreground/10 to-background/10 p-px shadow-lg backdrop-blur-lg transition-shadow duration-300 hover:shadow-xl">
              <Button
                onClick={handleDiscoverClick}
                variant="ghost"
                className="rounded-[1.15rem] border border-border/60 bg-background/80 px-8 py-6 text-lg font-semibold text-foreground transition-all duration-300 hover:bg-background hover:shadow-md group-hover:-translate-y-0.5"
              >
                <span className="transition-opacity opacity-90 group-hover:opacity-100">
                  Discover Excellence
                </span>
                <span className="ml-3 transition-all duration-300 opacity-70 group-hover:translate-x-1.5 group-hover:opacity-100">
                  →
                </span>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {showResume && (
          <motion.section
            ref={resumeRef}
            initial={{ opacity: 0, y: 120 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 120 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10 border-t border-border/40 bg-gradient-to-b from-background to-background/70 py-20"
          >
            <div className="container mx-auto px-4 md:px-6">
              <div className="mx-auto mb-12 max-w-3xl text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-foreground/60">
                  Resume
                </p>
                <h2 className="mt-4 text-4xl font-semibold tracking-tight text-foreground">
                  Personal Experience
                </h2>
                <p className="mt-4 text-base text-foreground/70">
                  Scroll down to explore a selection of my professional journey.
                </p>
              </div>

              <div className="mx-auto mb-16 max-w-4xl rounded-3xl border border-border/40 bg-gradient-to-b from-background/80 to-background/60 p-8 text-left shadow-[0_30px_80px_rgba(15,23,42,0.25)] backdrop-blur-lg md:p-10">
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-foreground/60">
                  About me
                </p>
                <p className="mt-6 text-lg leading-relaxed text-foreground/80">
                  Hello everyone! I am a recent UC San Diego graduate with a Bachelor's in Mathematics and Computer Science. I enjoy the mysteries of numbers and the magic of code. Beyond my technical interests, I love spending time with friends and family as well as taking care of my own health.
                </p>
              </div>

              <TrackElementWithinViewport />
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}

