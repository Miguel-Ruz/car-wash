/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import { DashboardLayout } from "../components";
import TopBar from "../components/common/TopBar";
import {
  Box,
  Button,
  Flex,
  Input,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import ButtonRegister from "../components/common/ButtonRegister";
import useFetchData from "../hooks/useFetchData";
import postWashType from "../services/postWashType";
import { hasValuesOnObject } from "../utilitis/validators";
import toast, { Toaster } from 'react-hot-toast';
import ModalAddWashType from "../components/common/ModalAddWashType/ModalAddWashType";
import ModalGlobal from "../components/common/ModalGlobal";


type Props = {};
// Define un tipo para los estados de validación de los campos
type ValidationState = {
  name: boolean;
  value: boolean;
};

const services = (props: Props) => {
  const [nameFilter, setNameFilter] = useState("");
  const [washTypeFilter, setWashTypeFilter] = useState("");
  const [loading, setLoading] = useState(false); // Estado para rastrear la carga de la solicitud
  const [washType, setWashType] = useState({});

  const [createWashType, setCreateWashType] = useState({
    name: "",
    value: "",
  });
  // Estado para manejar la validación de campos
  const [validation, setValidation] = useState<ValidationState>({
    name: false,
    value: false,
  });
  const [washEstado, setWashEstado] = useState<string>('NO_PAGO')

  const isButtonDisabled =
    !createWashType.name ||
    !createWashType.value


  const handleChangeCreateWashType = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setCreateWashType({
      ...createWashType,
      [name]: value,
    });

    setValidation({
      ...validation,
      [name]: value,
    });
  };

  // Función para verificar si el formulario es válido
  const isFormValid = () => {
    return Object.values(validation).every((isValid) => isValid);
  };

  const handleSubmitCreateWash = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid()) {
      // Aquí puedes hacer algo con los datos de createWash, como enviarlos a un servidor o realizar alguna acción.
      setLoading(true); // Establece el estado de carga a verdadero antes de la petición
      //fetch
      try {
        const response = await postWashType({ ...createWashType });

        // La petición se ha completado exitosamente
        setWashType(response);
        if (hasValuesOnObject(washType)) {
          toast('hola')
        }
      } catch (error) {
        // Hubo un error en la petición
        console.error("Error:", error);
      } finally {
        setLoading(false); // Establece el estado de carga a falso después de la petición
      }
    } else {
      alert("Por favor, complete el formulario correctamente.");
    }
  };


  //open modal
  const { isOpen, onOpen, onClose } = useDisclosure();

  const urlListWashtype = "http://localhost:3000/api/washtype";
  const listWashType = useFetchData(urlListWashtype);

  //filtrar por nombre
  const filteredData = listWashType?.data?.data?.filter((item) => {
    const matchesNames = item.name.includes(nameFilter);
    // Obtener el valor seleccionado del Select
    const matchesWashTypes = item.washType.includes(washTypeFilter);

    // El elemento se incluirá en los resultados si cumple ambas condiciones
    return matchesNames && matchesWashTypes;
  });

  //modal logic
  var handleModalClose = () => {
    onClose(); // Cierra el modal
  };

  return (
    <DashboardLayout>
      <>
        <TopBar title="Servicios y precios" />

        <Flex p="32px 24px" justifyContent="space-between">
          <Flex gap="1rem" alignItems="center">
            <Text onClick={() => toast.success('El servicio se guardó con éxito')}>Buscar</Text>
            <Input
              placeholder="Nombre"
              size="md"
              w="229px"
              value={nameFilter}
              onChange={(e) => setNameFilter(e.target.value)}
            />
          </Flex>
          <Box>
            <ButtonRegister onOpen={onOpen} title="Agregar servicio nuevo" />
          </Box>
        </Flex>
        <Box px="24px">
          <TableContainer border="1px solid #E2E8F0" borderRadius="12px">
            <Table size="md">
              <Thead>
                <Tr bg="primaryColor">
                  <Th>NOMBRE DEL SERVICIO</Th>
                  <Th>VALOR DEL SERVICIO</Th>
                  <Th />
                </Tr>
              </Thead>
              <Tbody>
                {filteredData &&
                  filteredData?.map((item: { id: string, washType: string, price: string }) => (
                    <Tr key={item.id}>
                      <Td>
                        {item?.washType}
                      </Td>
                      <Td>{item?.price}</Td>
                      <Td>
                        <Stack align="end">
                          <Button
                            w="108px"
                            h="32px"
                            bg="buttonColor"
                            color="mainColor"
                            fontSize="14px"
                            p="18px 12px"
                            fontWeight="semibold"
                            _hover={{ bg: "#258685" }}
                          // onClick={() => finishWash(item?.id)}
                          >
                            Finalizar
                          </Button>
                        </Stack>
                      </Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          </TableContainer>
          <Toaster
            position="bottom-center"
            reverseOrder={false}
            gutter={8}
            containerClassName=""
            containerStyle={{}}

            toastOptions={{
              // Define default options
              className: '',
              duration: 5000,
              style: {
                background: '#38A169',
                color: '#fff',
              },
              success: {
                duration: 1500,
              }
            }}
          />

        </Box>
        <ModalGlobal handleModalClose={handleModalClose} isOpen={isOpen} wash={washType}>
          <ModalAddWashType
            handleModalClose={handleModalClose}
            handleChangeCreateWashType={handleChangeCreateWashType}
            handleSubmitCreateWash={handleSubmitCreateWash}
            createWashType={createWashType}
            isButtonDisabled={isButtonDisabled}
          />
        </ModalGlobal>
      </>
    </DashboardLayout>
  );
};

export default services;
