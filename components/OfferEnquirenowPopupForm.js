'use client';
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function OfferEnquirenowPopupForm({
  offer,
  onClose,
  propertyName = '0',
  propertyId = '0',
  cityId = '0',
}) {

    
const [form, setForm] = useState({
  cityId: cityId,
  hotel: propertyName,
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  guests: '',
  rooms: '',
  checkIn: null,
  checkOut: null,
  enquire: '',
});


  const [errors, setErrors] = useState({});
  const today = new Date();

 useEffect(() => {
  setForm((prev) => ({
    ...prev,
    hotel: propertyName,
    cityId,
  }));
}, [propertyName, cityId]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Guests max 2 digits (max 99)
    if (name === 'guests' && value.length > 2) return;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    const e = {};
    if (!form.firstName) e.firstName = 'Required';
    if (!form.lastName) e.lastName = 'Required';
    if (!/^[0-9]{10}$/.test(form.phone)) e.phone = 'Invalid mobile';
    if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email';
    if (!form.checkIn) e.checkIn = 'Check-in required';
    if (!form.checkOut) e.checkOut = 'Check-out required';
    if (!form.guests || Number(form.guests) > 99)
      e.guests = 'Max 99 guests';

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const formatDate = (date) => {
    const d = new Date(date);
    return `${String(d.getDate()).padStart(2, '0')}-${String(
      d.getMonth() + 1
    ).padStart(2, '0')}-${d.getFullYear()}`;
  };

const handleSubmit = async () => {
  console.log("Submit clicked");

  if (!validate()) return;

  const body = {
    cityId: String(cityId),           // ✅ from props
    propertyId: String(propertyId),   // ✅ from props
    firstName: form.firstName.trim(),
    lastName: form.lastName.trim(),
    mobileNo: form.phone.trim(),
    email: form.email.trim(),
    noOfGuests: form.guests || '0',
    roomsRequired: true,
    noOfRooms: form.rooms || '0',
    checkIn: formatDate(form.checkIn),
    checkOut: formatDate(form.checkOut),
    requestFrom: 'Offer Enquiry',
    remarks: form.enquire || '',
    remarks1: offer?.offerName,           // ✅ from props
    offerId: offer?.propertyOfferId || '',
    offerFlag: offer?.offerFlag || '',
  };

  try {
    const res = await fetch(
      `https://www.aurasuites.co.tz/Api/common/EnquireNow`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }
    );

    const data = await res.json();
    console.log("API response:", data);

    if (res.ok && data.errorCode === '0') {
      alert('Enquiry submitted successfully!');
      onClose();
    } else {
      alert(data.errorMessage || 'Submission failed');
    }
  } catch (err) {
    console.error('API error:', err);
    alert('Something went wrong');
  }
};


  return (
    <div
      className="modal fade show venue-popup"
      style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content p-3">
          <div className="modal-header">
            <h5 className="modal-title">
              Enquiry for {offer?.offerName}
            </h5>

           
            <button className="btn-close" onClick={onClose}>×</button>
          </div>

          <div className="modal-body overflow-visible">
            <div className="row g-2">
              <div className="col-md-6">
                <input
                  name="firstName"
                  placeholder="First Name"
                  className="form-control"
                  value={form.firstName}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <input
                  name="lastName"
                  placeholder="Last Name"
                  className="form-control"
                  value={form.lastName}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <input
                  name="phone"
                  placeholder="Mobile"
                  className="form-control"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <input
                  name="email"
                  placeholder="Email"
                  className="form-control"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <DatePicker
                  selected={form.checkIn}
                  minDate={today}
                  placeholderText="Check In"
                  className="form-control"
                  onChange={(d) => setForm({ ...form, checkIn: d })}
                />
              </div>

              <div className="col-md-6">
                <DatePicker
                  selected={form.checkOut}
                  minDate={form.checkIn || today}
                  placeholderText="Check Out"
                  className="form-control"
                  onChange={(d) => setForm({ ...form, checkOut: d })}
                />
              </div>

              <div className="col-md-6">
                <input
                  name="guests"
                  type="number"
                  placeholder="No. of Guests"
                  className="form-control"
                  value={form.guests}
                  onChange={handleChange}
                />
              </div>

              {/* ✅ Rooms always required */}
              <div className="col-md-6">
                <input
                  name="rooms"
                  type="number"
                  placeholder="No. of Rooms"
                  className="form-control"
                  value={form.rooms}
                  onChange={handleChange}
                />
              </div>

              <div className="col-12">
                <textarea
                  name="enquire"
                  placeholder="Message"
                  className="form-control"
                  rows={2}
                  value={form.enquire}
                  onChange={handleChange}
                />
              </div>

              <div className="col-12 text-center">
                <button
                  className="btn btn-primary w-100 venue-submit-btn"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
