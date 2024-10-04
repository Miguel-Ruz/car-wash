import React from 'react'
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
} from "@chakra-ui/react";
import Steper from '../Stepper';

type Props = {
    handleSubmit: (e: any) => any
    indexStep: number
    handleModalClose: () => void;
    isButtonDisabled: boolean
    setStepperStep: (value: {
        washerData1: boolean,
        washerData2: boolean,
    }) => void;
    createWasher: {
        name: string,
        documento: string,
        exp_id_date: string,
        phone_number: string,
        address: string
        city: string,
        department: string
    },
    handleChangeCreateWasher: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleDocumentoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const steps = [
    { title: "Paso 1", description: "Datos del lavador" },
    { title: "Paso 2", description: "Dirección" },
];

const ModalWasher1 = ({
    handleSubmit,
    indexStep,
    handleModalClose,
    isButtonDisabled,
    setStepperStep,
    createWasher,
    handleChangeCreateWasher,
    handleDocumentoChange
}: Props) => {
    return (
        <>
            <ModalHeader>Datos del lavador</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
                <FormControl>
                    <FormLabel>Nombre del lavador</FormLabel>
                    <Input
                        placeholder="Escribe el nombre del cliente"
                        name="name"
                        value={createWasher.name}
                        onChange={(e) => handleChangeCreateWasher(e)}
                    />
                </FormControl>

                <FormControl mt={4}>
                    <FormLabel>No. de telefono</FormLabel>
                    <Input
                        placeholder="310+++"
                        name="phone_number"
                        value={createWasher.phone_number}
                        onChange={(e) => handleChangeCreateWasher(e)}
                        type='number'
                        pattern="^(\+57)?[ -]?[1-9][0-9]{9}$"
                    />
                </FormControl>

                <FormControl mt={4}>
                    <FormLabel>Documento de identificación</FormLabel>
                    <Input
                        placeholder="Escribe el NO. de identificación"
                        name="documento"
                        value={createWasher.documento}
                        onChange={(e) => handleDocumentoChange(e)}
                        inputMode="numeric"
                    />
                </FormControl>

                <FormControl mt={4}>
                    <FormLabel>Fecha de expedición del documento</FormLabel>
                    <Input
                        name='exp_id_date'
                        value={createWasher.exp_id_date}
                        onChange={(e) => handleChangeCreateWasher(e)}
                        type='date'
                    />
                </FormControl>
                <Box pt="8">
                    <Steper indexStep={indexStep} steps={steps} />
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
                            washerData1: false,
                            washerData2: true,
                        })
                    }
                >
                    Continuar
                </Button>
            </ModalFooter>
            {/* <ModalFooter>
                <Button colorScheme="teal" mr={3} onClick={(e) => handleSubmit(e)}>
                    Guardar
                </Button>
            </ModalFooter> */}
        </>
    )
}

export default ModalWasher1