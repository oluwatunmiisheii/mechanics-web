"use client";

import { useRef } from "react";
import { Search, XCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { parseAsString, useQueryState } from "nuqs";

interface LocationSearchProps {
  placeholder?: string;
  className?: string;
}

export function LocationSearch({
  placeholder = "Search locations...",
  className,
}: LocationSearchProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [search, setSearch] = useQueryState("search", parseAsString);

  return (
    <div className={cn("relative flex items-center transition-all", className)}>
      <div className="absolute left-2 flex items-center justify-center text-muted-foreground">
        <Search className="w-5 h-5" />
      </div>
      <Input
        ref={inputRef}
        defaultValue={search ?? ""}
        type="text"
        placeholder={placeholder}
        className={cn(
          "pl-10 py-6 text-base rounded-xl border bg-white/90",
          "hover:bg-white focus:bg-white focus:border-primary/30 focus:ring-4 focus:ring-primary/10",
          "transition-all duration-300"
        )}
      />
      <div className="absolute right-2 flex items-center justify-center space-x-2">
        {search && (
          <button
            className="text-muted-foreground"
            onClick={() => {
              if(inputRef.current) {
                inputRef.current.value = "";
                inputRef.current.focus();
              }
              setSearch("")
            }}
          >
            <XCircle className="w-5 h-5" />
          </button>
        )}
        <Button className="rounded-md" onClick={() => setSearch(inputRef.current?.value ?? "")}>Search</Button>
      </div>
    </div>
  );
}
