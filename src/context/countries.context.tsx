"use client";

import { Country } from "@/model/countries.model";
import { createContext, useContext, useMemo, useState } from "react";

type CountriesContextType = {
  countries: Country[];
  selectedCountry: Country | null;
  setSelectedCountry: (country: Country) => void;
};

const CountriesContext = createContext<CountriesContextType | undefined>(
  undefined
);

export function CountriesProvider({
  children,
  countries = [],
}: {
  children: React.ReactNode;
  countries: Country[];
}) {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  const value = useMemo(() => ({
      countries,
      selectedCountry,
      setSelectedCountry,
    }),
    [countries, selectedCountry]
  );

  return (
    <CountriesContext.Provider value={value}>
      {children}
    </CountriesContext.Provider>
  );
}

export function useCountries() {
  const context = useContext(CountriesContext);
  if (context === undefined) {
    throw new Error("useCountries must be used within a CountriesProvider");
  }
  return context;
}
