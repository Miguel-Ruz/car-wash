import React from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
} from "@chakra-ui/react";

//fetch
import postWasher from "../../services/postWashers";

type Props = {
  initialRef: any;
  name: string;
  setName: (e: any) => void;
  documento: string;
  setDocumento: (e: any) => void;
  setError: (e: any) => void;
  handleModalClose: () => void;
};

const ModalAddWasherr = ({
  initialRef,
  name,
  setName,
  documento,
  setDocumento,
  setError,
  handleModalClose,
}: Props) => {
  const handleDocumentoChange = (e: any) => {
    const value = e.target.value;
    if (/^\d{0,10}$/.test(value)) {
      setDocumento(value);
      setError(true); // Borra el mensaje de error si es válido
    } else {
      setError(false);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Valida que los campos "name" y "documento" tengan valores antes de enviar la solicitud
    if (name.trim() === "" || documento.trim() === "") {
      alert("Por favor, completa todos los campos.");
      return; // Detén el envío de la solicitud si hay campos vacíos
    }

    const dataToSend = {
      name,
      documentId: documento,
    };

    //fetch
    const data = postWasher(dataToSend);

    //cerrar modal y recargar la pagina
    if (data) {
      handleModalClose();
      window.location.reload();
    }
  };
  return (
    <>
      <ModalHeader>Datos del lavador</ModalHeader>
      <ModalCloseButton />
      <ModalBody pb={6}>
        <FormControl>
          <FormLabel>Nombre del lavador</FormLabel>
          <Input
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
          />
        </FormControl>
      </ModalBody>

      <ModalFooter>
        <Button colorScheme="teal" mr={3} onClick={(e) => handleSubmit(e)}>
          Guardar
        </Button>
      </ModalFooter>
    </>
  );
};

export default ModalAddWasherr;
