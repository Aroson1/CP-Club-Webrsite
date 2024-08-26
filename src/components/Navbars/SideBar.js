import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import apiService from "../../apiService";
import Cookies from "js-cookie";
import "../../assets/css/sidebar.css";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { Toast } from "primereact/toast";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/saga-blue/theme.css";

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

export default function Sidebar() {
  const [sidebarClosed, setSidebarClosed] = useState(true);
  const [activeSubMenus, setActiveSubMenus] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const toast = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 400) {
        setSidebarClosed(true);
      }
    };
    window.addEventListener("resize", handleResize);
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const user = JSON.parse(storedUserData);
      setIsLoggedIn(true);
      setUserData(user);
    }
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

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => handleLogin(codeResponse),
    onError: (error) => {
      console.log("Login Failed:", error);
      showToast("error", "Login Failed", "An error occurred during login.");
    },
  });

  const handleLogin = async (user) => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: "application/json",
          },
        }
      );

      const googleUserDetails = response.data;
      const userDetails = await apiService.post("/v1/users", {
        ...googleUserDetails,
        role: "user",
      });

      setUserData(userDetails.user);
      setIsLoggedIn(true);

      Cookies.set("accessToken", userDetails.accessToken, { expires: 1 / 24 });
      Cookies.set("refreshToken", userDetails.refreshToken, { expires: 7 });

      localStorage.setItem(
        "userData",
        JSON.stringify({
          id: userDetails.user.id,
          userName: userDetails.user.userName,
          rollNumber: userDetails.user.rollNumber,
          batch: userDetails.user.batch,
          profileImage: userDetails.user.profileImage,
          role: userDetails.user.role,
        })
      );

      showToast(
        "success",
        "Login Successful",
        "You have successfully logged in."
      );
    } catch (error) {
      console.error("Login failed", error);
      showToast("error", "Login Failed", "Failed to fetch user details.");
    }
  };

  const showToast = (severity, summary, detail) => {
    toast.current.show({ severity, summary, detail });
  };

  return (
    <>
      <Toast ref={toast} />
      <div className={`sidebar ${sidebarClosed ? "close" : ""}`}>
        <div className="logo-details">
          <i className="bx bx-menu" onClick={toggleSidebar}></i>
          <span className="logo_name">CP CLUB</span>
        </div>
        <ul className="nav-links">
          {isLoggedIn &&
            userData?.role === "ADMIN" &&
            adminSidebarData.map((item, index) => (
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
            {isLoggedIn && (
              <div className="profile-details">
                <div className="profile-content">
                  <img
                    src={
                      userData?.profileImage ||
                      "https://placehold.co/600x400@2x.png"
                    }
                    alt="profileImg"
                  />
                </div>
                <div className="name-job">
                  <div className="profile_name">
                    {userData?.userName || "User"}
                  </div>
                  {/* TODO @Aroson1: Add the codeforces verification */}
                  {/* <div className="job">Verified</div> */}
                </div>
                <a href="/profile">
                  <i className="bx bx-edit"></i>
                </a>
              </div>
            )}
            {!isLoggedIn && (
              <div
                className="profile-details"
                style={{ cursor: "pointer" }}
                onClick={login}
              >
                <div className="profile-content">
                  <img src={require("assets/img/login.png")} alt="profileImg" />
                </div>
                <div className="name-job">
                  <div className="profile_name">Sign In</div>
                </div>
                <i className="bx bx-log-in"></i>
              </div>
            )}
          </li>
        </ul>
      </div>
    </>
  );
}
