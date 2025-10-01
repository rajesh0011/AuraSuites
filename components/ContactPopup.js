
import React, { useState } from 'react';

const ContactPopup = ({ onClose }) => {
  const [formErrors, setFormErrors] = useState({});
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');

  const today = new Date().toISOString().split('T')[0];

  const validateForm = (e) => {
    e.preventDefault();
    // Basic validation logic
    const errors = {};
    const form = e.target;

    if (!form.fname.value.trim()) errors.fname = "First name is required";
    if (!form.lname.value.trim()) errors.lname = "Last name is required";
    if (!form.email.value.trim()) errors.email = "Email is required";
    if (!form.mobile.value.trim() || form.mobile.value.length !== 10) errors.mobile = "Enter a valid 10-digit mobile";
    if (!form.description.value.trim()) errors.description = "Message is required";

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      // Submit form logic here
      console.log("Form submitted");
      onClose(); // close the popup after successful validation
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="close-popup" onClick={onClose}>×</button>
        <h2>Contact Us</h2>
        <form className="enquiry-form" onSubmit={validateForm}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="fname">First Name</label>
              <input type="text" id="fname" name="fname" maxLength="50" required />
              {formErrors.fname && <span className="error">{formErrors.fname}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="lname">Last Name</label>
              <input type="text" id="lname" name="lname" maxLength="50" required />
              {formErrors.lname && <span className="error">{formErrors.lname}</span>}
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required />
              {formErrors.email && <span className="error">{formErrors.email}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="mobile">Mobile No.</label>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                pattern="[0-9]*"
                maxLength="10"
                onKeyPress={(e) => {
                  if (!/[0-9]/.test(e.key)) e.preventDefault();
                }}
                required
              />
              {formErrors.mobile && <span className="error">{formErrors.mobile}</span>}
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="checkin">Check-in Date</label>
              <input
                type="date"
                id="checkin"
                name="checkin"
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
                min={today}
                onFocus={(e) => e.target.showPicker()}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="checkout">Check-out Date</label>
              <input
                type="date"
                id="checkout"
                name="checkout"
                value={checkOutDate}
                onChange={(e) => setCheckOutDate(e.target.value)}
                min={checkInDate || today}
                onFocus={(e) => e.target.showPicker()}
                required
              />
            </div>
          </div>
          <div className="form-group description-group">
            <label htmlFor="description">Description</label>
            <textarea id="description" name="description" maxLength="500" required></textarea>
            {formErrors.description && <span className="error">{formErrors.description}</span>}
          </div>
          <button type="submit" className="submit-btn">Submit</button>
        </form>
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
        .form-group textarea {
          width: 100%;
          padding: 0.3rem;
          border: 1px solid var(--primary-color);
          border-radius: 0px;
        }
        .form-group input:focus,
        .form-group input:focus-visible,
        .form-group textarea:focus,
        .form-group textarea:focus-visible {
          border: 1px solid var(--primary-color);
          border-radius: 0px;
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
          margin-right: 5px;
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
    </div>
  );
};

export default ContactPopup;
