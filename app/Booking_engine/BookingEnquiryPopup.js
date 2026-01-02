"use client";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function BookingEnquiryPopup({
  onClose,
  bookingData = null,   // null when opened from header
  mode = "booking",     // "booking" | "header"
  propertyName = "",
}) {
  const isHeaderMode = mode === "header";

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    message: "",
    checkIn: null,
    checkOut: null,
    guests: "",
    rooms: "",
  });

  /* ---------------- SAFE DERIVED VALUES ---------------- */

  const totalGuests = isHeaderMode
    ? Number(form.guests || 0)
    : Number(bookingData?.adults || 0) +
      Number(bookingData?.children || 0);

  const totalRooms = isHeaderMode
    ? Number(form.rooms || 0)
    : Number(bookingData?.rooms || 0);

  const formatDate = (d) => {
    if (!d) return "";
    const x = new Date(d);
    return `${String(x.getDate()).padStart(2, "0")}-${String(
      x.getMonth() + 1
    ).padStart(2, "0")}-${x.getFullYear()}`;
  };

  /* ---------------- SUBMIT ---------------- */

  const handleSubmit = async () => {
    // Basic validation
    if (!form.firstName.trim() || !form.lastName.trim()) {
      alert("First & Last name required");
      return;
    }

    if (!/^[0-9]{10}$/.test(form.phone)) {
      alert("Enter valid 10-digit mobile number");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(form.email)) {
      alert("Enter valid email");
      return;
    }

    if (isHeaderMode) {
      if (!form.checkIn || !form.checkOut) {
        alert("Please select check-in and check-out dates");
        return;
      }
      if (!form.guests || !form.rooms) {
        alert("Guests and rooms are required");
        return;
      }
    }

    const body = {
      cityId: "1",          // ✅ static
      propertyId: "1",      // ✅ static

      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      mobileNo: form.phone.trim(),
      email: form.email.trim(),

      noOfGuests: String(totalGuests),
      noOfRooms: String(totalRooms),

      checkIn: isHeaderMode
        ? formatDate(form.checkIn)
        : formatDate(bookingData?.checkIn),

      checkOut: isHeaderMode
        ? formatDate(form.checkOut)
        : formatDate(bookingData?.checkOut),

      requestFrom: isHeaderMode
        ? "Enquiry From Header Book Now"
        : "Enquiry From Booking Widget",

      remarks: form.message || "",
      remarks1: propertyName || "",
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
    } catch (err) {
      console.error(err);
      alert("API error");
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <div
      className="modal fade show booking-popup-form"
      style={{ display: "block", background: "rgba(0,0,0,0.5)", zIndex: 9999999 }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content p-3 text-start">
          <div className="modal-header">
            <h5>Booking Enquiry</h5>
            <button className="btn-close" onClick={onClose}>×</button>
          </div>

          <div className="modal-body overflow-visible">
            <div className="row g-2">

              {/* ---------------- BOOKING MODE (DISABLED) ---------------- */}
              {!isHeaderMode && bookingData && (
                <>
                  <div className="col-md-6">
                    <label>Check In</label>
                    <DatePicker
                      selected={bookingData.checkIn}
                      disabled
                      className="form-control"
                    />
                  </div>

                  <div className="col-md-6">
                    <label>Check Out</label>
                    <DatePicker
                      selected={bookingData.checkOut}
                      disabled
                      className="form-control"
                    />
                  </div>

                  <div className="col-md-6">
                    <label>Guests</label>
                    <input
                      className="form-control"
                      value={totalGuests}
                      disabled
                    />
                  </div>

                  <div className="col-md-6">
                    <label>Rooms</label>
                    <input
                      className="form-control"
                      value={totalRooms}
                      disabled
                    />
                  </div>
                </>
              )}

              {/* ---------------- HEADER MODE (EDITABLE) ---------------- */}
              {isHeaderMode && (
                <>
                  <div className="col-md-6">
                    <DatePicker
                      placeholderText="Check In"
                      className="form-control"
                      minDate={new Date()}
                      selected={form.checkIn}
                      onChange={(d) => setForm({ ...form, checkIn: d })}
                    />
                  </div>

                  <div className="col-md-6">
                    <DatePicker
                      placeholderText="Check Out"
                      className="form-control"
                      minDate={form.checkIn || new Date()}
                      selected={form.checkOut}
                      onChange={(d) => setForm({ ...form, checkOut: d })}
                    />
                  </div>

                  <div className="col-md-6">
                    <input
                      type="number"
                      placeholder="Guests"
                      className="form-control"
                      value={form.guests}
                      onChange={(e) =>
                        setForm({ ...form, guests: e.target.value })
                      }
                    />
                  </div>

                  <div className="col-md-6">
                    <input
                      type="number"
                      placeholder="Rooms"
                      className="form-control"
                      value={form.rooms}
                      onChange={(e) =>
                        setForm({ ...form, rooms: e.target.value })
                      }
                    />
                  </div>
                </>
              )}

              {/* ---------------- USER DETAILS ---------------- */}
              <div className="col-md-6">
                <input
                  placeholder="First Name"
                  className="form-control"
                  onChange={(e) =>
                    setForm({ ...form, firstName: e.target.value })
                  }
                />
              </div>

              <div className="col-md-6">
                <input
                  placeholder="Last Name"
                  className="form-control"
                  onChange={(e) =>
                    setForm({ ...form, lastName: e.target.value })
                  }
                />
              </div>

              <div className="col-md-6">
                <input
                  placeholder="Mobile"
                  className="form-control"
                  onChange={(e) =>
                    setForm({ ...form, phone: e.target.value })
                  }
                />
              </div>

              <div className="col-md-6">
                <input
                  placeholder="Email"
                  className="form-control"
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                />
              </div>

              <div className="col-12">
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
