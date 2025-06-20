"use client";
import React, { useEffect } from "react";
import "@/assets/css/teams.css";
import "@/assets/css/animate.css";
import "@/assets/css/lineicons.css";
import DotGrid from "@/assets/img/team/dotted-shape.svg";
import Pie from "@/assets/img/team/shape-2.svg";
import Image from "next/image";
import dotsImage from "@/assets/img/dots.png";
import { membersList } from "../_data/_ourTeamPage";

export default function OurTeamPage() {
  useEffect(() => {
    document.body.classList.toggle("index-page");
    document.body.classList.toggle("profile-page");
    return () => {
      document.body.classList.toggle("index-page");
      document.body.classList.toggle("profile-page");
    };
  }, []);

  const membersByBatch = membersList.reduce<Record<string, typeof membersList>>((acc, member) => {
    const batch = member.batch || "Other";
    (acc[batch] = acc[batch] || []).push(member);
    return acc;
  }, {});

  const sortedBatches = Object.keys(membersByBatch).sort().reverse();

  return (
    <section>
      <img alt="Decorative dots" className="dots" src={dotsImage.src} />

      <section id="team" className="cpc-team">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="cpc-section-title mx-auto text-center">
                <h2>Meet the Team</h2>
                <p>
                  The talented people behind the scenes who make it all happen.
                </p>
              </div>
            </div>
          </div>

          {sortedBatches.map((batch) => (
            <div key={batch} className="mb-5">
              <div className="row mb-3">
                <div className="col-12">
                  <h3 className="text-center">{batch}</h3>
                </div>
              </div>

              <div className="row">
                {membersByBatch[batch].map((member, idx) => (
                  <div className="col-xl-3 col-lg-3 col-sm-6" key={idx}>
                    <div
                      className="cpc-single-team wow fadeInUp"
                      data-wow-delay={`${idx * 0.05}s`}
                    >
                      <div className="cpc-team-image-wrapper">
                        <div
                          className="cpc-team-image"
                          style={{
                            width: "170px",
                            height: "170px",
                            borderRadius: "50%",
                            overflow: "hidden",
                            margin: "0 auto",
                          }}
                        >
                          <img
                            src={member.image}
                            alt={member.name}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        </div>

                        <div className="image-overlay">
                          <a
                            href={"#"}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <img
                              src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png"
                              alt="LinkedIn"
                            />
                          </a>
                        </div>
                        <Image
                          src={DotGrid}
                          alt="shape"
                          className="shape shape-1"
                         
                        />
                        <Image 
                          src={Pie} 
                          alt="shape" 
                          className="shape shape-2" 
                          
                        />
                        
                      </div>

                      <div className="cpc-team-info">
                        <h5>{member.name}</h5>
                        <h6>{member.role}</h6>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}
