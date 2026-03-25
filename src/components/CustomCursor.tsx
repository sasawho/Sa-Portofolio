import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handlePointer = () => setIsPointer(true);
    const handleDefault = () => setIsPointer(false);

    window.addEventListener("mousemove", moveCursor);

    const clickable = document.querySelectorAll("a, button");

    clickable.forEach((el) => {
      el.addEventListener("mouseenter", handlePointer);
      el.addEventListener("mouseleave", handleDefault);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      clickable.forEach((el) => {
        el.removeEventListener("mouseenter", handlePointer);
        el.removeEventListener("mouseleave", handleDefault);
      });
    };
  }, []);

  return (
    <>
      {/* OUTER GLASS RING */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        animate={{
          x: position.x - 20,
          y: position.y - 20,
          scale: isPointer ? 2 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 20,
        }}
      >
        <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-glow animate-pulse-glow" />
      </motion.div>

      {/* INNER DOT */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        animate={{
          x: position.x - 3,
          y: position.y - 3,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 30,
        }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-white" />
      </motion.div>
    </>
  );
}