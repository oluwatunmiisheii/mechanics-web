import { cn } from "@/lib/utils";
import { Wrench } from "lucide-react";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-xl">
        <Wrench className="text-white" size={20} />
      </div>
      <div className="text-xl font-semibold tracking-tight">MechanicFinder</div>
    </div>
  );
}
