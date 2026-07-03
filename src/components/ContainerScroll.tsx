"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, useSpring, motion, type MotionValue } from "framer-motion";

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });
  // Spring-smoothed progress makes the tilt feel fluid instead of stepped
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    mass: 0.4,
  });
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.75, 0.95] : [1.04, 1];
  };

  const rotate = useTransform(smoothProgress, [0, 1], [16, 0]);
  const scale = useTransform(smoothProgress, [0, 1], scaleDimensions());
  const translate = useTransform(smoothProgress, [0, 1], [0, -80]);
  const glow = useTransform(smoothProgress, [0, 1], [0.15, 0.45]);

  return (
    <div
      className="h-[55rem] md:h-[72rem] flex items-center justify-center relative p-2 md:p-16"
      ref={containerRef}
    >
      <div
        className="py-10 md:py-32 w-full relative"
        style={{
          perspective: "1100px",
        }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} translate={translate} scale={scale} glow={glow}>
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({ translate, titleComponent }: { translate: MotionValue<number>; titleComponent: React.ReactNode }) => {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="div max-w-5xl mx-auto text-center"
    >
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({
  rotate,
  scale,
  glow,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translate: MotionValue<number>;
  glow: MotionValue<number>;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          "0 9px 20px rgba(8, 4, 20, 0.35), 0 37px 50px rgba(8, 4, 20, 0.3), 0 84px 80px rgba(124, 58, 237, 0.12)",
      }}
      className="max-w-5xl -mt-12 mx-auto h-[30rem] md:h-[40rem] w-full rounded-[28px] border border-white/10 bg-gradient-to-b from-[#1d1738] to-[#0c0820] p-2 md:p-4 relative"
    >
      {/* Soft nebula rim light that intensifies as the card settles */}
      <motion.div
        aria-hidden="true"
        className="absolute -inset-px rounded-[28px] pointer-events-none"
        style={{
          opacity: glow,
          background:
            "linear-gradient(135deg, rgba(139, 92, 246, 0.35), transparent 30%, transparent 70%, rgba(217, 70, 239, 0.3))",
          maskImage: "linear-gradient(#000, #000), linear-gradient(#000, #000)",
        }}
      />
      <div className="h-full w-full overflow-hidden rounded-2xl bg-[#0c0820] relative">
        {children}
      </div>
    </motion.div>
  );
};
