import React from "react";
import SideBar from "components/Navbars/SideBar.js";
import { ReactComponent as DotGrid } from "assets/img/team/dotted-shape.svg";
import { ReactComponent as Pie } from "assets/img/team/shape-2.svg";
import "../assets/css/sidebar.css";
import "../assets/css/teams.css";
import "../assets/css/animate.css";
import "../assets/css/lineicons.css";
import { membersList } from "../_data/_ourTeamPage";

/**
 * OurTeamPage component displays a section showcasing team members.
 *
 * @component
 * @returns {JSX.Element} The rendered component containing the team section.
 *
 * @example
 * // Usage
 * <OurTeamPage />
 *
 * @see SideBar
 * @see membersList
 */
export default function OurTeamPage() {
  React.useEffect(() => {
    document.body.classList.toggle("index-page");
    document.body.classList.toggle("profile-page");

    return function cleanup() {
      document.body.classList.toggle("index-page");
    };
  }, []);

  return (
    <section className="">
      <SideBar />
      <img alt="..." className="dots" src={require("assets/img/dots.png")} />

      <section id="team" class="cpc-team">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="cpc-section-title mx-auto text-center">
                <h2>Meet the Team</h2>
                <p>
                  The talented people behind the scenes who make it all happen.
                </p>
              </div>
            </div>
          </div>

          <div class="row">
            {membersList.map((member, index) => (
              <div class="col-xl-3 col-lg-3 col-sm-6" key={`member-${index}`}>
                <div
                  class="cpc-single-team wow fadeInUp"
                  data-wow-delay={`${index * 0.05}s`}
                >
                  <div class="cpc-team-image-wrapper">
                    <div class="cpc-team-image">
                      <img src={member.image} alt="team" />
                    </div>

                    <DotGrid alt="shape" className="shape shape-1" />
                    <Pie alt="shape" class="shape shape-2" />
                  </div>
                  <div class="cpc-team-info">
                    <h5>{member.name}</h5>
                    <h6>{member.role}</h6>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
}
