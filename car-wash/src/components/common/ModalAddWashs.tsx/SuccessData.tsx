import React from "react";
import {
  Box,
  Button,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
} from "@chakra-ui/react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { Icon } from "@chakra-ui/react";

type Props = {
  handleModalClose: () => void;
};

const SuccessData = ({ handleModalClose }: Props) => {
  return (
    <>
      <ModalHeader display="flex" alignItems="center">
        <Box mr="3">
          <Icon as={BsFillCheckCircleFill} w={8} h={8} color="#C6F6D5" />
        </Box>
        Datos del cliente
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody pb={6} mr={2}>
        <Box>Ahora puedes ver el estado del servicio y ver detalles.</Box>
        <ModalFooter>
          <Button variant="outline" isDisabled>
            Editar
          </Button>
          {/* fata recargar la pagina cuando se cierre le modal de exito */}
          <Button colorScheme="teal" ml={3} onClick={() => {
            handleModalClose()
            window.location.reload();
          }
          }>
            Cerrar
          </Button>
        </ModalFooter>
      </ModalBody>
    </>
  );
};

export default SuccessData;
