"use client";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function BookingEnquiryPopup({
  onClose,
  propertyName,
  bookingData,
}) {
  const totalGuests =
    Number(bookingData.adults || 0) +
    Number(bookingData.children || 0);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    message: "",
  });

  const formatDate = (d) => {
    const x = new Date(d);
    return `${String(x.getDate()).padStart(2, "0")}-${String(
      x.getMonth() + 1
    ).padStart(2, "0")}-${x.getFullYear()}`;
  };

  const handleSubmit = async () => {
    if (!form.firstName || !form.lastName) {
      alert("Name required");
      return;
    }

    const body = {
      cityId: "1",
      propertyId: "1",
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      mobileNo: form.phone.trim(),
      email: form.email.trim(),
      noOfGuests: String(totalGuests),
      noOfRooms: bookingData.rooms,
      checkIn: formatDate(bookingData.checkIn),
      checkOut: formatDate(bookingData.checkOut),
      requestFrom: "Enquiry From Booking Widget",
      remarks: form.message,
      remarks1: propertyName,
    };

    try {
      const res = await fetch(
        "https://www.aurasuites.co.tz/Api/common/EnquireNow",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      const data = await res.json();

      if (res.ok && data.errorCode === "0") {
        alert("Enquiry submitted successfully");
        onClose();
      } else {
        alert(data.errorMessage || "Submission failed");
      }
    } catch {
      alert("API error");
    }
  };

  return (
    <div className="modal fade show booking-popup-form" style={{ display: "block", background: "rgba(0,0,0,0.5)", zIndex:"9999999" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content p-3 text-start">
          <div className="modal-header">
            <h5>Booking Enquiry</h5>
            <button className="btn-close" onClick={onClose}>X</button>
          </div>

          <div className="modal-body text-start overflow-visible">
            <div className="row g-2">
              {/* Disabled booking info */}
              <div className="col-md-6">
                <label>Check-In</label>
                <DatePicker selected={bookingData.checkIn} disabled className="form-control" />
              </div>
              <div className="col-md-6">
                <label>Check-Out</label>
                <DatePicker selected={bookingData.checkOut} disabled className="form-control" />
              </div>

              <div className="col-md-6">
                <label>Total Guests</label>
                <input value={totalGuests} disabled className="form-control" />
              </div>

              <div className="col-md-6">
                <label>Rooms</label>
                <input value={bookingData.rooms} disabled className="form-control" />
              </div>

              {/* User inputs */}
              <div className="col-md-6">
                <label>First Name</label>
                <input
                  placeholder="First Name"
                  className="form-control"
                  onChange={(e) =>
                    setForm({ ...form, firstName: e.target.value })
                  }
                />
              </div>

              <div className="col-md-6">
                <label>Last Name</label>
                <input
                  placeholder="Last Name"
                  className="form-control"
                  onChange={(e) =>
                    setForm({ ...form, lastName: e.target.value })
                  }
                />
              </div>

              <div className="col-md-6">
                <label>Mobile</label>
                <input
                  placeholder="Mobile"
                  className="form-control"
                  onChange={(e) =>
                    setForm({ ...form, phone: e.target.value })
                  }
                />
              </div>

              <div className="col-md-6">
                <label>Email</label>
                <input
                  placeholder="Email"
                  className="form-control"
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                />
              </div>

              <div className="col-12">
                <label>Message</label>
                <textarea
                  placeholder="Message"
                  className="form-control"
                  rows={2}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                />
              </div>

              <div className="col-12">
                <button
                  className="btn btn-primary w-100"
                  onClick={handleSubmit}
                >
                  Submit Enquiry
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
