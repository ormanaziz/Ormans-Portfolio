"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

import { cn } from "@/lib/utils";

type ResumeHighlight = {
  title: string;
  organization: string;
  period: string;
  location: string;
  focus: string;
  summary: string;
  achievements: string[];
  keywords: string[];
};

const resumeHighlights: ReadonlyArray<ResumeHighlight> = [
  {
    title: "Software Engineer Intern",
    organization: "Tintype",
    period: "Sep 2025 — Dec 2025",
    location: "Walnut Creek, CA",
    focus: "",
    summary:
      "Integrated AI features, developed the core product using Next.js, TypeScript, and CSS.",
    achievements: [
    ],
    keywords: ["Next.js", "TypeScript", "CSS"],
  },
  {
    title: "Financial Analyst",
    organization: "SugaCards",
    period: "Jan 2022 — Dec 2024",
    location: "San Francisco, CA",
    focus:"",
    summary:
      "I was responsible for tracking our team’s sales and analyzed revenue data to help the company make better financial decisions.",
    achievements: [
      
    ],
    keywords: ["Financial Analysis", "Revenue", "Decision making"],
  },
  {
    title: "Server & Floor Lead",
    organization: "Fuego",
    period: "Jan 2019 — Jan 2022",
    location: "Walnut Creek, CA",
    focus: "Hospitality/Leadership",
    summary:
      "Led a team of servers managing up to 10 tables simultaneously.",
    achievements: [
        "Acted as the go-to person for troubleshooting and fixing the POS system during technical issues.",
        "Trained and mentored junior servers on service best practices and POS system usage."
    ],
    keywords: ["Team Leadership", "Customer Experience", "Teamwork"],
  },
];

interface ResumeEntryProps {
  entry: ResumeHighlight;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
  isActive: boolean;
}

function ResumeEntry({ entry, index, total, scrollYProgress, isActive }: ResumeEntryProps) {
  const start = index / total;
  const end = (index + 1) / total;
  const progress = useTransform(scrollYProgress, [start, end], [0, 1]);
  const translateY = useTransform(progress, [0, 1], [32, 0]);
  const opacity = useTransform(progress, [0, 1], [0.4, 1]);

  return (
    <article className="relative">
      <motion.div
        style={{ y: translateY, opacity }}
        className={cn(
          "group rounded-3xl border border-border/50 bg-gradient-to-br from-background/80 via-background/40 to-background/90 p-8 backdrop-blur-xl shadow-[0_20px_80px_rgba(15,23,42,0.2)]",
          isActive && "border-foreground/60"
        )}
      >
        <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.4em] text-foreground/60">
          <span>{entry.period}</span>
          <span className="hidden h-px w-16 bg-foreground/20 md:block" aria-hidden />
          <span>{entry.location}</span>
          <span className="hidden h-px w-16 bg-foreground/20 md:block" aria-hidden />
          <span>{entry.focus}</span>
        </div>

        <div className="mt-6 flex flex-wrap items-baseline gap-x-4 gap-y-2">
          <h3 className="text-2xl font-semibold tracking-tight text-foreground">
            {entry.title}
          </h3>
          <p className="text-base text-foreground/70">{entry.organization}</p>
        </div>

        <p className="mt-4 text-lg text-foreground/80">{entry.summary}</p>

        <ul className="mt-6 space-y-3 text-sm text-foreground/80">
          {entry.achievements.map((achievement) => (
            <li
              key={achievement}
              className="flex gap-3 leading-relaxed text-foreground/75"
            >
              <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-foreground/60" aria-hidden />
              <span>{achievement}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-2">
          {entry.keywords.map((keyword) => (
            <span
              key={keyword}
              className="rounded-full border border-border/60 px-3 py-1 text-xs uppercase tracking-widest text-foreground/70"
            >
              {keyword}
            </span>
          ))}
        </div>
      </motion.div>

      <div className="pointer-events-none absolute -left-8 top-8 hidden md:flex flex-col items-center" aria-hidden>
        <motion.span
          animate={{ scale: isActive ? 1.4 : 1 }}
          transition={{ type: "spring", stiffness: 250, damping: 18 }}
          className={cn(
            "grid h-4 w-4 place-items-center rounded-full border border-foreground/60 bg-background",
            isActive && "bg-foreground text-background"
          )}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-foreground" />
        </motion.span>
        <span className="mt-2 text-xs font-semibold tracking-[0.3em] text-foreground/40">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
    </article>
  );
}

export function TrackElementWithinViewport() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.6", "end 0.3"],
  });

  const total = resumeHighlights.length || 1;
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.2,
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const nextIndex = Math.min(
      total - 1,
      Math.max(0, Math.round(value * (total - 1)))
    );

    setActiveIndex((prev) => (prev === nextIndex ? prev : nextIndex));
  });

  return (
    <div className="relative">
      <div className="pointer-events-none absolute left-0 top-0 hidden h-full w-10 items-center justify-center md:flex">
        <motion.span
          className="h-4/5 w-[2px] rounded bg-gradient-to-b from-foreground/40 via-foreground/70 to-foreground/40"
          style={{ scaleY: progress, originY: 0 }}
        />
      </div>

      <section
        ref={containerRef}
        className="space-y-12 md:pl-16"
        aria-label="Experience timeline"
      >
        {resumeHighlights.map((entry, index) => (
          <ResumeEntry
            key={`${entry.title}-${entry.organization}`}
            entry={entry}
            index={index}
            total={total}
            scrollYProgress={scrollYProgress}
            isActive={index === activeIndex}
          />
        ))}
      </section>
    </div>
  );
}
