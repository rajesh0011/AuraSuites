"use client"

import React from 'react';

export default function Amenities() {
   let amenities = [
                        { icon: "🍳", label: "Complimentary Breakfast" },
                        { icon: "📶", label: "High-speed WiFi" },
                        { icon: "📺", label: "LED TV" },
                        { icon: "🔒", label: "Room Safe" },
                        { icon: "☕", label: "Tea/Coffee Maker" },
                        { icon: "🧺", label: "Laundry Facilities" },
                        { icon: "🧹", label: "24/7 Housekeeping" },
                        { icon: "🛎️", label: "24/7 Room Service" },
                        { icon: "🚿", label: "Well-appointed washrooms" },
                    ]
    return (
        <>
            <div className="text-justify container my-5 global-heading-sec pb-4 text-white">
                <h2 className="text-center mb-4 global-heading">Amenities</h2>
                <p>Aura Suites aims to provide you with an experience of utmost comfort and luxury during your stay in Dar es Salaam, Tanzania. All our suites come with the following amenities to give you a premium stay experience with all essential comforts.</p>
                <div className="feature-grid">
                 {amenities.map((item, index) => (
                        <div key={index} className="container feature-item">
                            <div className='row'>
                                <div className='col-12 col-md-4 col-lg-6'>
                                    <span className="icon">{item.icon}</span>
                                    <span className="label">{item.label}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>

        </>
    )
}