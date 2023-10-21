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
  listWasher: any;
  handleSubmitCreateWash: () => void;
  loading: boolean;
};

const WashData = ({
  indexStep,
  setStepperStep,
  handleChangeCreateWash,
  createWash,
  listWasher,
  handleSubmitCreateWash,
  loading,
}: Props) => {
  return (
    <>
      <ModalHeader>Datos del lavado</ModalHeader>
      <ModalCloseButton />
      <ModalBody pb={6}>
        <FormControl>
          <FormLabel fontWeight="bold">Tipo de lavado o servicio</FormLabel>
          <Select
            placeholder="Selecciona el tipo de lavado o servicio"
            name="washType"
            value={createWash.washType}
            onChange={(e) => handleChangeCreateWash(e)}
          >
            <option value="FULL">FULL</option>
            <option value="DRY">DRY</option>
          </Select>
        </FormControl>

        <FormControl mt={4}>
          <FormLabel fontWeight="bold">Tipo de pago</FormLabel>
          <Select
            placeholder="Selecciona el tipo de pago"
            name="paymentType"
            value={createWash.paymentType}
            onChange={(e) => handleChangeCreateWash(e)}
          >
            <option value="Efectivo">Efectivo</option>
            <option value="Tarjeta">Tarjeta</option>
            <option value="Transferencia">Transferencia</option>
          </Select>
        </FormControl>

        <FormControl mt={4}>
          <FormLabel fontWeight="bold">Lavador</FormLabel>
          <Select
            placeholder="Selecciona al lavador"
            name="washerId"
            value={createWash.washerId}
            onChange={(e) => handleChangeCreateWash(e)}
          >
            {listWasher &&
              listWasher?.data?.map((item: any) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
          </Select>
        </FormControl>

        <FormControl mt={4}>
          <FormLabel fontWeight="bold">Valor del lavado</FormLabel>
          <Select
            placeholder="Tipo de lavado"
            name="rate"
            value={createWash.rate}
            onChange={(e) => handleChangeCreateWash(e)}
          >
            <option value="13000">FULL - $13.000</option>
            <option value="15000">DRY - $15.000</option>
          </Select>
        </FormControl>

        <Box pt="8">
          <Steper indexStep={indexStep} />
        </Box>
      </ModalBody>

      <ModalFooter>
        <Button
          variant="outline"
          onClick={() =>
            setStepperStep({
              clientData: true,
              washData: false,
            })
          }
        >
          Atras
        </Button>
        <Button
          colorScheme="teal"
          ml={3}
          onClick={(e) => handleSubmitCreateWash(e)}
          isLoading={loading}
        >
          Guardar
        </Button>
      </ModalFooter>
    </>
  );
};

export default WashData;
