import React, { useState } from "react";
import { Modal } from "rizzui";

const AppModal = ({ isOpen, onClose, children }) => {
  const [modalState, setModalState] = useState(isOpen);

  const closeModal = () => {
    setModalState(false);
    onClose();
  };

  return (
    <Modal isOpen={modalState} onClose={closeModal}>
      {children}
    </Modal>
  );
};

export default AppModal;
