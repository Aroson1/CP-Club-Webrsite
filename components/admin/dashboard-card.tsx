import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DivideIcon as LucideIcon } from "lucide-react";

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  colorClass?: string;
}

export function DashboardCard({
  title,
  value,
  icon: Icon,
  description,
  colorClass = "text-primary bg-primary/10",
}: DashboardCardProps) {
  return (
    <Card className="bg-card/80 backdrop-blur-sm border border-border/50">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className={`p-2 rounded-full ${colorClass}`}>
          <Icon className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && <p className="text-xs text-muted-foreground">{description}</p>}
      </CardContent>
    </Card>
  );
}