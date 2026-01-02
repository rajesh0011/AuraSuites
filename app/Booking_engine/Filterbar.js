"use client";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./booking.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";

import BookingEnquiryPopup from "./BookingEnquiryPopup";
import Image from "next/image";

const FilterBar = ({ propertyName, propertyId, cityId }) => {
  const [showPopup, setShowPopup] = useState(false);

  const [form, setForm] = useState({
    checkIn: new Date(),
    checkOut: (() => {
      const d = new Date();
      d.setDate(d.getDate() + 1);
      return d;
    })(),
    adults: "2",
    children: "0",
    rooms: "1",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.checkIn || !form.checkOut) {
      alert("Please select dates");
      return;
    }

    setShowPopup(true);
  };

  return (
    <>
      <section className="banner-section">
        <div className="banner-image">
          <Image height={700} width={1000} quality={100} src="/images/banner.jpg" alt="banner image" className="banner-img mobile_img" />
          <Image height={700} width={700} quality={100} src="/images/banner.png" alt="banner image" className="banner-img desktop_img" />
        </div>
      </section>
      <section className="booking-form-wrapper toggle-div">
        <div className="container-fluid">
          <div id="booking-bar" className="booking-bar">

            <div className="booking-form-container">
              <form className="booking-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Arrival Date</label>
                  <DatePicker
                    selected={form.checkIn}
                    minDate={new Date()}
                    dateFormat="dd-MM-yyyy"
                    onChange={(date) =>
                      setForm((p) => ({
                        ...p,
                        checkIn: date,
                        checkOut: new Date(date.getTime() + 86400000),
                      }))
                    }
                    className="p-2"
                  />
                  <FontAwesomeIcon icon={faCalendar} className="calender_show" />
                </div>

                <div className="form-group">
                  <label>Departure Date</label>
                  <DatePicker
                    selected={form.checkOut}
                    minDate={new Date(form.checkIn.getTime() + 86400000)}
                    dateFormat="dd-MM-yyyy"
                    onChange={(date) =>
                      setForm((p) => ({ ...p, checkOut: date }))
                    }
                    className="p-2"
                  />
                  <FontAwesomeIcon icon={faCalendar} className="calender_show" />
                </div>

                <div className="form-group">
                  <label>Adults</label>
                  <select
                    value={form.adults}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, adults: e.target.value }))
                    }
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3+</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Children</label>
                  <select
                    value={form.children}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, children: e.target.value }))
                    }
                  >
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2+</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Rooms</label>
                  <select
                    value={form.rooms}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, rooms: e.target.value }))
                    }
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3+</option>
                  </select>
                </div>

                <button type="submit" className="book-btn">
                  Book Now
                </button>
              </form>


            </div>
          </div>
        </div>
      </section>

      {showPopup && (
        <BookingEnquiryPopup
          onClose={() => setShowPopup(false)}
          propertyName={propertyName}
          propertyId={propertyId}
          cityId={cityId}
          bookingData={form}
        />
      )}
    </>
  );
};

export default FilterBar;
