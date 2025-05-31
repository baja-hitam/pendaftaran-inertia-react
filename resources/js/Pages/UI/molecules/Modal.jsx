import React from "react";

const Modal = ({ isOpen, onClose, title, children, className }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className={`bg-white rounded-2xl shadow-lg p-6 relative ${className}`}>
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute text-3xl top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>

        {/* Modal Title */}
        {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}

        {/* Modal Content */}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
