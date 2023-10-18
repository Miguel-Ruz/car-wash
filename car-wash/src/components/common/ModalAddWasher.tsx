import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const ModalAddWasher = ({ isOpen, onClose }: Props) => {
  const [name, setName] = useState("");
  const [documento, setDocumento] = useState("");
  const [error, setError] = useState(false);

  const handleDocumentoChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,10}$/.test(value)) {
      setDocumento(value);
      setError(true); // Borra el mensaje de error si es válido
    } else {
      setError(false);
    }
  };

  const handleModalClose = () => {
    setName(""); // Restablece el valor de name a una cadena vacía
    setDocumento(""); // Restablece el valor de documento a una cadena vacía
    onClose(); // Cierra el modal
  };

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
        <ModalContent>
          <ModalHeader>Datos del lavador</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Nombre del lavador</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Escribe el nombre del cliente"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Documento de identificación</FormLabel>
              <Input
                placeholder="Escribe el NO. de identificación"
                value={documento}
                onChange={(e) => handleDocumentoChange(e)}
                inputMode="numeric"
                isInvalid={error}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="teal"
              mr={3}
              onClick={() => console.log("click guardar")}
            >
              Guardar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalAddWasher;
