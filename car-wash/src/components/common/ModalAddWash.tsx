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
  Select,
} from "@chakra-ui/react";

type Props = {};

const ModalAddWash = ({ name, setName, plate, setPlate, handleSubmit }) => {
  return (
    <>
      <ModalHeader>Datos del cliente</ModalHeader>
      <ModalCloseButton />
      <ModalBody pb={6}>
        <FormControl>
          <FormLabel>Nombre del cliente</FormLabel>
          <Input
            placeholder="Escribe el nombre del cliente"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Tipo de vehiculo</FormLabel>
          <Select placeholder="Selecciona el tipo de vehiculo">
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Placa del vehiculo</FormLabel>
          <Input
            placeholder="XYZ-14B"
            value={plate}
            onChange={(e) => setPlate(e.target.value)}
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

export default ModalAddWash;
