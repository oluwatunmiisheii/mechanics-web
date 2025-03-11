import { create } from "zustand";
import {
    type Country,
    countries,
} from "@/components/country-selector"

type AppStore = {
    selectedCountry: Country;
    setSelectedCountry: (country: Country) => void;
}

export const useAppStore = create<AppStore>((set) => ({
    countries: countries,
    selectedCountry: countries[0],
    setSelectedCountry: (selectedCountry) => set({ selectedCountry }),
}));
