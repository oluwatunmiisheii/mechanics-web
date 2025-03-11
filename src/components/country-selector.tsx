import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export type Country = {
  id: string;
  name: string;
  flag: string;
};

const countries: Country[] = [
  {
    id: "usa",
    name: "United States",
    flag: "🇺🇸",
  },
  {
    id: "uk",
    name: "United Kingdom",
    flag: "🇬🇧",
  },
  {
    id: "canada",
    name: "Canada",
    flag: "🇨🇦",
  },
];

interface CountrySelectorProps {
  selectedCountry: Country;
  onCountryChange: (country: Country) => void;
  className?: string;
  buttonClassName?: string;
}

export default function CountrySelector({
  selectedCountry,
  onCountryChange,
  buttonClassName,
}: CountrySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger
        className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-lg border border-border transition-all justify-between",
          "hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary/20",
          isOpen && "ring-2 ring-primary/20",
          buttonClassName
        )}
      >
        <div className="space-x-1 flex items-center">
          <span className="text-base">{selectedCountry.flag}</span>
          <span className="text-sm font-medium">{selectedCountry.name}</span>
        </div>
        <ChevronDown className="w-4 h-4 text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="w-[200px] animate-scale-in bg-white/95 backdrop-blur-sm"
      >
        {countries.map((country) => (
          <DropdownMenuItem
            key={country.id}
            className={cn(
              "flex items-center gap-2 px-3 py-2 cursor-pointer text-sm",
              "hover:bg-secondary focus:bg-secondary",
              selectedCountry.id === country.id && "bg-secondary"
            )}
            onClick={() => {
              onCountryChange(country);
              setIsOpen(false);
            }}
          >
            <span className="text-base">{country.flag}</span>
            <span className="flex-1">{country.name}</span>
            {selectedCountry.id === country.id && (
              <Check className="w-4 h-4 text-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { countries };
