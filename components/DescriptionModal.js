"use client";
import { useEffect } from "react";

const DescriptionModal = ({ show, onClose, content, title }) => {
  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [show]);

  if (!show) return null;

  return (
    <div className="custom-modal-overlay"
      onClick={(e) => {
    if (e.target.classList.contains('custom-modal-overlay')) {
      onClose(); // Modal close ho jaayega
    }
  }}
    >
      <div className="custom-modal-content">
        <button className="close-button" onClick={onClose}>×</button>
        <h3>{title}</h3>
        <div className="inner_content">{content} </div>
        {/* <div dangerouslySetInnerHTML={{ __html: content }} /> */}
      </div>
      <style jsx>{`
        .custom-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        }
        .custom-modal-content {
          background: white;
          padding: 2rem;
          max-width: 600px;
          width: 90%;
          border-radius: 8px;
          position: relative;
          overflow-y: auto;
          max-height: 80vh;
        }
        .close-button {
          position: absolute;
          top: 10px;
          right: 14px;
          font-size: 1.5rem;
          border: none;
          background: none;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default DescriptionModal;
