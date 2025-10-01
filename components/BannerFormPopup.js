import React, { useState, useEffect } from 'react';

const BannerFormPopup = ({ showPopup1, closePopupp, destination, duration }) => {
  const today = new Date().toISOString().split('T')[0];
   const [selectedDate, setSelectedDate] = useState(today);
  const [formData, setFormData] = useState({
    destination: destination || '',
    duration: duration || '',
    name: '',
    email: '',
    mobile: '',
    checkin: today,
    description: '',
  });

  const [formErrors, setFormErrors] = useState({});

  // Sync props with state
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      destination: destination || '',
      duration: duration || '',
    }));
  }, [destination, duration]);

  const validateForm = (e) => {
    e.preventDefault();
    let errors = {};

    if (!formData.destination) errors.destination = 'Destination is required';
    if (!formData.duration) errors.duration = 'Duration is required';
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!/^[a-zA-Z\s]+$/.test(formData.name)) errors.name = 'Only letters allowed';
    if (!formData.email.trim()) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email is invalid';
    if (!formData.mobile) errors.mobile = 'Mobile is required';
    else if (!/^\d{10}$/.test(formData.mobile)) errors.mobile = 'Mobile must be 10 digits';
    if (!formData.checkin) errors.checkin = 'Check-in date is required';
    if (!formData.description.trim()) errors.description = 'Description is required';

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      alert("Your request has been submitted successfully!");
      closePopupp();
    }
  };

  if (!showPopup1) return null;

  return (
    <>
      <div className="popup-overlay">
        <div className="popup-content">
          <button className="close-popup" onClick={closePopupp}>×</button>
          <h2>Plan My Trip</h2>
          <form className="enquiry-form" onSubmit={validateForm}>
            <div className="form-row">
              <div className="form-group">
                <label>Destination</label>
                <select
                  value={formData.destination}
                  onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                >
                  <option value="">Select Destination</option>
                  <option value="bangkok">Bangkok</option>
                  <option value="pattaya">Pattaya</option>
                   <option value="Hua">Hua Hin</option>
            <option value="Chiang">Chiang Mai</option>
            <option value="Krabi">Krabi</option>
            <option value="Phuket">Phuket</option>
                </select>
                {formErrors.destination && <span className="error">{formErrors.destination}</span>}
              </div>
              <div className="form-group">
                <label>Duration</label>
                <select
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                >
                  <option value="">Select Duration</option>
                  <option value="4 Days">4 Days</option>
                  <option value="6 Days">6 Days</option>
                </select>
                {formErrors.duration && <span className="error">{formErrors.duration}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  placeholder='Name'
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
                {formErrors.name && <span className="error">{formErrors.name}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder='Email'
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
                {formErrors.email && <span className="error">{formErrors.email}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="mobile">Mobile No.</label>
                <input
                  type="tel"
                  id="mobile"
                  placeholder='Mobile No'
                  value={formData.mobile}
                  onChange={(e) => {
                    if (/^\d*$/.test(e.target.value)) {
                      setFormData({ ...formData, mobile: e.target.value });
                    }
                  }}
                  maxLength="10"
                  required
                />
                {formErrors.mobile && <span className="error">{formErrors.mobile}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="checkin">Date</label>
                <input
                  type="date"
                  id="checkin"
                  value={formData.checkin}
                  onChange={(e) => setFormData({ ...formData, checkin: e.target.value })}
                  min={today}
                  required
                />
                {formErrors.checkin && <span className="error">{formErrors.checkin}</span>}
              </div>
            </div>

            <div className="form-group description-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                value={formData.description}
                placeholder='Text Area'
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                maxLength="500"
                required
              />
              {formErrors.description && <span className="error">{formErrors.description}</span>}
            </div>

            <button type="submit" className="submit-btn">Submit</button>
          </form>
        </div>
      </div>

      <style jsx>{`
        .popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 999999;
        }
        .popup-content {
          background: white;
          padding: 1rem;
          border-radius: 8px;
          width: 90%;
          max-width: 500px;
          position: relative;
        }
        .close-popup {
          position: absolute;
          right: 10px;
          top: 0px;
          border: none;
          background: none;
          font-size: 1.5rem;
          cursor: pointer;
        }
        .enquiry-form {
          display: flex;
          flex-direction: column;
          gap: .5rem;
          margin-top: 1rem;
        }
        .form-row {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .form-group {
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .form-group label {
          margin-bottom: 0.3rem;
          font-size: 0.9rem;
        }
        .form-group input,
        .form-group textarea,
        .form-group select {
          width: 100%;
          padding: 0.3rem;
          border: 1px solid var(--primary-color);
          border-radius: 0px;
        }
        .form-group input:focus,
        .form-group textarea:focus,
        .form-group select:focus {
          outline: none;
          box-shadow: none;
        }
        .form-group textarea {
          height: 60px;
        }
        .error {
          color: red;
          font-size: 0.8rem;
          margin-top: 0.2rem;
        }
        .submit-btn {
          font-size: 14px;
          font-weight: var(--secondary-font-weight);
          border-radius: 0;
          background: var(--primary-color);
          padding: 7px 10px;
          outline: none;
          border: none;
          color: #fff;
          cursor: pointer;
          transition: 0.3s;
          text-transform: uppercase;
        }
        .submit-btn:hover {
          background: var(--primary-color);
        }

        @media screen and (max-width: 768px) {
          .form-group {
            max-width: 47%;
          }
          .form-group.description-group {
            max-width: 100%;
          }
        }
      `}</style>
    </>
  );
};

export default BannerFormPopup;
