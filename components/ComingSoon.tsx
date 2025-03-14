"use client";

import { motion } from "framer-motion";

export default function ComingSoon() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#6A0DAD] to-[#3B006A] text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center backdrop-blur-xl bg-white/10 p-8 rounded-lg shadow-lg border border-[#FFD700]/30"
      >
        <motion.h1
          className="text-5xl md:text-6xl font-bold text-[#FFD700] font-playfair mb-4"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ textShadow: "0 0 10px rgba(255, 215, 0, 0.8)" }}
        >
          Luxe Treasures
        </motion.h1>

        <p className="text-lg md:text-xl text-gray-200 font-lora">
          <span className="text-[#FFD700]">Gifting Happiness,</span> Spreading Smiles
        </p>

        <motion.p
          className="mt-6 text-gray-300 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          Stay tuned for something amazing!
        </motion.p>
      </motion.div>
    </div>
  );
}
