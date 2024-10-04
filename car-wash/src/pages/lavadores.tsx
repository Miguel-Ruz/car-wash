/* eslint-disable react-hooks/rules-of-hooks */
import {
  Box,
  HStack,
  IconButton,
  Input,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FiCalendar, FiPlus, FiSearch } from "react-icons/fi";
import { DashboardLayout } from "../components";
import TopBar from "../components/common/TopBar";
import ButtonRegister from "../components/common/ButtonRegister";
import postWasher from "../services/postWashers";


//Custom hooks
import useFetchData from "../hooks/useFetchData";

//utils
import ModalAddWasherr from "../components/common/ModalAddWasher/ModalAddWasherr";
import ModalGlobal from "../components/common/ModalGlobal";

type Props = {};

interface Washer {
  id: string;
  name: string;
  documentId: string;
  washes: number;
  status: boolean;
  earnings: number;
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

  console.log(createWasher, 'hoa')

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


  const handleSubmit = async (e: any) => {
    e.preventDefault();


    // Valida que los campos "name" y "documento" tengan valores antes de enviar la solicitud
    // if (createWasher.name.trim() === "" || createWasher.documento.trim() === "")
    if (isFormValid()) {
      setLoading(true);
      try {
        const dataToSend = {
          name: createWasher.name,
          phone_number: createWasher.phone_number,
          documentId: createWasher.documento,
          exp_id_date: createWasher.exp_id_date,
          city: createWasher.city,
          department: createWasher.department,
          address: createWasher.address,
        };

        //fetch
        const data = await postWasher(dataToSend);
        //cerrar modal y recargar la pagina
        // if (data) {
        //   handleModalClose();
        //   window.location.reload();
        // }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false); // Establece el estado de carga a falso después de la petición
      }
    }




  };

  let handleModalClose = () => {
    onClose(); // Cierra el modal
  };
  //open modal
  const { isOpen, onOpen, onClose } = useDisclosure();

  const thWidth = "18vw";

  //fetch
  const url = "http://localhost:3000/api/washer";
  const { data } = useFetchData(url);

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

  return (
    <DashboardLayout>
      <>
        <TopBar title="Lavadores" />

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
                  <Th w={thWidth} textAlign="center" isNumeric>
                    Documentos
                  </Th>
                  <Th w={thWidth} isNumeric>
                    Lavados del dia
                  </Th>
                  <Th w={thWidth} isNumeric>
                    Ganancia
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredData?.map((washer: Washer) => {
                  return (
                    <Tr key={washer.id}>
                      <Td>{washer?.name}</Td>
                      <Td isNumeric>{washer?.documentId}</Td>
                      <Td isNumeric>{washer?.washes}</Td>
                      <Td isNumeric>{washer?.earnings}</Td>
                      {/* <Td>
                        <Tooltip hasArrow label="Cerrar día" placement="auto">
                          <Stack align="end">
                            <FiCalendar cursor="pointer" color="#319795" />{" "}
                          </Stack>
                        </Tooltip>
                      </Td> */}
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
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
          />
        </ModalGlobal>
      </>
    </DashboardLayout>
  );
};

export default lavadores;
