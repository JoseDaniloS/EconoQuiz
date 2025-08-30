import { motion } from "framer-motion";

export default function TimerBar({ duration, timeLeft }) {
  return (
    <div className="w-full h-3 bg-white/30 overflow-hidden mb-6">
      <motion.div
        className={` h-full ${
          timeLeft <= 5
            ? "bg-red-600"
            : timeLeft <= 10
            ? "bg-yellow-600"
            : "bg-green-600"
        }`}
        initial={{ width: "100%" }}
        animate={{ width: 0 }}
        transition={{ duration: duration, ease: "linear" }}
      />
    </div>
  );
}
