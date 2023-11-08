import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
  Select,
} from "@chakra-ui/react";
import Steper from "../Stepper";

type Props = {
  indexStep: number;
  setStepperStep: (value: { clientData: boolean; washData: boolean }) => void;
  handleModalClose: () => void;
  handleChangeCreateWash: (e: React.ChangeEvent<HTMLInputElement>) => void;
  createWash: {
    washerId: string;
    clientName: string;
    vehicleType: string;
    licensePlate: string;
    washType: string;
    rate: string;
    paymentType: string;
  };
  isButtonDisabled: boolean;
};

const ClientData = ({
  indexStep,
  setStepperStep,
  handleModalClose,
  handleChangeCreateWash,
  createWash,
  isButtonDisabled,
}: Props) => {
  return (
    <>
      <ModalHeader>Datos del cliente</ModalHeader>
      <ModalCloseButton />
      <ModalBody pb={6}>
        <FormControl>
          <FormLabel>Nombre del cliente</FormLabel>
          <Input
            placeholder="Escribe el nombre del cliente"
            name="clientName"
            value={createWash.clientName}
            onChange={(e) => handleChangeCreateWash(e)}
          />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Tipo de vehiculo</FormLabel>
          <Select
            placeholder="Selecciona el tipo de vehiculo"
            name="vehicleType"
            value={createWash.vehicleType}
            onChange={(e) => handleChangeCreateWash(e)}
          >
            <option value="Automovil">Automovil</option>
            <option value="Moto">Moto</option>
            <option value="Camion">Camion</option>
          </Select>
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Placa del vehiculo</FormLabel>
          <Input
            placeholder="XYZ-14B"
            name="licensePlate"
            value={createWash.licensePlate}
            onChange={(e) => handleChangeCreateWash(e)}
          />
        </FormControl>
        <Box pt="8">
          <Steper indexStep={indexStep} />
        </Box>
      </ModalBody>

      <ModalFooter>
        <Button variant="outline" onClick={handleModalClose}>
          Atras
        </Button>
        <Button
          colorScheme="teal"
          ml={3}
          isDisabled={isButtonDisabled}
          onClick={() =>
            setStepperStep({
              clientData: false,
              washData: true,
            })
          }
        >
          Guardar
        </Button>
      </ModalFooter>
    </>
  );
};

export default ClientData;
