"use client";

import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useCountries } from "@/context/countries.context";
import { Country } from "@/model/countries.model";

export default function CountrySelector({initialCountries}: {initialCountries: Country[]}) {
  const { selectedCountry, setSelectedCountry, countries } = useCountries();
  const [isOpen, setIsOpen] = useState(false);

  const countriesList = initialCountries || countries;

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger
        className={cn(
          "flex items-center gap-2 px-3 rounded-lg border border-border transition-all justify-between w-full sm:w-auto bg-white/90 hover:bg-white py-3",
          "hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary/20",
          isOpen && "ring-2 ring-primary/20"
        )}
      >
        <div className="space-x-1 flex items-center">
          <span className="text-base">{selectedCountry?.flag_unicode}</span>
          <span className="text-sm font-medium">{selectedCountry?.name}</span>
        </div>
        <ChevronDown className="w-4 h-4 text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="w-[200px] animate-scale-in bg-white/95 backdrop-blur-sm"
      >
        {countriesList.map((country) => (
          <DropdownMenuItem
            key={country.id}
            className={cn(
              "flex items-center gap-2 px-3 py-2 cursor-pointer text-sm",
              "hover:bg-secondary focus:bg-secondary",
              selectedCountry?.id === country.id && "bg-secondary"
            )}
            onClick={() => {
              setSelectedCountry(country);
              setIsOpen(false);
            }}
          >
            <span className="text-base">{country?.flag_unicode}</span>
            <span className="flex-1">{country?.name}</span>
            {selectedCountry?.id === country.id && (
              <Check className="w-4 h-4 text-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
