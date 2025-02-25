const sidebarData = [
    { title: "Home", icon: "bx-home-alt", link: "/home", subMenu: null },
    {
      title: "Events",
      icon: "bx-calendar",
      link: "/events",
      subMenu: null,
    },
    {
      title: "Leaderboard",
      icon: "bx-bar-chart",
      link: "/leaderboard",
      subMenu: null,
    },
    {
      title: "Blogs",
      icon: "bx-message-alt-detail",
      link: "/blogs",
      subMenu: null,
    },
    { title: "Resources", icon: "bx-compass", link: "/resources", subMenu: null },
    {
      title: "Hall Of Fame",
      icon: "bx-trophy",
      link: "/hall-of-fame",
      subMenu: null,
    },
    { title: "Our Team", icon: "bx-user", link: "/team", subMenu: null },
  ];
  
  const adminSidebarData = [
    {
      title: "Admin Panel",
      icon: "bx-cog",
      link: "/admin",
      subMenu: [
        { title: "Manage Members", link: "/admin?tab=members" },
        { title: "Edit Leaderboard", link: "/admin?tab=leaderboard" },
        { title: "Edit Resource", link: "/admin?tab=resources" },
        { title: "Add Blog", link: "/admin?tab=blogs" },
        { title: "Add Events", link: "/admin?tab=events" },
        { title: "Add New Hall Of Fame Member", link: "/admin?tab=hall-of-fame" },
      ],
    },
  ];

export { sidebarData, adminSidebarData };