import Link from "next/link";
import { 
  Calendar, 
  FileText, 
  Layers, 
  Trophy, 
  Users, 
  BarChart4, 
  Home,
  PlusCircle
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DashboardCard } from "@/components/admin/dashboard-card";

export default function AdminDashboard() {
  const adminMenuItems = [
    {
      title: "Home",
      icon: Home,
      href: "/admin/home",
      description: "Manage hero, about us, and featured content",
      color: "text-primary bg-primary/10"
    },
    {
      title: "Events",
      icon: Calendar,
      href: "/admin/events",
      description: "Manage upcoming and past events",
      color: "text-secondary bg-secondary/10"
    },
    {
      title: "Resources",
      icon: FileText,
      href: "/admin/resources",
      description: "Manage learning resources and links",
      color: "text-accent bg-accent/10"
    },
    {
      title: "Hall of Fame",
      icon: Trophy,
      href: "/admin/hall-of-fame",
      description: "Highlight outstanding members and projects",
      color: "text-primary bg-primary/10"
    },
    {
      title: "Our Team",
      icon: Users,
      href: "/admin/team",
      description: "Manage team members and roles",
      color: "text-secondary bg-secondary/10"
    },
    {
      title: "Blogs",
      icon: Layers,
      href: "/admin/blogs",
      description: "Create and manage blog posts",
      color: "text-accent bg-accent/10"
    },
    {
      title: "Leaderboard",
      icon: BarChart4,
      href: "/admin/leaderboard",
      description: "Track and update member achievements",
      color: "text-primary bg-primary/10"
    }
  ];

  return (
    <div className="flex-1 space-y-8 p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <PlusCircle className="mr-2 h-4 w-4" />
          New Content
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardCard 
          title="Total Events" 
          value={42} 
          icon={Calendar} 
          description="+8% from last month"
          colorClass="text-secondary bg-secondary/10"
        />
        <DashboardCard 
          title="Members" 
          value={128} 
          icon={Users} 
          description="+12 new this month"
        />
        <DashboardCard 
          title="Blog Posts" 
          value={38} 
          icon={Layers} 
          description="6 drafts pending"
          colorClass="text-accent bg-accent/10"
        />
        <DashboardCard 
          title="Hall of Fame" 
          value={24} 
          icon={Trophy} 
          description="Projects and members"
          colorClass="text-secondary bg-secondary/10"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Admin Areas</CardTitle>
          <CardDescription>
            Manage all aspects of your coding club website from these centralized dashboards.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {adminMenuItems.map((item) => (
              <Link key={item.title} href={item.href}>
                <Card className="h-full transition-all duration-200 hover:shadow-md hover:border-primary/50">
                  <CardHeader className="flex flex-row items-center gap-3 pb-2">
                    <div className={`p-2 rounded-full ${item.color}`}>
                      <item.icon className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}