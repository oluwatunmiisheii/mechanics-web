import { MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface State {
  id: string;
  name: string;
  image: string;
  cityCount: number;
  description: string;
}

interface StateCardProps {
  state: State;
  className?: string;
}

export function StateCard({ state, className }: StateCardProps) {
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
          <span>{state.cityCount} cities</span>
        </div>
        <h3 className="text-lg font-medium mb-1">{state.name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {state.description}
        </p>
      </CardContent>
    </Card>
  );
}
