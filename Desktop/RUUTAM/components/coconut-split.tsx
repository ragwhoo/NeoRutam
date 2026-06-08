"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export const CoconutSplit = ({ onSplit }: { onSplit?: () => void }) => {
  const [stage, setStage] = useState<"full" | "split">("full");

  const handleClick = () => {
    if (stage === "full") {
      setStage("split");
      onSplit?.();
    }
  };

  return (
    <div
      className="relative flex items-center justify-center cursor-pointer select-none w-full h-full"
      onClick={handleClick}
    >
      {stage === "full" && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          whileHover={{
            rotate: [0, -1.5, 1.5, -1.5, 1.5, -1, 1, -1, 1, 0],
            transition: { duration: 0.6, repeat: Infinity, ease: "linear" },
          }}
        >
          <img
            src="/cococo-v2/full.png"
            alt=""
            className="object-contain w-full h-full"
          />
        </motion.div>
      )}

      {stage === "split" && (
        <motion.div
          className="absolute flex items-center justify-center w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.img
            src="/cococo-v2/left.png"
            alt=""
            className="object-contain h-5/5 w-auto"
            initial={{ x: 0 }}
            animate={{ x: -120 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.img
            src="/cococo-v2/right.png"
            alt=""
            className="object-contain h-5/5 w-auto"
            initial={{ x: 0 }}
            animate={{ x: 120 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.div>
      )}
    </div>
  );
};
