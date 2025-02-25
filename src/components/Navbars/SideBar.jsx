import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import apiService from "../../apiService";
import Cookies from "js-cookie";
import "../../assets/css/sidebar.css";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { Toast } from "primereact/toast";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/saga-blue/theme.css";

import { sidebarData, adminSidebarData } from "../../_data/_sidebar";

/**
 * Sidebar component for navigation.
 *
 * This component manages the state of the sidebar, including whether it is open or closed,
 * the active submenus, and user login status. It also handles user authentication via Google login.
 *
 * @component
 * @example
 * return (
 *   <Sidebar />
 * );
 *
 * @returns {JSX.Element} The rendered sidebar component.
 *
 * @state {boolean} sidebarClosed - Indicates if the sidebar is closed.
 * @state {Object} activeSubMenus - Tracks which submenus are currently active.
 * @state {boolean} isLoggedIn - Indicates if the user is logged in.
 * @state {Object|null} userData - Stores user data if logged in.
 * @ref {Object} toast - Reference to the toast notification component.
 *
 * @effect {void} useEffect - Sets up a resize event listener and checks local storage for user data on mount.
 *
 * @function toggleSidebar - Toggles the sidebar open/closed state.
 * @function toggleSubMenu - Toggles the visibility of a submenu based on its title.
 * @function login - Initiates Google login and handles success/error responses.
 * @function handleLogin - Fetches user details from Google and updates state accordingly.
 * @function showToast - Displays a toast notification with the given severity, summary, and detail.
 */
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
