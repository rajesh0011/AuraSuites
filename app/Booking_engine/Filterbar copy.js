"use client";
import React, { useState, useRef, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import "flatpickr/dist/themes/material_green.css";
import "bootstrap/dist/css/bootstrap.min.css";

import WizardSidebar from "./PaymentGateway/WizardForm";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './booking.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';

const FilterBar = ({ contentData }) => {
    
  const [isVisible, setIsVisible] = useState(true);
 
  const [isClassAddedBook, setIsClassAddedBook] = useState(false);
  const [isHandleSearched, setHandleSearched] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

const [nextDate, setNextDate] = useState(() => {
  const tomorrow = new Date();  
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow;
});


  useEffect(() => {
   
  }, [isHandleSearched]);

  const handleSearch = () => {
  
  };

  const [isWizardVisible, setIsWizardVisible] = useState(false);


  return (
    <>
      <section className="banner-section">
        <div className="banner-image">
          <img src="/images/banner.jpg" alt="banner image" className="banner-img mobile_img" />
          <img src="/images/banner.png" alt="banner image" className="banner-img desktop_img" />
          <div className="banner-search-btn">
            {!isVisible && (
              <a className="banner-search-btn-link" onClick={showBookingEngine} id="booking-engine-btn">
                <Image src="/img/search-icon-white.svg" height={500} width={500} alt="search icon" />
              </a>
            )}
          </div>
        </div>
      </section>

      <section className="booking-form-wrapper toggle-div">
        <div className="container-fluid">
          <div id="booking-bar" className={`booking-bar ${isClassAddedBook ? "fullscreen" : ""}`}>

            <div className="booking-form-container">
                 
              <form className="booking-form">
                <div className="form-group">
                  <label>Arrival Date</label>
                  
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => {
                      setSelectedDate(date);                  
                       const nextDay = new Date(date);
                        nextDay.setDate(nextDay.getDate() + 1);
                        setNextDate(nextDay);
                    }}
                    className="p-2"
                    minDate={new Date()} dateFormat="dd-MM-yyyy"
                  />
                   <FontAwesomeIcon className="calender_show" icon={faCalendar}/>
                </div>
                <div className="form-group">
                  <label>Departure Date</label>
                  <DatePicker
                    selected={nextDate}
                    onChange={(date) => setNextDate(date)}
                    minDate={
                      selectedDate
                        ? new Date(selectedDate.getTime() + 24 * 60 * 60 * 1000)
                        : new Date()
                    }
                    placeholderText="check out date"
                    className="p-2"
                    disabled={!selectedDate}
                dateFormat="dd-MM-yyyy"
                  />
                  <FontAwesomeIcon className="calender_show" icon={faCalendar}/>
                </div>
                <div className="form-group">
                  <label>Adults</label>
                  <select>
                    <option>Adults</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3+</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Children</label>
                  <select>
                    <option>Children</option>
                    <option>0</option>
                    <option>1</option>
                    <option>2+</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Rooms</label>
                  <select>
                    <option>Rooms</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3+</option>
                  </select>
                </div>
                <button type="submit" className="book-btn">Book Now</button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <WizardSidebar isVisible={isWizardVisible} onClose={() => setIsWizardVisible(false)}  />
    </>
  );
};

export default FilterBar;