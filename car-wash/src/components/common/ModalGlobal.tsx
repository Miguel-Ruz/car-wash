/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { Modal, ModalContent, ModalOverlay } from "@chakra-ui/react";

type Props = {
  isOpen: boolean;
  children: React.ReactNode;
  handleModalClose: () => void;
};

const ModalGlobal = ({ isOpen, children, handleModalClose }: Props) => {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={handleModalClose}
      >
        <ModalOverlay />
        <ModalContent>{children}</ModalContent>
      </Modal>
    </>
  );
};

export default ModalGlobal;
