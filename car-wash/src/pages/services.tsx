/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import { DashboardLayout } from "../components";
import TopBar from "../components/common/TopBar";
import {
  Box,
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
import putWashType from "../services/putWashType";
import deleteWashType from "../services/deleteWashType";
import { hasValuesOnObject } from "../utilitis/validators";
import { Toaster } from 'react-hot-toast';
import ModalAddWashType from "../components/common/ModalAddWashType/ModalAddWashType";
import ModalGlobal from "../components/common/ModalGlobal";
import Toast from "../components/common/Toast/Toast";
import MenuEditDelete from "../components/common/MenuEditDelete/MenuEditDelete";


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
  const [editWashService, setEditWashService] = useState(null);

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

  const ToastHandleSuccess = () => {
    Toast({ message: 'El servicio se guardó con éxito', type: 'success' });
  };

  const ToastHandleError = () => {
    Toast({ message: 'No se pudo guardar el servicio', type: 'error', retry: true });
  };

  const handleEditClick = (item: any) => {
    setEditWashService(item); // Guardar el item seleccionado
    onOpen(); // Abrir el modal
  };


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
      [name]: value.trim() !== '',
    });
  };

  // Función para verificar si el formulario es válido
  const isFormValid = () => {
    return validation.name && validation.value;
  };

  const handleSubmitCreateWash = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid()) {
      // Aquí puedes hacer algo con los datos de createWash, como enviarlos a un servidor o realizar alguna acción.
      setLoading(true); // Establece el estado de carga a verdadero antes de la petición
      //fetch
      try {
        let response;
        if (editWashService) {
          // Si estamos editando, utilizamos putWashType
          response = await putWashType(createWashType, editWashService.id); // Asumiendo que editWashService tiene un campo `id`
          if (response.success) {
            Toast({ message: 'El servicio se editó con éxito', type: 'success', });
          } else {
            Toast({ message: 'El servicio no se pudo editar', type: 'error', });
          }
          setTimeout(
            () => window.location.reload(),
            1000
          )
        } else {
          // Si estamos creando un nuevo servicio
          response = await postWashType({ ...createWashType });
          if (response.success) {
            ToastHandleSuccess()
          } else {
            ToastHandleError()
          }
          setTimeout(
            () => window.location.reload(),
            1000
          )
        }
        // La petición se ha completado exitosamente
        setWashType(response);

      } catch (error) {
        // Hubo un error en la petición
        ToastHandleError()
      } finally {
        setLoading(false); // Establece el estado de carga a falso después de la petición
      }
    } else {
      alert("Por favor, complete el formulario correctamente.");
    }
  };

  const handleDeleteWashType = async (id: any) => {
    setLoading(true);
    let response;
    try {
      response = await deleteWashType(id); // Asumiendo que editWashService tiene un campo `id`
      if (response.success) {
        Toast({ message: 'El servicio se eliminó con éxito', type: 'success', });
      } else {
        Toast({ message: 'No se pudo eliminar el servicio', type: 'error', });
      }
      setTimeout(
        () => window.location.reload(),
        1000
      )
    } catch (error) {
      // Hubo un error en la petición
      Toast({ message: 'No se pudo eliminar el servicio', type: 'error', });
    } finally {
      setLoading(false); // Establece el estado de carga a falso después de la petición
    }
  }


  //open modal
  const { isOpen, onOpen, onClose } = useDisclosure();

  const urlListWashtype = "http://localhost:3000/api/washtype";
  const listWashType = useFetchData(urlListWashtype);
  //filtrar por nombre
  const filteredData = listWashType?.data?.filter((item) => {
    const matchesNames = item.name.includes(nameFilter);

    // El elemento se incluirá en los resultados si cumple ambas condiciones
    return matchesNames;
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
            <Text onClick={() => ToastHandleSuccess()}>Buscar</Text>
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
                  filteredData?.map((item) => (
                    <Tr key={item.id}>
                      <Td>
                        {item?.name}
                      </Td>
                      <Td>{item?.value}</Td>
                      <Td>
                        <Stack align="end">
                          <MenuEditDelete
                            handleEditClick={handleEditClick}
                            handleDelete={handleDeleteWashType}
                            item={item}
                          />

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
            toastOptions={{ duration: 4000 }}
          />

        </Box>
        <ModalGlobal handleModalClose={handleModalClose} isOpen={isOpen} wash={washType}>
          <ModalAddWashType
            handleModalClose={handleModalClose}
            handleChangeCreateWashType={handleChangeCreateWashType}
            handleSubmitCreateWash={handleSubmitCreateWash}
            createWashType={createWashType}
            isButtonDisabled={isButtonDisabled}
            editWashService={editWashService}
            setCreateWashType={setCreateWashType}
            setValidation={setValidation}
          />
        </ModalGlobal>
      </>
    </DashboardLayout>
  );
};

export default services;
