import { Box, Button, FormControl, FormLabel, Input, ModalBody, ModalCloseButton, ModalFooter, ModalHeader } from '@chakra-ui/react'
import React, { useEffect } from 'react'

type Props = {
    handleModalClose: () => void;
    handleChangeCreateWashType: (e: React.ChangeEvent<HTMLInputElement>) => void;
    createWashType: { name: string, value: string }
    isButtonDisabled: boolean
    handleSubmitCreateWash: (e: React.FormEvent) => Promise<void>,
    editWashService: any,
    setCreateWashType: any,
    setValidation: any
}

const ModalAddWashType = ({
    handleModalClose,
    handleChangeCreateWashType,
    handleSubmitCreateWash,
    createWashType,
    isButtonDisabled,
    editWashService,
    setCreateWashType,
    setValidation
}: Props) => {

    useEffect(() => {
        if (editWashService) {
            setCreateWashType({
                name: editWashService.name || '',
                value: editWashService.value || '',
            });
            // Actualiza la validación también
            setValidation({
                name: !!editWashService.name,
                value: !!editWashService.value,
            });
        }
    }, [editWashService]);

    return (
        <>
            <ModalHeader>{editWashService ? 'Editar servicio' : 'Nuevo servicio'}</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
                <FormControl>
                    <FormLabel>Nombre del servico</FormLabel>
                    <Input
                        placeholder="Escribe el nombre del servicio"
                        name="name"
                        value={createWashType.name}
                        onChange={(e) => handleChangeCreateWashType(e)}
                    />
                </FormControl>

                <FormControl mt={4}>
                    <FormLabel>Valor del servicio</FormLabel>
                    <Input
                        placeholder="Escribe el valor del servicio"
                        name="value"
                        value={createWashType.value}
                        onChange={(e) => handleChangeCreateWashType(e)}
                        type='number'
                        pattern="^(\+57)?[ -]?[1-9][0-9]{9}$"
                    />
                </FormControl>
            </ModalBody>

            <ModalFooter>
                <Button variant="outline" onClick={handleModalClose}>
                    Cancelar
                </Button>
                <Button
                    colorScheme="teal"
                    ml={3}
                    isDisabled={isButtonDisabled}
                    onClick={(e) => handleSubmitCreateWash(e)}
                >
                    Guardar
                </Button>
            </ModalFooter>
        </>
    )
}

export default ModalAddWashType