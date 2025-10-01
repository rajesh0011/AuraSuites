'use client';
import React from "react";
import Image from "next/image";

export default function HeroBanner({
  destination,
  setDestination,
  duration,
  setDuration,
  handleOpenPopup,
}) {
  return (
    <section className="hero-banner position-relative">
      <Image
        src="/images/banner-img2.png"
        alt="Hero Banner"
        fill
        priority
        style={{ objectFit: "fill", objectPosition: "top" }}
      />

      <div className="banner-overlay position-absolute bg-white bottom-10 start-50 translate-middle text-center text-white p-3 bg-dark bg-opacity-80 rounded-5">
        <div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-3">
          <select
            className="form-select border-0 border-end rounded-0 border-2 w-auto"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          >
            <option value="">Select Destination</option>
            <option value="bangkok">Bangkok</option>
            <option value="pattaya">Pattaya</option>
            <option value="Hua">Hua Hin</option>
            <option value="Chiang">Chiang Mai</option>
            <option value="Krabi">Krabi</option>
            <option value="Phuket">Phuket</option>
          </select>

          <select
            className="form-select border-0 w-auto"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          >
            <option value="">Select Duration</option>
            <option value="4 Days">4 Days</option>
            <option value="6 Days">6 Days</option>
          </select>

          <button
            className="book-now box-btn rounded-5 px-4 py-1 ylw-txt"
            onClick={handleOpenPopup}
          >
            Plan My Trip
          </button>
        </div>
      </div>
    </section>
  );
}
