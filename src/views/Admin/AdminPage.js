import React from "react";
import SideBar from "components/Navbars/SideBar.js";
import classnames from "classnames";
import { NavItem, NavLink, Nav } from "reactstrap";
import "../../assets/css/sidebar.css";
import "../../assets/css/admin.css";
import "../../assets/css/lineicons.css";
import ManageBlogs from "../../components/Admin/ManageBlogs";
import ManageEvents from "../../components/Admin/ManageEvents";
import ManageResources from "components/Admin/ManageResources";
import ManageMembers from "components/Admin/ManageMembers";
import ManageLeaderboard from "components/Admin/ManageLeaderboard";
import ManangeHallOfFame from "components/Admin/ManageHallOfFame";
const options = [
  {
    title: "Manage Members",
    icon: "tim-icons icon-single-02",
    link: "/admin?tab=members",
  },
  {
    title: "Edit Leaderboard",
    icon: "tim-icons icon-chart-bar-32",
    link: "/admin?tab=leaderboard",
  },
  {
    title: "Edit Resource",
    icon: "tim-icons icon-settings",
    link: "/admin?tab=resources",
  },
  {
    title: "Add Blog",
    icon: "tim-icons icon-pencil",
    link: "/admin?tab=blogs",
  },
  {
    title: "Add Events",
    icon: "tim-icons icon-calendar-60",
    link: "/admin?tab=events",
  },
  {
    title: "Hall Of Fame Member",
    icon: "tim-icons icon-trophy",
    link: "/admin?tab=hall-of-fame",
  },
];

const getTabIndex = (tabName) => {
  const option = options.find((option) => option.link.includes(tabName));
  return option ? options.indexOf(option) + 1 : null;
};

export default function AdminPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const tab = urlParams.get("tab");
  const [pills, setPills] = React.useState(tab ? getTabIndex(tab) : null);
  // const [showOptions, setShowOptions] = React.useState(true);

  React.useEffect(() => {
    document.body.classList.toggle("index-page");
    document.body.classList.toggle("profile-page");

    setPills(tab ? getTabIndex(tab) : null);

    return function cleanup() {
      document.body.classList.toggle("index-page");
    };
  }, [tab]);

  const handleOptionClick = (index) => {
    setPills(index);
    // setShowOptions(false);
  };

  const handleBackClick = () => {
    // setShowOptions(true);
    setPills(null);
  };

  return (
    <section className="">
      <SideBar />
      <img alt="..." className="dots" src={require("assets/img/dots.png")} />

      <section id="team" className="cpc-team">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="cpc-section-title mx-auto text-center">
                <h2>Admin Panel</h2>
                <p>plz don't abooz 🙏.</p>
              </div>
            </div>
          </div>
          {
            (pills == null && (
              <div className="container animation-container">
                <Nav
                  className="nav-pills-info nav-pills-icons justify-content-center animation-container"
                  pills
                >
                  {options.map((option, index) => (
                    <NavItem key={index} className="slide-transition">
                      <NavLink
                        className={classnames({
                          "active show": true,
                        })}
                        onClick={() => handleOptionClick(index + 1)}
                        href="#no-aboz-plz"
                        style={{
                          width: "200px",
                        }}
                      >
                        <i className={option.icon} />
                        {option.title}
                      </NavLink>
                    </NavItem>
                  ))}
                </Nav>
              </div>
            ))
          }
          {pills != null && (
            <div>
              <p
                onClick={handleBackClick}
                style={{ cursor: "pointer", marginBottom: "20px" }}
              >
                <i className="tim-icons icon-minimal-left" />
                Back
              </p>
              {pills === 1 && <ManageMembers />}
              {pills === 2 && <ManageLeaderboard />}
              {pills === 3 && <ManageResources />}
              {pills === 4 && <ManageBlogs />}
              {pills === 5 && <ManageEvents />}
              {pills === 6 && <ManangeHallOfFame />}
            </div>
          )}
        </div>
      </section>
    </section>
  );
}
