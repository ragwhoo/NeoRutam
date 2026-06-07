"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Skiper28 } from "../scrolltext";

export const Hero = () => {
  return ( <>
    <section
      id="home"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-white px-6"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center"
      >
        <h1 className="font-display text-6xl font-bold tracking-tight text-brand-gold md:text-8xl lg:text-9xl">
          RUUTAM
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="mt-4 text-lg font-medium tracking-wide text-brand-pink md:text-xl"
        >
          Pure. Natural. Virgin Coconut Oil.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mx-auto mt-6 h-px w-24 bg-brand-gold"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="absolute bottom-10 animate-bounce"
      >
        <ChevronDown className="h-8 w-8 text-brand-gold" />
      </motion.div>
    </section>
    <section id="empty" className="bg-white py-24"><Skiper28 /></section>
  </>);
};
