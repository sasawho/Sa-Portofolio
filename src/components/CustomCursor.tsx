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
    <motion.div
      className="fixed top-0 left-0 z-[9999] pointer-events-none"
      animate={{
        x: position.x - 10,
        y: position.y - 10,
        scale: isPointer ? 1.8 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 25,
      }}
    >
      <div className="w-5 h-5 rounded-full bg-white/80 backdrop-blur-md border border-white/30 shadow-glow" />
    </motion.div>
  );
}