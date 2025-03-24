import { MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface Location {
  country: number;
  id: number;
  name: string
  population: number | null;
  slug: string;
}

interface StateCardProps {
  location: Location;
  className?: string;
}

export function LocationCard({ location, className }: StateCardProps) {
  return (
    <Card
      className={cn(
        "overflow-hidden bg-white border border-border/50 card-hover rounded-xl p-0",
        className
      )}
    >
      <CardContent className="p-4">
        <div className="inline-flex items-center gap-1 mb-2 px-2 py-0.5 bg-secondary/80 rounded-full text-xs font-medium text-secondary-foreground">
          <MapPin className="w-3 h-3" />
          <span>{location.country} cities</span>
        </div>
        <h3 className="text-lg font-medium mb-1">{location.name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          The Empire State with NYC, the Finger Lakes, and Niagara Falls. A
          cultural and financial powerhouse.
        </p>
      </CardContent>
    </Card>
  );
}
