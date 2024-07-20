import React from "react";
import Modal from "react-modal";

const PopupModal = ({ children, isOpen, setIsOpen }) => {
  const closeModal = () => {
    setIsOpen(false);
  };

  // Set the App element for react-modal
  Modal.setAppElement("#root"); // Replace "#root" with your actual root element ID

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick={true} // This enables closing the modal on overlay click
      overlayClassName="fixed inset-0 z-50 flex items-center justify-center"
      className="bg-transparent max-w-auto p-6"
      style={{
        overlay: {
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(11, 10, 10, 0.75)",
        },
      }}
    >
      {/* Your popup content here */}
      <div className="flex flex-col items-center pb-6 rounded-2xl max-w-[511px]">
        {children}
      </div>
    </Modal>
  );
};

export default PopupModal;
