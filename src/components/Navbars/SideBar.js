import React, { useState } from "react";

import { Link } from "react-router-dom";
import "../../assets/css/sidebar.css";

const sidebarData = [
  { title: "Home", icon: "bx-home-alt", link: "/home", subMenu: null },
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
  { title: "Events", icon: "bx-calendar", link: "/events", subMenu: null },
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

export default function Sidebar() {
  const [sidebarClosed, setSidebarClosed] = useState(true);
  const [activeSubMenus, setActiveSubMenus] = useState({});

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 400) {
        setSidebarClosed(true);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarClosed(!sidebarClosed);
  };

  const toggleSubMenu = (title) => {
    setActiveSubMenus((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <>
      <div className={`sidebar ${sidebarClosed ? "close" : ""}`}>
        <div className="logo-details">
          <i className="bx bx-menu" onClick={toggleSidebar}></i>
          <span className="logo_name">CP CLUB</span>
        </div>
        <ul className="nav-links" style={{}}>
          {sidebarData.map((item, index) => (
            <li
              key={index}
              className={activeSubMenus[item.title] ? "showMenu" : ""}
            >
              <div className={`iocn-link ${item.subMenu ? "" : "blank"}`}>
                <a href={item.link}>
                  <i className={`bx ${item.icon}`}></i>
                  <span className="link_name">{item.title}</span>
                </a>
                {item.subMenu && (
                  <i
                    className="bx bxs-chevron-down arrow"
                    onClick={() => toggleSubMenu(item.title)}
                  ></i>
                )}
              </div>
              {item.subMenu && (
                <ul className="sub-menu">
                  <li>
                    <a className="link_name" href={item.link}>
                      {item.title}
                    </a>
                  </li>
                  {item.subMenu.map((subItem, subIndex) => (
                    <li key={subIndex}>
                      <a href={subItem.link}>{subItem.title}</a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
          <li>
            <div className="profile-details ">
              <div className="profile-content">
                <img
                  src="https://placehold.co/600x400@2x.png"
                  alt="profileImg"
                />
              </div>
              <div className="name-job">
                <div className="profile_name">Alex Gijo</div>
                <div className="job">Unverified</div>
              </div>
              <a href="/profile"><i className="bx bx-edit"></i></a>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}
