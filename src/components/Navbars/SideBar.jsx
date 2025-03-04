import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/css/sidebar.css";
import { Toast } from "primereact/toast";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/saga-blue/theme.css";
import loginImage from "../../assets/img/login.png";
import { sidebarData, adminSidebarData } from "../../_data/_sidebar";
import { useAuth } from "../../auth/AuthContext";

export default function Sidebar() {
  const [sidebarClosed, setSidebarClosed] = useState(true);
  const [activeSubMenus, setActiveSubMenus] = useState({});
  const toast = useRef(null);
  const navigate = useNavigate();
  
  // Use the auth context instead of managing auth state here
  const { isAuthenticated, user, isAdmin, login, logout } = useAuth();

  useEffect(() => {
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

  const showToast = (severity, summary, detail) => {
    toast.current.show({ severity, summary, detail });
  };

  const handleLogout = async () => {
    try {
      await logout();
      showToast("success", "Logout Successful", "You have been logged out successfully.");
      navigate('/');
    } catch (error) {
      console.error("Logout failed", error);
      showToast("error", "Logout Failed", "An error occurred during logout.");
    }
  };

  const handleLoginClick = () => {
    login();
  };

  return (
    <>
      <Toast ref={toast} />
      <div className={`sidebar ${sidebarClosed ? "close" : ""}`}>
        <div className="logo-details">
          <i className="bx bx-menu" onClick={toggleSidebar}></i>
          <span className="logo_name">Coders' Club</span>
        </div>
        <ul className="nav-links">
          {isAuthenticated &&
            isAdmin &&
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
            {isAuthenticated ? (
              <div className="profile-details">
                <div className="profile-content">
                  <img
                    src={user?.profileImage || "https://placehold.co/600x400@2x.png"}
                    alt="profileImg"
                  />
                </div>
                <div className="name-job">
                  <div className="profile_name">
                    {user?.userName || "User"}
                  </div>
                </div>
                <i 
                  className="bx bx-log-out" 
                  onClick={handleLogout}
                  style={{ cursor: "pointer" }}
                ></i>
              </div>
            ) : (
              <div
                className="profile-details"
                style={{ cursor: "pointer" }}
                onClick={handleLoginClick}
              >
                <div className="profile-content">
                  <img src={loginImage} alt="profileImg" />
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