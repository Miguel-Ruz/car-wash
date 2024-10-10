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
        address: string,
        city: string,
        department: string
    },
    handleChangeCreateWasher: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isButtonDisabledWasher2: boolean,
    loading: boolean
    editWasher: any
}
const steps = [
    { title: "Paso 1", description: "Datos del lavador" },
    { title: "Paso 2", description: "Dirección" },
];

const ModalWasher2 = ({
    handleSubmit,
    indexStep,
    handleModalClose,
    isButtonDisabled,
    setStepperStep,
    createWasher,
    handleChangeCreateWasher,
    isButtonDisabledWasher2,
    loading,
    editWasher
}: Props) => {
    return (
        <>
            <ModalHeader>{!editWasher ? 'Datos del lavador' : 'Editar datos del lavador'}</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
                <FormControl>
                    <FormLabel>Ciudad</FormLabel>
                    <Input
                        placeholder="Escribe el nombre de la ciudad"
                        name="city"
                        value={createWasher.city}
                        onChange={(e) => handleChangeCreateWasher(e)}
                    />
                </FormControl>

                <FormControl mt={4}>
                    <FormLabel>Departamento</FormLabel>
                    <Input
                        placeholder="Escribe el nombre del departamento"
                        name="department"
                        value={createWasher.department}
                        onChange={(e) => handleChangeCreateWasher(e)}
                        inputMode="numeric"
                    />
                </FormControl>

                <FormControl mt={4}>
                    <FormLabel>Dirección</FormLabel>
                    <Input
                        placeholder='Escribe la dirección'
                        name='address'
                        value={createWasher.address}
                        onChange={(e) => handleChangeCreateWasher(e)}
                    />
                </FormControl>
                <Box pt="8">
                    <Steper indexStep={indexStep} steps={steps} />
                </Box>
            </ModalBody>

            <ModalFooter>
                <Button variant="outline" onClick={() =>
                    setStepperStep({
                        washerData1: true,
                        washerData2: false,
                    })
                }>
                    Atras
                </Button>
                <Button
                    colorScheme="teal"
                    ml={3}
                    isDisabled={isButtonDisabledWasher2}
                    isLoading={loading}
                    onClick={(e) => {
                        handleSubmit(e)
                        setStepperStep({
                            washerData1: false,
                            washerData2: true,
                        })
                    }
                    }
                >
                    Guardar
                </Button>
            </ModalFooter>
        </>
    )
}

export default ModalWasher2