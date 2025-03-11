"use client";

import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LocationSearch } from "@/components/location-search";
import { State, StateCard } from "@/components/location-card";
import { statesByCountry } from "@/data/states";
import { toast } from "sonner";
import { Wrench, Car } from "lucide-react";
import { useAppStore } from "@/store/app.store";
import CountrySelector from "@/components/country-selector";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const HomePage = () => {
  const {selectedCountry, setSelectedCountry} = useAppStore();
  const [filteredStates, setFilteredStates] = useState<State[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const states = useMemo(() => {
    const countryStates = statesByCountry[selectedCountry.id] || [];
    setFilteredStates(countryStates);
    setSearchTerm("");
    return countryStates;
  }, [selectedCountry]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);

    if (!term.trim()) {
      setFilteredStates(states);
      return;
    }

    const filtered = states.filter((state) =>
      state.name.toLowerCase().includes(term.toLowerCase())
    );

    setFilteredStates(filtered);

    if (filtered.length === 0) {
      toast(
        `No mechanic locations found for "${term}" in ${selectedCountry.name}`,
        {
          description: "Try a different search term or country",
        }
      );
    }
  };

  return (
    <>
      <motion.section
        className="pt-16 pb-8 px-6 md:px-10 lg:px-16 bg-gradient-to-b from-accent/50 to-white"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <div className="max-w-screen-xl mx-auto">
          <motion.div className="mb-8 text-center" variants={fadeInUp}>
            <div className="inline-flex mb-2 rounded-full px-3 py-1 bg-secondary text-sm font-medium text-secondary-foreground">
              <Car className="mr-1 h-4 w-4" /> Find mechanics in{" "}
              {selectedCountry.flag} {selectedCountry.name}
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Professional Mechanics Near You
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Find reliable auto repair services in your area. Quick, trusted,
              and certified mechanics.
            </p>
          </motion.div>

          <motion.div
            className="relative max-w-2xl mx-auto mb-16"
            variants={fadeInUp}
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <LocationSearch
                placeholder={`Search for mechanics in ${selectedCountry.name}...`}
                className="flex-1"
                onSearch={handleSearch}
              />
              <div className="sm:w-auto sm:self-start">
                <CountrySelector
                  selectedCountry={selectedCountry}
                  onCountryChange={setSelectedCountry}
                  buttonClassName="w-full sm:w-auto bg-white/90 hover:bg-white py-3"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>
      <section className="py-8 px-6 md:px-10 lg:px-16 bg-secondary/30">
        <div className="max-w-screen-xl mx-auto">
          <motion.div
            className="mb-8"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <div className="flex items-center gap-2">
              <h2 className="text-2xl md:text-3xl font-bold">
                {searchTerm
                  ? `Search results for "${searchTerm}"`
                  : `Service locations in ${selectedCountry.name}`}
              </h2>
            </div>
            <p className="text-muted-foreground">
              {filteredStates.length}{" "}
              {filteredStates.length === 1 ? "location" : "locations"} with
              certified mechanics
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedCountry.id}-${searchTerm}`}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0 }}
            >
              {filteredStates.map((state) => (
                <motion.div key={state.id} variants={fadeInUp}>
                  <StateCard state={state} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredStates.length === 0 && (
            <motion.div
              className="text-center py-12"
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              <Wrench className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground text-lg">
                No mechanic locations found. Try a different search term or
                country.
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
};

export default HomePage;
