import React from "react";
import { BookingEngineProvider } from "../context/BookingEngineContext";
import FilterBar from "../Booking_engine/Filterbar";

const imageList = [
  "banner.jpg",
  "banner1.png",
  "banner2.jpg",
  "club.jpg",
  "Conference.jpg",
  "Deluxe.jpg",
  "Platinum.jpg",
  "orbit.jpg",
  "gallery2.jpg",
    "gallery3.jpg",
    "gallery4.jpg",
    "gallery5.jpg",

];

export default function gallery() {
  return (
    <>
     <BookingEngineProvider>
                    <FilterBar />
        </BookingEngineProvider>
    <div className="container inner_content pb-4">
      <h2 className="heading inner_heading">Gallery</h2>
      <div className="row g-3">
        {imageList.map((img, index) => (
          <div key={index} className="col-6 col-md-4 col-lg-3">
            <div className="card shadow-sm h-100">
              <img
                src={`/images/${img}`}
                alt={`Gallery ${index}`}
                className="card-img-top"
                style={{ height: "200px", objectFit: "cover" }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );

};