/* eslint-disable react-hooks/rules-of-hooks */
import {
  Box,
  HStack,
  IconButton,
  Input,
  Stack,
  Tab,
  Table,
  TableContainer,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tooltip,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FiCalendar, FiPlus, FiSearch } from "react-icons/fi";
import { DashboardLayout } from "../components";
import TopBar from "../components/common/TopBar";
import ButtonRegister from "../components/common/ButtonRegister";
import postWasher from "../services/postWashers";
import deleteWasher from "../services/deleteWasher";
import patchWasher from "../services/patchWasher";
import getWashWeekly from "../services/getWashWeekly";



//Custom hooks
import useFetchData from "../hooks/useFetchData";

//utils
import ModalAddWasherr from "../components/common/ModalAddWasher/ModalAddWasherr";
import ModalGlobal from "../components/common/ModalGlobal";
import MenuEditDelete from "../components/common/MenuEditDelete/MenuEditDelete";
import Toast from "../components/common/Toast/Toast";
import { hasValuesOnObject } from "../utilitis/validators";
import { Toaster } from "react-hot-toast";

type Props = {};

interface Washer {
  id: string;
  name: string;
  documentId: string;
  washes: number;
  status: boolean;
  earnings: number;
  address: string
  city: string
  exp_id_date: string
  department: string
  phone_number: string

}
// Define un tipo para los estados de validación de los campos
type ValidationState = {
  name: boolean,
  documento: boolean,
  exp_id_date: boolean,
  phone_number: boolean,
  address: boolean,
  city: boolean,
  department: boolean
};

const lavadores = (props: Props) => {
  const [nameFilter, setNameFilter] = useState("");
  const [documentFilter, setDocumentFilter] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false); // Estado para rastrear la carga de la solicitud
  const [editWasher, setEditWasher] = useState(null);
  const [washWeekly, setWashWeekly] = useState(null);


  const [createWasher, setCreateWasher] = useState({
    name: "",
    documento: "",
    exp_id_date: "",
    phone_number: "",
    address: "",
    city: "",
    department: ""
  })
  // Estado para manejar la validación de campos
  const [validation, setValidation] = useState<ValidationState>({
    name: false,
    documento: false,
    exp_id_date: false,
    phone_number: false,
    address: false,
    city: false,
    department: false
  });

  const [stepperStep, setStepperStep] = useState({
    washerData1: true,
    washerData2: false,
  });

  const handleChangeCreateWasher = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setCreateWasher({
      ...createWasher,
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

  console.log(createWasher, 'createWasher')
  const handleSubmit = async (e: any) => {
    e.preventDefault();


    // Valida que los campos "name" y "documento" tengan valores antes de enviar la solicitud
    // if (createWasher.name.trim() === "" || createWasher.documento.trim() === "")
    if (isFormValid()) {
      setLoading(true);
      try {
        let data
        const dataToSend = {
          name: createWasher.name,
          phone_number: createWasher.phone_number,
          documentId: createWasher.documento,
          exp_id_date: createWasher.exp_id_date,
          city: createWasher.city,
          department: createWasher.department,
          address: createWasher.address,
        };
        if (editWasher) {
          data = await patchWasher(dataToSend, editWasher?.id)
          Toast({ message: 'El lavador se editó con éxito', type: 'success', });
        } else {
          //fetch
          data = await postWasher(dataToSend);
          // cerrar modal y recargar la pagina
          if (data) {
            Toast({ message: 'El lavador se guardó con éxito', type: 'success' });
          }
        }
        setTimeout(
          () => window.location.reload(),
          3000
        )

      } catch (error) {
        console.error("Error:", error);
        Toast({ message: 'No se pudo guardar el lavador', type: 'error', retry: true });
      } finally {
        setLoading(false); // Establece el estado de carga a falso después de la petición
      }
    }




  };

  let handleModalClose = () => {
    onClose(); // Cierra el modal
  };

  const handleEditClick = (item: any) => {
    setEditWasher(item); // Guardar el item seleccionado
    onOpen(); // Abrir el modal
  };
  console.log(editWasher, 'editwasher')
  // delete washer
  const handleDeleteWasher = async (id: any) => {
    setLoading(true);
    let response;
    try {
      response = await deleteWasher(id); // Asumiendo que editWashService tiene un campo `id`
      Toast({ message: 'El Lavador se eliminó con éxito', type: 'success', });
      setTimeout(
        () => window.location.reload(),
        2500
      )

      if (hasValuesOnObject(response.error)) {
        Toast({ message: 'No se pudo eliminar el lavador', type: 'error', });
      }
    } catch (error) {
      // Hubo un error en la petición
      console.error("Error:", error);

      Toast({ message: 'No se pudo eliminar el lavador', type: 'error', });
    } finally {
      setLoading(false); // Establece el estado de carga a falso después de la petición
    }
  }

  //open modal
  const { isOpen, onOpen, onClose } = useDisclosure();

  const thWidth = "18vw";

  //fetch
  const url = "http://localhost:3000/api/washer";
  const { data } = useFetchData(url);

  // weekly
  useEffect(() => {
    const fetchData = async () => {
      const data = await getWashWeekly()
      setWashWeekly(data)
    }

    try {
      fetchData()
    } catch (error) {
      console.log(error)
    }
  }, [])

  console.log(washWeekly, 'washWeekly')
  //filtro
  const filteredData = data
    ? data?.filter((item) => {
      // Filtrar por nombre
      const nameMatches = item.name
        .toLowerCase()
        .includes(nameFilter.toLowerCase());

      // Filtrar por documento
      const documentMatches = item.documentId.includes(documentFilter);

      // Combinar ambas condiciones (AND lógico)
      return nameMatches && documentMatches;
    })
    : null;

  const isButtonDisabled =
    !createWasher.name ||
    !createWasher.phone_number ||
    !createWasher.documento ||
    !createWasher.exp_id_date;

  const isButtonDisabledWasher2 =
    !createWasher.city ||
    !createWasher.department ||
    !createWasher.address;
  console.log(filteredData, 'filteredData')
  return (
    <DashboardLayout>
      <>
        <TopBar title="Lavadores" />
        <Tabs>
          <TabList p="16px 24px 0 24px">
            <Tab>Reporte diario</Tab>
            <Tab>Reporte semanal</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>

              <HStack p="32px 24px" display="flex" justifyContent="space-between">
                <HStack spacing="16px">
                  <Text color="fontNavColor">Buscar</Text>
                  <Input
                    placeholder="Documento"
                    w="206px"
                    h="36px"
                    fontWeight="14px"
                    focusBorderColor="buttonColor"
                    value={documentFilter}
                    onChange={(e) => setDocumentFilter(e.target.value)}
                  />
                  <Input
                    placeholder="Nombre"
                    w="206px"
                    h="36px"
                    fontWeight="14px"
                    focusBorderColor="buttonColor"
                    value={nameFilter}
                    onChange={(e) => setNameFilter(e.target.value)}
                  />
                  <IconButton
                    aria-label="busqueda"
                    icon={<FiSearch />}
                    variant="outline"
                    color="buttonColor"
                    h="36px"
                  />
                </HStack>
                <Box>
                  <ButtonRegister onOpen={onOpen} title="Registrar nuevo lavador" />
                </Box>
              </HStack>

              <Box px="24px">
                <TableContainer border="1px solid #E2E8F0" borderRadius="12px">
                  <Table size="md">
                    <Thead>
                      <Tr bg="primaryColor">
                        <Th w={thWidth}>Nombre</Th>
                        <Th w={thWidth} >
                          DOCUMENTO
                        </Th>
                        <Th w={thWidth} >
                          EXPEDICIÓN
                        </Th>
                        <Th w={thWidth} >
                          TELÉFONO
                        </Th>
                        <Th w={thWidth} >
                          DIRECCIÓN
                        </Th>
                        <Th w={thWidth} >
                          LAVADOS HOY
                        </Th>
                        <Th w={thWidth} >
                          GANANCIA
                        </Th>
                        <Th >
                        </Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {filteredData?.map((washer: Washer) => {
                        return (
                          <Tr key={washer.id}>
                            <Td>{washer?.name}</Td>
                            <Td>{washer?.documentId}</Td>
                            <Td>{washer?.exp_id_date}</Td>
                            <Td>{washer?.phone_number}</Td>
                            <Td>{washer?.city}, {washer.address}</Td>
                            <Td>{washer?.washes}</Td>
                            <Td>{washer?.earnings}</Td>
                            <Td>
                              <Stack align="end">
                                <MenuEditDelete
                                  handleEditClick={handleEditClick}
                                  handleDelete={handleDeleteWasher}
                                  item={washer}
                                />

                              </Stack>
                            </Td>
                          </Tr>
                        );
                      })}
                    </Tbody>
                  </Table>
                </TableContainer>
                <Toaster
                  position="bottom-center"
                  reverseOrder={false}
                  gutter={8}
                  toastOptions={{ duration: 5000 }}
                />
              </Box>
            </TabPanel>
            <TabPanel>
              <TableContainer
                border="1px solid #E2E8F0"
                borderRadius="12px"
              >
                <Table>
                  <Thead>
                    <Tr bg="primaryColor">
                      <Th w={thWidth}>Nombre</Th>
                      <Th w={thWidth} >
                        DOCUMENTO
                      </Th>
                      <Th w={thWidth} >
                        EXPEDICIÓN
                      </Th>
                      <Th w={thWidth} >
                        SEMANA
                      </Th>
                      <Th w={thWidth} >
                        LAVADOS
                      </Th>
                      <Th w={thWidth} >
                        GANANCIA
                      </Th>
                      <Th >
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody fontSize="14px">
                    <Tr>
                      <Td fontWeight="500">item.week</Td>
                      <Td fontWeight="500">item.washerCount</Td>
                      <Td >item.total</Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
            </TabPanel>
          </TabPanels>
        </Tabs>

        <ModalGlobal handleModalClose={handleModalClose} isOpen={isOpen}>
          <ModalAddWasherr
            initialRef={null}
            handleModalClose={handleModalClose}
            setError={setError}
            setStepperStep={setStepperStep}
            stepperStep={stepperStep}
            isButtonDisabled={isButtonDisabled}
            handleChangeCreateWasher={handleChangeCreateWasher}
            createWasher={createWasher}
            isButtonDisabledWasher2={isButtonDisabledWasher2}
            handleSubmit={handleSubmit}
            loading={loading}
            editWasher={editWasher}
            setCreateWasher={setCreateWasher}
            setValidation={setValidation}
          />
        </ModalGlobal>
      </>
    </DashboardLayout >
  );
};

export default lavadores;
