import { motion } from "framer-motion";

function LoadingScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#080d1b] px-6">
      <div className="flex flex-col items-center gap-6">
        {/* Animated Spinner */}
        <motion.div
          className="relative h-16 w-16"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute inset-0 rounded-full border-4 border-slate-700" />
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-cyan-400 border-r-cyan-400" />
        </motion.div>

        {/* Loading Text */}
        <motion.p
          className="text-slate-400"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Loading...
        </motion.p>
      </div>
    </div>
  );
}

export default LoadingScreen;
