"use client";

import { useState, useEffect } from "react";

export default function FormSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <>
      {/* Button to open the sidebar */}
      <button
        onClick={() => setIsOpen(true)}
        className="btn btn-primary"
      >
        Open Form
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
          style={{ zIndex: 1040 }}
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Form */}
      <div
        className={`position-fixed top-0 end-0 h-100 bg-white shadow p-4 overflow-auto transition ${
          isOpen ? "translate-end-0" : "translate-end-100"
        }`}
        style={{
          width: "320px",
          zIndex: 1050,
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s ease-in-out",
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0">Form Title</h5>
          <button className="btn-close" onClick={() => setIsOpen(false)} />
        </div>

        {/* Form */}
        <form>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input type="text" className="form-control" placeholder="Enter your name" />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" placeholder="Enter your email" />
          </div>

          <button type="submit" className="btn btn-success w-100">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
