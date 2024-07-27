import React from "react";
import SideBar from "components/Navbars/SideBar.js";
import { ReactComponent as DotGrid } from "assets/img/team/dotted-shape.svg";
import { ReactComponent as Pie } from "assets/img/team/shape-2.svg";
import "../assets/css/sidebar.css";
import "../assets/css/teams.css";
import "../assets/css/animate.css";
import "../assets/css/lineicons.css";

const membersList = [
  {
    name: "Vibhaas The Guy",
    role: "CP Expert",
    image: "https://placehold.it/300x300",
    socials: [
      { name: "Facebook", link: "https://twitter.com/" },
      { name: "Twitter", link: "https://twitter.com/" },
      { name: "Instagram", link: "https://twitter.com/" },
    ],
  },
  {
    name: "Shuxn The Guy",
    role: "Web Developer",
    image: "https://placehold.it/300x300",
    socials: [
      { name: "Facebook", link: "https://twitter.com/" },
      { name: "Twitter", link: "https://twitter.com/" },
      { name: "Instagram", link: "https://twitter.com/" },
    ],
  },
  {
    name: "Pevan The Guy",
    role: "Pevan",
    image: "https://placehold.it/300x300",
    socials: [
      { name: "Facebook", link: "https://twitter.com/" },
      { name: "Twitter", link: "https://twitter.com/" },
      { name: "Instagram", link: "https://twitter.com/" },
    ],
  },
  {
    name: "VPN The Guy",
    role: "Alon Muskmelon",
    image: "https://placehold.it/300x300",
    socials: [
      { name: "Facebook", link: "https://twitter.com/" },
      { name: "Twitter", link: "https://twitter.com/" },
      { name: "Instagram", link: "https://twitter.com/" },
    ],
  },

];

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
              <div
                class="col-xl-3 col-lg-3 col-sm-6"
                key={`member-${index}`}
              >
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
                  <ul class="cpc-team-socials">
                    {member.socials.map((social, index) => (
                      <li key={`social-${index}`}>
                        <a href={social.link}>
                          <i class={`lni lni-${social.name.toLowerCase()}-filled`}></i>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
}
