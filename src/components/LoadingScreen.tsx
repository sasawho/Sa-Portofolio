import { motion } from "framer-motion";

export default function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(12px)" }}
      transition={{ duration: 0.8 }}
    >
      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-72 h-72 bg-white/5 rounded-full blur-3xl" />
      </div>

      <div className="relative flex flex-col items-center gap-8">
        
        {/* NAME */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-white text-2xl md:text-3xl font-medium tracking-tight"
        >
          Laksamana Khansa
        </motion.h1>

        {/* LOADING DOTS (APPLE STYLE) */}
        <div className="flex items-center gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-white/70"
              animate={{
                opacity: [0.2, 1, 0.2],
                y: [0, -6, 0],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* SUBTEXT */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 0.6 }}
          className="text-white/40 text-sm tracking-wide"
        >
          Preparing experience
        </motion.p>
      </div>
    </motion.div>
  );
}