import React from "react";
import SideBar from "components/Navbars/SideBar.js";
import Leaderboard from "components/Leaderboard/Leaderboard";
import "../assets/css/sidebar.css";

export default function BlogsPage() {
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

      <section className="container position-relative">
        <div class="container" style={{padding: "50px 0px"}}>
          <div class="row">
            <div class="col-lg-12">
              <div class="cpc-section-title mx-auto text-center">
                <h2>Leaderboard</h2>
                <p>
                  Check out the top performers in the community!
                </p>
              </div>
            </div>
          </div>
        <Leaderboard />
        </div>
      </section>
    </section>
  );
}
