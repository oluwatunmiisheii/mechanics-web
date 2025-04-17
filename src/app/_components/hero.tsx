/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import CountrySelector from "@/components/country-selector";
import { LocationSearch } from "@/components/location-search";
import { useCountries } from "@/context/countries.context";
import { motion } from "framer-motion";
import { Car } from "lucide-react";
import { useEffect } from "react";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export const Hero = ({ countries, initialCountry }: any) => {
  const { selectedCountry, setSelectedCountry } = useCountries();
  const renderedCountry = selectedCountry ? selectedCountry : initialCountry;

  useEffect(() => {
    if (!selectedCountry) {
      setSelectedCountry(initialCountry);
    }
  }, [selectedCountry, setSelectedCountry, initialCountry]);

  return (
    <motion.section
      className="pt-16 pb-8 px-6 md:px-10 lg:px-16 relative"
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
    >
      <div className="max-w-screen-xl mx-auto">
        <motion.div className="mb-8 text-center" variants={fadeInUp}>
          <div className="inline-flex mb-2 rounded-full px-3 py-1 bg-secondary text-sm font-medium text-secondary-foreground">
            <Car className="mr-1 h-4 w-4" /> Find mechanics in{" "}
            {renderedCountry?.flag_unicode} {renderedCountry?.name}
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Professional Mechanics Near You
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Find reliable auto repair services in your area. Quick, trusted, and
            certified mechanics.
          </p>
        </motion.div>

        <motion.div
          className="relative max-w-2xl mx-auto mb-16"
          variants={fadeInUp}
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <LocationSearch
              placeholder={`Search for mechanics in ${renderedCountry?.name}...`}
              className="flex-1"
            />
            <div className="sm:w-auto sm:self-start">
              <CountrySelector
                countries={countries}
                defaultSelectedCountry={initialCountry}
              />
            </div>
          </div>
        </motion.div>
      </div>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f5f5f5_1px,transparent_1px),linear-gradient(to_bottom,#f5f5f5_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#fef2f2,transparent)]"></div>
      </div>
    </motion.section>
  );
};
