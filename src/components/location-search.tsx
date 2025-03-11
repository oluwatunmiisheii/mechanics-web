import { useState, useRef } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface LocationSearchProps {
  placeholder?: string;
  className?: string;
  onSearch: (searchTerm: string) => void;
}

export function LocationSearch({
  placeholder = "Search locations...",
  className,
  onSearch,
}: LocationSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
    inputRef.current?.focus();
  };

  return (
    <div
      className={cn(
        "relative flex items-center transition-all",
        isFocused && "scale-[1.01]",
        className
      )}
    >
      <div className="absolute left-3 flex items-center justify-center text-muted-foreground">
        <Search className="w-5 h-5" />
      </div>
      <Input
        ref={inputRef}
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className={cn(
          "pl-10 py-6 text-base rounded-xl border bg-white/90",
          "hover:bg-white focus:bg-white focus:border-primary/30 focus:ring-4 focus:ring-primary/10",
          "transition-all duration-300"
        )}
      />
      {searchTerm && (
        <button
          onClick={clearSearch}
          className="absolute right-3 text-muted-foreground hover:text-foreground"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
