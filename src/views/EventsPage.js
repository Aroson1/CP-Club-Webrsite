import React from "react";
import SideBar from "components/Navbars/SideBar.js";
import "../assets/css/sidebar.css";
import "../assets/css/events.css";
import "../assets/css/blog.css";
import "../assets/css/animate.css";
import "../assets/css/lineicons.css";

const events = [
  {
    id: 1,
    title: "Event Title 1",
    date: "20/10/2130",
    imageUrl:
      "https://img.freepik.com/free-photo/abstract-surface-textures-white-concrete-stone-wall_74190-8189.jpg",
  },
  {
    id: 2,
    title: "Event Title 2",
    date: "21/10/2130",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKa-kPsTDUACR7EcY_-e3BgHX_e9UnghKxmw&s",
  },
  {
    id: 3,
    title: "Event Title 3",
    date: "22/10/2130",
    imageUrl:
      "https://c4.wallpaperflare.com/wallpaper/803/820/833/monkey-programmers-computer-humor-wallpaper-preview.jpg",
  },
  {
    id: 4,
    title: "Event Title 4",
    date: "23/10/2130",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKa-kPsTDUACR7EcY_-e3BgHX_e9UnghKxmw&s",
  },
  {
    id: 5,
    title: "Event Title 5",
    date: "24/10/2130",
    imageUrl:
      "https://c4.wallpaperflare.com/wallpaper/803/820/833/monkey-programmers-computer-humor-wallpaper-preview.jpg",
  },
];

export default function EventsPage() {
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
                <h2>Events</h2>
                <p>View Upcoming and Past Events</p>
              </div>
            </div>
          </div>

          <div class="row">
            <ul class="stack-cards js-stack-cards">
              {events.map((event) => (
                <li
                  key={event.id}
                  class="stack-cards__item stack-ic-bg stack-ic-radius-lg stack-ic-shadow-md stack-ic-overflow-hidden js-stack-cards__item"
                  onClick={() => {
                    window.location.href = `/blog-details?id=${event.id}`;
                  }}
                >
                  <img src={event.imageUrl} alt="Image description" />
                  <div className="title-overlay">
                    <h3>{event.title}</h3>
                  </div>
                  <div
                    className="cpc-blog-overlay"
                    style={{
                      alignItems: "flex-start",
                      justifyContent: "flex-end",
                    }}
                  >
                    <div className="cpc-blog-overlay-content">
                      <div className="cpc-blog-meta">
                        <p
                          className="date"
                          style={{
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                            borderRadius: "15px",
                            padding: "5px 10px",
                          }}
                        >
                          <i className="lni lni-calendar"></i>{" "}
                          <span>{event.date}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </section>
  );
}
