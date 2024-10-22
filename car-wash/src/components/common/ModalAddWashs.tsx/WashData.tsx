import React, { useEffect, useState } from "react";
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
import { formatCurrency } from "../../../utilitis/formatter";

type Props = {
  indexStep: number;
  setStepperStep: (value: { clientData: boolean; washData: boolean }) => void;
  handleChangeCreateWash: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  createWash: {
    washerId: string;
    clientName: string;
    vehicleType: string;
    licensePlate: string;
    washType: string
    rate: string;
    paymentType: string;
  };
  listWasher: any;
  handleSubmitCreateWash: () => void;
  loading: boolean;
  isButtonDisabledWashData: boolean;
  listWashType: any
  selectedWashType: any
  setSelectedWashType: any;
  editWash: any;
  setCreateWash: any;
  setValidation: any;
};

const steps = [
  { title: "Paso 1", description: "Datos del cliente" },
  { title: "Paso 2", description: "Datos del lavado" },
];

const WashData = ({
  indexStep,
  setStepperStep,
  handleChangeCreateWash,
  createWash,
  listWasher,
  handleSubmitCreateWash,
  loading,
  isButtonDisabledWashData,
  listWashType,
  selectedWashType,
  setSelectedWashType,
  editWash,
  setCreateWash,
  setValidation
}: Props) => {
  // Actualiza el rate cuando se selecciona un washType
  const handleWashTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;

    // Encuentra el tipo de lavado seleccionado y su rate
    const selectedWashType = listWashType?.data?.find(
      (item: any) => item.name === value
    );


    if (selectedWashType) {
      setSelectedWashType(selectedWashType)
      // // Primero actualizamos el washType
      // handleChangeCreateWash({
      //   target: {
      //     name: "washType",
      //     value: selectedWashType.name, // El nombre del tipo de lavado
      //   },
      // } as React.ChangeEvent<HTMLSelectElement>); // Tipamos el evento manualmente

      // Luego actualizamos el rate (precio del lavado)
      handleChangeCreateWash({
        target: {
          name: "rate",
          value: selectedWashType.value, // El valor del tipo de lavado
        },
      } as React.ChangeEvent<HTMLSelectElement>); // Tipamos el evento manualmente
    }
  };

  useEffect(() => {
    if (editWash) {
      setCreateWash({
        washType: editWash.washType || '',
        paymentType: editWash.paymentType || '',
        washerId: editWash.washerId || '',
        rate: editWash.rate || '',
      });
      // Actualiza la validación también
      setValidation({
        washType: !!editWash.clientName,
        paymentType: !!editWash.paymentType,
        washerId: !!editWash.washerId,
        rate: !!editWash.rate,
      });
    }
  }, [editWash]);

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
            onChange={(e) => {
              handleWashTypeChange(e)
              handleChangeCreateWash(e)
            }}
          >
            {listWashType &&
              listWashType?.data?.map((item: any) => (
                <option
                  key={item.id}
                  value={item.name}
                >
                  {item.name}
                </option>
              ))
            }
          </Select>
        </FormControl>

        <FormControl mt={4}>
          <FormLabel fontWeight="bold">Tipo de pago</FormLabel>
          <Select
            placeholder="Selecciona el tipo de pago"
            name="paymentType"
            value={createWash.paymentType}
            onChange={handleChangeCreateWash}
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
            onChange={handleChangeCreateWash}
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
          <Input
            name="rate"
            value={formatCurrency(selectedWashType.value || editWash && editWash.rate)}
            readOnly
            disabled
          />
        </FormControl>

        <Box pt="8">
          <Steper indexStep={indexStep} steps={steps} />
        </Box>
      </ModalBody >

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
          onClick={handleSubmitCreateWash}
          isLoading={loading}
          isDisabled={isButtonDisabledWashData}
        >
          Guardar
        </Button>
      </ModalFooter>
    </>
  );
};

export default WashData;
