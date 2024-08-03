/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { Modal, ModalContent, ModalOverlay } from "@chakra-ui/react";
import { hasValuesOnObject } from "../../utilitis/validators";

type Props = {
  isOpen: boolean;
  children: React.ReactNode;
  handleModalClose: () => void;
  wash: {}
};

const ModalGlobal = ({ isOpen, children, handleModalClose, wash }: Props) => {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={() => {
          handleModalClose()
          if (hasValuesOnObject(wash)) {
            window.location.reload()
          }
        }}
      >
        <ModalOverlay />
        <ModalContent>{children}</ModalContent>
      </Modal>
    </>
  );
};

export default ModalGlobal;
