"use client";
import Image from "next/image";
import "./portfolio.css";

import { useState } from "react";

const portfolioItems = [
  {
    title: "Suite",
    image: "https://www.alivaahotels.com/images/suite-new-image.webp",
  },
  {
    title: "Studio Room",
    image: "https://www.alivaahotels.com/images/rooms/studio-room-1.webp",
  },
  {
    title: "Deluxe Room",
    image: "https://www.alivaahotels.com/images/rooms/deluxe-room-1.webp",
  },
  {
    title: "Executive Room",
    image: "https://www.alivaahotels.com/images/rooms/executive-room-1.webp",
  },
];

export default function PortfolioSection() {
  const [bgImage, setBgImage] = useState(portfolioItems[0].image);

  return (
    <div
      className="portfolio-container flex justify-between items-center h-screen transition-all duration-500"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {portfolioItems.map((item, index) => (
        <div key={index}
          className="portfolio-item flex-1 text-center p-10 text-white flex flex-col justify-center items-center cursor-pointer h-[605px] hover:opacity-90"
          onMouseOver={() => setBgImage(item.image)}>
            <div className="port-content">
                <h2 className="text-2xl font-bold">{item.title}</h2>
                <a href="#" className="btn-primary" >View Detail</a>
            </div>
        </div>
      ))}
    </div>
  );
}
