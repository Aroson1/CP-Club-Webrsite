import React from "react";
import SideBar from "components/Navbars/SideBar.js";
import { Button, Col, Container, Row, UncontrolledCarousel } from "reactstrap";

import "../assets/css/sidebar.css";
import "../assets/css/resources.css";
import "../assets/css/lineicons.css";

const resourcesList = [
  {
    resourceTitle: "Dynamic Programming",
    listOfResources: [
      {
        title: "Dynamic Programming - GeeksforGeeks",
        link: "https://www.geeksforgeeks.org/dynamic-programming/",
      },
      {
        title: "Dynamic Programming - TutorialsPoint",
        link: "https://www.tutorialspoint.com/design_and_analysis_of_algorithms/design_and_analysis_of_algorithms_dynamic_programming.htm",
      },
      {
        title: "Dynamic Programming - Programiz",
        link: "https://www.programiz.com/dsa/dynamic-programming",
      },
      {
        title: "Dynamic Programming - HackerEarth",
        link: "https://www.hackerearth.com/practice/algorithms/dynamic-programming/introduction-to-dynamic-programming-1/tutorial/",
      },
    ],
  },
  {
    resourceTitle: "Graph Theory",
    listOfResources: [
      {
        title: "Graph Theory - GeeksforGeeks",
        link: "https://www.geeksforgeeks.org/graph-data-structure-and-algorithms/",
      },
      {
        title: "Graph Theory - TutorialsPoint",
        link: "https://www.tutorialspoint.com/graph_theory/index.htm",
      },
      {
        title: "Graph Theory - Programiz",
        link: "https://www.programiz.com/dsa/graph",
      },
      {
        title: "Graph Theory - HackerEarth",
        link: "https://www.hackerearth.com/practice/algorithms/graphs/graph-representation/tutorial/",
      },
    ],
  },
  {
    resourceTitle: "Greedy Algorithms",
    listOfResources: [
      {
        title: "Greedy Algorithms - GeeksforGeeks",
        link: "https://www.geeksforgeeks.org/greedy-algorithms/",
      },
      {
        title: "Greedy Algorithms - TutorialsPoint",
        link: "https://www.tutorialspoint.com/design_and_analysis_of_algorithms/design_and_analysis_of_algorithms_greedy_method.htm",
      },
      {
        title: "Greedy Algorithms - Programiz",
        link: "https://www.programiz.com/dsa/greedy-algorithm",
      },
      {
        title: "Greedy Algorithms - HackerEarth",
        link: "https://www.hackerearth.com/practice/algorithms/greedy/basics-of-greedy-algorithms/tutorial/",
      },
    ],
  },
  {
    resourceTitle: "Divide and Conquer",
    listOfResources: [
      {
        title: "Divide and Conquer - GeeksforGeeks",
        link: "https://www.geeksforgeeks.org/divide-and-conquer/",
      },
      {
        title: "Divide and Conquer - TutorialsPoint",
        link: "https://www.tutorialspoint.com/design_and_analysis_of_algorithms/design_and_analysis_of_algorithms_divide_and_conquer.htm",
      },
      {
        title: "Divide and Conquer - Programiz",
        link: "https://www.programiz.com/dsa/divide-and-conquer",
      },
    ],
  },
];

export default function ResourcesPage() {
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

      <section id="resources" class="cpc-resources">
        
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="cpc-section-title text-center mx-auto">
                <h2>Resources</h2>
                <p>
                  We have prepared a list of resources to help you get started.
                </p>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-6">
              {resourcesList.slice(0, Math.ceil(resourcesList.length / 2)).map((resource, index) => (
                <div
                  class="cpc-single-resources wow fadeInUp"
                  data-wow-delay=".1s"
                  key={index}
                >
                  <div class="accordion">
                    <button
                      class="cpc-resources-btn collapsed"
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapse${index}`}
                    >
                      <span class="icon flex-shrink-0">
                        <i class="lni lni-chevron-down"></i>
                      </span>
                      <span>{resource.resourceTitle}</span>
                    </button>
                    <div
                      id={`collapse${index}`}
                      class="accordion-collapse collapse"
                    >
                      <div class="cpc-resources-body">
                        <ul>
                          {resource.listOfResources.map(
                            (subResource, subIndex) => (
                              <li key={subIndex}>
                                <a href={subResource.link}>
                                  {subResource.title}
                                </a>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div class="col-lg-6">
              {resourcesList.slice(Math.ceil(resourcesList.length / 2)).map((resource, index) => (
                <div
                  class="cpc-single-resources wow fadeInUp"
                  data-wow-delay=".1s"
                  key={index+Math.ceil(resourcesList.length / 2)}
                >
                  <div class="accordion">
                    <button
                      class="cpc-resources-btn collapsed"
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapse${index+Math.ceil(resourcesList.length / 2)}`}
                    >
                      <span class="icon flex-shrink-0">
                        <i class="lni lni-chevron-down"></i>
                      </span>
                      <span>{resource.resourceTitle}</span>
                    </button>
                    <div
                      id={`collapse${index+Math.ceil(resourcesList.length / 2)}`}
                      class="accordion-collapse collapse"
                    >
                      <div class="cpc-resources-body">
                        <ul>
                          {resource.listOfResources.map(
                            (subResource, subIndex) => (
                              <li key={subIndex}>
                                <a href={subResource.link}>
                                  {subResource.title}
                                </a>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
