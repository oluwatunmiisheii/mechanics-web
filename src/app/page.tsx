"use client";
import { Hero } from "./_components/hero";
import { WorldMap } from "./_components/world-map";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="dark:bg-black bg-white w-full relative flex flex-col">
      <div className="pt-56">
        <Hero />
      </div>
    </div>
  );
}
