"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Award,
  Code,
  Github,
  Globe,
  Link as LinkIcon,
  Linkedin,
  User,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";

// Sample data
const members = [
  {
    id: 1,
    name: "Sarah Johnson",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Members",
    title: "Full Stack Developer",
    bio: "Sarah specializes in React and Node.js development. She has contributed to multiple open-source projects and mentors junior developers in the club.",
    accomplishments: [
      "President of TechBytes (2024-2025)",
      "3rd Place in National Collegiate Hackathon",
      "Published developer on npm with 5+ packages"
    ],
    links: [
      { type: "github", url: "#" },
      { type: "linkedin", url: "#" },
      { type: "website", url: "#" }
    ]
  },
  {
    id: 2,
    name: "David Chen",
    image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Members",
    title: "Machine Learning Engineer",
    bio: "David focuses on computer vision and neural networks. He has published research papers on efficient model training techniques.",
    accomplishments: [
      "Research Assistant in University AI Lab",
      "Winner of ML Competition Series",
      "Speaker at 3 regional tech conferences"
    ],
    links: [
      { type: "github", url: "#" },
      { type: "linkedin", url: "#" }
    ]
  },
  {
    id: 3,
    name: "Maya Patel",
    image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Alumni",
    title: "Senior Software Engineer at Google",
    bio: "Former club president who went on to join Google's Cloud team. Maya continues to support TechBytes through guest lectures and mentorship programs.",
    accomplishments: [
      "TechBytes President (2023-2024)",
      "Google Scholarship Recipient",
      "Contributor to Kubernetes project"
    ],
    links: [
      { type: "github", url: "#" },
      { type: "linkedin", url: "#" },
      { type: "website", url: "#" }
    ]
  },
  {
    id: 4,
    name: "CodeTracker",
    image: "https://images.pexels.com/photos/4382538/pexels-photo-4382538.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Projects",
    title: "Productivity Tool",
    bio: "A VS Code extension that helps developers track their coding time, analyze productivity patterns, and set coding goals. Developed by a team of 4 TechBytes members.",
    accomplishments: [
      "10,000+ downloads on VS Code Marketplace",
      "Featured in Dev.to's 'Top Tools' list",
      "Open-source with 25+ contributors"
    ],
    links: [
      { type: "github", url: "#" },
      { type: "website", url: "#" }
    ]
  },
  {
    id: 5,
    name: "Alex Rodriguez",
    image: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Members",
    title: "Cybersecurity Specialist",
    bio: "Alex organizes security workshops and CTF competitions within the club. He's certified in ethical hacking and network security.",
    accomplishments: [
      "Founded TechBytes Security Division",
      "CISSP Certified",
      "Winner of 3 Capture The Flag competitions"
    ],
    links: [
      { type: "github", url: "#" },
      { type: "linkedin", url: "#" }
    ]
  },
  {
    id: 6,
    name: "CampusConnect",
    image: "https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Projects",
    title: "Student Networking Platform",
    bio: "A web platform that connects students with similar academic interests, projects, and career goals. Includes features for event coordination, study groups, and skill sharing.",
    accomplishments: [
      "Active user base of 5,000+ students",
      "Adopted by 3 university departments",
      "Winner of Campus Innovation Award"
    ],
    links: [
      { type: "github", url: "#" },
      { type: "website", url: "#" }
    ]
  },
  {
    id: 7,
    name: "Jessica Kim",
    image: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Alumni",
    title: "Startup Founder & CTO",
    bio: "Jessica founded a successful edtech startup after graduating. Her company develops AI-powered learning tools for students with diverse learning needs.",
    accomplishments: [
      "TechBytes Vice President (2022-2023)",
      "Secured $2M in seed funding",
      "Forbes 30 Under 30 in Education"
    ],
    links: [
      { type: "linkedin", url: "#" },
      { type: "website", url: "#" }
    ]
  },
  {
    id: 8,
    name: "EcoRoute",
    image: "https://images.pexels.com/photos/241316/pexels-photo-241316.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Projects",
    title: "Sustainable Transportation App",
    bio: "Mobile app that helps users find eco-friendly transportation routes, calculating carbon footprint and suggesting alternatives. Integrates with public transit APIs and ride-sharing services.",
    accomplishments: [
      "Won University Sustainability Hackathon",
      "Partnered with local transit authority",
      "Featured in TechCrunch"
    ],
    links: [
      { type: "github", url: "#" },
      { type: "website", url: "#" }
    ]
  }
];

export function HallOfFameGallery() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [selectedItem, setSelectedItem] = useState<typeof members[0] | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const filteredMembers = activeTab === "all" 
    ? members 
    : members.filter(member => member.category === activeTab);

  const handleCardClick = (item: typeof members[0]) => {
    setSelectedItem(item);
    setIsDialogOpen(true);
  };

  function getLinkIcon(type: string) {
    switch(type) {
      case 'github':
        return <Github className="h-4 w-4" />;
      case 'linkedin':
        return <Linkedin className="h-4 w-4" />;
      case 'website':
        return <Globe className="h-4 w-4" />;
      default:
        return <LinkIcon className="h-4 w-4" />;
    }
  }

  return (
    <section className="py-16">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <motion.div variants={itemVariants} className="mb-10">
          <Tabs defaultValue="all" onValueChange={setActiveTab}>
            <div className="flex justify-center mb-8">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="Members">Members</TabsTrigger>
                <TabsTrigger value="Projects">Projects</TabsTrigger>
                <TabsTrigger value="Alumni">Alumni</TabsTrigger>
              </TabsList>
            </div>
          </Tabs>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="wait">
            {filteredMembers.map((item) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <Card 
                  className="h-full overflow-hidden neon-glow cursor-pointer transition-all duration-300 hover:shadow-lg"
                  onClick={() => handleCardClick(item)}
                >
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute top-2 right-2 bg-card/80 backdrop-blur-md text-foreground text-xs font-medium py-1 px-2 rounded">
                      {item.category}
                    </div>
                  </div>
                  <CardContent className="pt-4">
                    <h3 className="text-xl font-bold mb-1">{item.name}</h3>
                    <p className="text-sm text-primary mb-2">{item.title}</p>
                    <p className="text-muted-foreground line-clamp-2 text-sm">{item.bio}</p>
                  </CardContent>
                  <CardFooter className="text-sm text-muted-foreground flex justify-end gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      {item.category === "Projects" ? <Code className="h-4 w-4" /> : <User className="h-4 w-4" />}
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Detail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-2xl bg-card/90 backdrop-blur-md border border-border/50">
          {selectedItem && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl mb-2 flex items-center gap-2">
                  {selectedItem.name}
                  <span className="text-xs py-0.5 px-1.5 bg-muted text-muted-foreground rounded">
                    {selectedItem.category}
                  </span>
                </DialogTitle>
                <DialogDescription className="text-primary text-base">
                  {selectedItem.title}
                </DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div className="relative h-56 md:h-full w-full rounded-md overflow-hidden">
                  <Image
                    src={selectedItem.image}
                    alt={selectedItem.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-base font-semibold mb-2 flex items-center gap-2">
                      <User className="h-4 w-4 text-primary" />
                      Bio
                    </h4>
                    <p className="text-muted-foreground text-sm">{selectedItem.bio}</p>
                  </div>

                  <div>
                    <h4 className="text-base font-semibold mb-2 flex items-center gap-2">
                      <Award className="h-4 w-4 text-primary" />
                      Accomplishments
                    </h4>
                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                      {selectedItem.accomplishments.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  {selectedItem.links.length > 0 && (
                    <div>
                      <h4 className="text-base font-semibold mb-2 flex items-center gap-2">
                        <LinkIcon className="h-4 w-4 text-primary" />
                        Links
                      </h4>
                      <div className="flex gap-2">
                        {selectedItem.links.map((link, index) => (
                          <Button key={index} variant="outline" size="sm" asChild>
                            <a href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                              {getLinkIcon(link.type)}
                              <span className="capitalize">{link.type}</span>
                            </a>
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <DialogClose className="absolute right-4 top-4">
                <Button variant="ghost" size="icon">
                  <X className="h-4 w-4" />
                </Button>
              </DialogClose>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}