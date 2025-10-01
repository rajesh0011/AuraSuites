import React, { useState } from "react";
import Image from "next/image";
import "./experience.css";
const experiencesData = [
  { title: "DALHOUSIE", location: "India", price: "₹4,259", category: "Nature", image: "/img/exp-1.jpg" },
  { title: "MUSSOORIE", location: "India", price: "₹4,259", category: "Nature", image: "/img/exp-2.jpg" },
  { title: "GOA", location: "India", price: "₹4,259", category: "Beach", image: "/img/exp-3.jpg" },
  { title: "NAINITAL", location: "India", price: "₹4,259", category: "Family-Friendly", image: "/img/exp-1.jpg" },
  { title: "DALHOUSIE", location: "India", price: "₹4,259", category: "Nature", image: "/img/exp-1.jpg" },
  { title: "MUSSOORIE", location: "India", price: "₹4,259", category: "Nature", image: "/img/exp-2.jpg" },
  { title: "GOA", location: "India", price: "₹4,259", category: "Beach", image: "/img/exp-3.jpg" },
  { title: "NAINITAL", location: "India", price: "₹4,259", category: "Family-Friendly", image: "/img/exp-1.jpg" },
];

const filters = ["All", "Nature", "Family-Friendly", "Romantic", "Beach", "Cultural"];

const Experiences = () => {
  const [selectedFilter, setSelectedFilter] = useState("All");

  // Filter the experiences based on the selected filter
  const filteredExperiences = selectedFilter === "All"
    ? experiencesData
    : experiencesData.filter((experience) => experience.category === selectedFilter);

  return (
    <>
    {/* <section className="experience-section sec-padding">
        <div className="container">
            <div className="global-heading-sec">
                <h2 className="global-heading" data-aos="fade-left" data-aos-duration="2500">Experiences</h2>
            </div>

            <div className="expbx" id="experienceContainer">
                <div className="d-flex justify-content-start mb-4 experience-filter-btns">
                    {filters.map((filter) => (
                    <button
                        key={filter}
                        className={`btn btn-outline-dark mx-1 filter-btn ${selectedFilter === filter ? "active" : ""}`}
                        onClick={() => setSelectedFilter(filter)}
                    >
                        {filter}
                    </button>
                    ))}
                </div>
                <div className="row g-4" id="experienceContainer">
                    {filteredExperiences.map((experience, index) => (
                    <div key={index} className="col-lg-3 col-md-4 experience-card">
                        <div className="card">
                            <Image src={experience.image} alt={experience.title} className="experience-image" height={500} width={500} />
                            <div className="card-body">
                                <div className="left-div">
                                    <h5>{experience.title}</h5>
                                    <p>{experience.location}</p>
                                </div>
                                
                                <div className="right-div">
                                    <div className="price">
                                        <span className="start-from">Starts from</span>
                                        {experience.price}
                                     </div>
                                    <button className="btn btn-book">Book Now</button>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
               
                </div>
            </div>
        </section> */}
    </>
  );
};

export default Experiences;
