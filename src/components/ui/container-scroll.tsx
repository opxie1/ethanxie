import React, { useRef, useState, useEffect } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

interface HeaderProps {
  translate: any;
  titleComponent: React.ReactNode;
}

function Header({ translate, titleComponent }: HeaderProps) {
  return (
    <motion.div
      role="banner"
      aria-live="polite"
      style={{ translateY: translate }}
      className="max-w-5xl mx-auto text-center"
    >
      {titleComponent}
    </motion.div>
  );
}

interface CardProps {
  rotateX: any;
  scale: any;
  children: React.ReactNode;
}

function ScrollCard({ rotateX, scale, children }: CardProps) {
  return (
    <motion.div
      style={{ scale, rotateX, transformPerspective: "1200px" }}
      className="max-w-5xl mx-auto w-full"
    >
      <div className="w-full overflow-hidden rounded-2xl">
        {children}
      </div>
    </motion.div>
  );
}

interface ContainerScrollProps {
  titleComponent: React.ReactNode;
  children: React.ReactNode;
}

export default function ContainerScroll({ titleComponent, children }: ContainerScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 768);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scaleRange: [number, number] = isMobile ? [0.7, 0.9] : [1.05, 1];
  const rotateX = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleRange);
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div
      className="flex items-center justify-center relative py-20"
      ref={containerRef}
    >
      <div className="w-full relative" style={{ perspective: "1000px" }}>
        <Header translate={translate} titleComponent={titleComponent} />
        <ScrollCard rotateX={rotateX} scale={scale}>
          {children}
        </ScrollCard>
      </div>
    </div>
  );
}
