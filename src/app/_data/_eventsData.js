export const eventsData = [
  {
    id: "EVT_001",
    title: "Algorithm Championship",
    date: "2024-08-15",
    time: "14:00",
    location: "Main Auditorium",
    attendees: 150,
    status: "upcoming",
    priority: 1,
    description:
      "Annual competitive programming contest featuring data structures and algorithms challenges.",
    image:
      "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=500&h=300&fit=crop",
  },
  {
    id: "EVT_002",
    title: "Web Development Workshop",
    date: "2024-08-22",
    time: "10:00",
    location: "Computer Lab",
    attendees: 80,
    status: "upcoming",
    priority: 2,
    description:
      "Hands-on session covering modern web technologies and frameworks.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&h=300&fit=crop",
  },
  {
    id: "EVT_003",
    title: "AI/ML Seminar",
    date: "2024-07-25",
    time: "15:30",
    location: "Seminar Hall",
    attendees: 200,
    status: "completed",
    priority: 1,
    description:
      "Expert insights into machine learning algorithms and artificial intelligence trends.",
    image:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=500&h=300&fit=crop",
  },
  {
    id: "EVT_004",
    title: "Open Source Contribution Drive",
    date: "2024-08-30",
    time: "11:00",
    location: "Innovation Lab",
    attendees: 60,
    status: "upcoming",
    priority: 3,
    description:
      "Learn to contribute to open source projects and build your developer profile.",
    image:
      "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=500&h=300&fit=crop",
  },
  {
    id: "EVT_005",
    title: "Cybersecurity Workshop",
    date: "2024-09-05",
    time: "13:00",
    location: "Security Lab",
    attendees: 90,
    status: "upcoming",
    priority: 2,
    description:
      "Hands-on cybersecurity training covering ethical hacking and digital forensics.",
    image:
      "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=500&h=300&fit=crop",
  },
  {
    id: "EVT_006",
    title: "Mobile App Development Bootcamp",
    date: "2024-09-12",
    time: "09:00",
    location: "Tech Hub",
    attendees: 120,
    status: "upcoming",
    priority: 1,
    description:
      "Intensive bootcamp on React Native and Flutter for cross-platform development.",
    image:
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=500&h=300&fit=crop",
  }
];

// Helper functions for getting specific event data
export const getUpcomingEvents = () => eventsData.filter(event => event.status === "upcoming");

export const getCompletedEvents = () => eventsData.filter(event => event.status === "completed");

export const getRecentEvents = (count = 3) => 
  eventsData
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);

export const getFeaturedEvents = () => 
  eventsData
    .filter(event => event.priority === 1)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export const getEventById = (id) => eventsData.find(event => event.id === id);
