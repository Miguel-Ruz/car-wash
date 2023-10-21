/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { DashboardLayout } from "../components";
import TopBar from "../components/common/TopBar";
import CardsInfoDashboardContainer from "../components/dashboard/CardsInfoDashboardContainer";
import {
  Avatar,
  Badge,
  Box,
  Flex,
  Input,
  Select,
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
  WrapItem,
  useDisclosure,
} from "@chakra-ui/react";
import ButtonRegister from "../components/common/ButtonRegister";
import useFetchData from "../hooks/useFetchData";
import { FiCalendar } from "react-icons/fi";
import ModalGlobal from "../components/common/ModalGlobal";
import ModalAddWash from "../components/common/ModalAddWashs.tsx/ModalAddWash";
import postWash from "../services/postWash";
import { hasValuesOnObject } from "../utilitis/validators";
import SuccessData from "../components/common/ModalAddWashs.tsx/SuccessData";

type Props = {};
type STATUS = {
  WAITING: string;
  IN_PROGRESS: string;
  COMPLETED: string;
};
// Define un tipo para los estados de validación de los campos
type ValidationState = {
  washerId: boolean;
  clientName: boolean;
  vehicleType: boolean;
  licensePlate: boolean;
  washType: boolean;
  rate: boolean;
  paymentType: boolean;
};

const lavados = (props: Props) => {
  const [placasFilter, setPlacasFilter] = useState("");
  const [loading, setLoading] = useState(false); // Estado para rastrear la carga de la solicitud
  const [wash, setWash] = useState({});
  const [stepperStep, setStepperStep] = useState({
    clientData: true,
    washData: false,
  });
  const [createWash, setCreateWash] = useState({
    washerId: "",
    clientName: "",
    vehicleType: "",
    licensePlate: "",
    washType: "",
    rate: "",
    paymentType: "",
  });
  // Estado para manejar la validación de campos
  const [validation, setValidation] = useState<ValidationState>({
    washerId: false,
    clientName: false,
    vehicleType: false,
    licensePlate: false,
    washType: false,
    rate: false,
    paymentType: false,
  });

  const isButtonDisabled =
    !createWash.clientName ||
    !createWash.vehicleType ||
    !createWash.licensePlate;

  // Función para validar y formatear la placa
  const validateLicensePlate = (value: string) => {
    // Elimina espacios en blanco y convierte a mayúsculas
    const formattedValue = value.replace(/\s/g, "").toUpperCase();

    if (formattedValue.length === 6) {
      return formattedValue; // Devuelve la placa tal como está si tiene 6 caracteres o menos
    }
    return formattedValue.slice(0, 6); // Recorta a 6 caracteres si tiene más de 6
  };

  const handleChangeCreateWash = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // Validación de campos obligatorios
    const isRequiredField = name !== "rate" && name !== "paymentType";
    const isFieldValid = isRequiredField ? !!value.trim() : true;

    // Si el campo es 'licensePlate', valida y formatea la placa
    const formattedLicensePlate =
      name === "licensePlate" ? validateLicensePlate(value) : value;

    setCreateWash({
      ...createWash,
      [name]: formattedLicensePlate,
    });

    setValidation({
      ...validation,
      [name]: isFieldValid,
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
        const response = await postWash(createWash);
        console.log(
          "🚀 ~ file: lavados.tsx:133 ~ handleSubmitCreateWash ~ response:",
          response
        );
        // La petición se ha completado exitosamente
        setWash(response);
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
  console.log(loading, "loading post");
  useEffect(() => {
    console.log(createWash, "holaola");
  }, [createWash]);

  //open modal
  const { isOpen, onOpen, onClose } = useDisclosure();

  //wash count
  const url = "http://localhost:3000/api/wash/count";
  const { data } = useFetchData(url);

  const urlListWashes = "http://localhost:3000/api/wash";
  const listWashes = useFetchData(urlListWashes);

  const urlListWasher = "http://localhost:3000/api/washer";
  const listWasher = useFetchData(urlListWasher);

  //filtrar por placas
  const filteredData = listWashes.data?.data?.filter((item) =>
    item.licensePlate.includes(placasFilter)
  );

  const thWidth = "18vw";

  const badgeStatus: STATUS = {
    WAITING: "red",
    IN_PROGRESS: "yellow",
    COMPLETED: "green",
  };

  const BadgeStatus = ({ status, item }) => {
    const statusBadge = badgeStatus[status] || null;

    return (
      <Badge variant="solid" colorScheme={statusBadge}>
        {item.status}
      </Badge>
    );
  };

  //modal logic
  var handleModalClose = () => {
    onClose(); // Cierra el modal
  };
  const isData = hasValuesOnObject(wash);
  console.log(wash, "washPostData1");
  console.log(isData, "washPostData2");
  return (
    <DashboardLayout>
      <TopBar title="Lavados" />
      <CardsInfoDashboardContainer dashboardCounter={data} />

      <Flex p="32px 24px" justifyContent="space-between">
        <Flex gap="1rem" alignItems="center">
          <Text>Buscar</Text>
          <Input
            placeholder="Placas"
            size="md"
            w="200px"
            value={placasFilter}
            onChange={(e) => setPlacasFilter(e.target.value)}
          />
          <Select
            color="fontColorTwo"
            placeholder="Tipo de lavado"
            size="md"
            variant="outline"
            w="400px"
          >
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
        </Flex>
        <Box>
          <ButtonRegister onOpen={onOpen} title="Registrar nuevo lavado " />
        </Box>
      </Flex>
      <Box px="24px">
        <TableContainer border="1px solid #E2E8F0" borderRadius="12px">
          <Table size="md">
            <Thead>
              <Tr bg="primaryColor">
                <Th w={thWidth}>NOMBRE</Th>
                <Th w={thWidth}>VEHICULO</Th>
                <Th w={thWidth}>PLACAS</Th>
                <Th w={thWidth}>LAVADOR</Th>
                <Th w={thWidth}>LAVADO</Th>
                <Th w={thWidth}>ESTADO</Th>

                <Th />
              </Tr>
            </Thead>
            <Tbody>
              {filteredData?.map((item) => (
                <Tr key={item.id}>
                  <Td>
                    <WrapItem alignItems="center">
                      <Avatar
                        name="Dan Abrahmov"
                        src="https://bit.ly/dan-abramov"
                        mr="12px"
                      />
                      {item.clientName}
                    </WrapItem>
                  </Td>
                  <Td>{item.vehicleType}</Td>
                  <Td>{item.licensePlate}</Td>
                  <Td>{item.washer.name}</Td>
                  <Td>{item.washType}</Td>
                  <Td>
                    <BadgeStatus status={item.status} item={item} />
                  </Td>
                  <Td>
                    <Tooltip hasArrow label="Cerrar día" placement="auto">
                      <Stack align="end">
                        <FiCalendar cursor="pointer" color="#319795" />{" "}
                        {/* ALINEAR A LA DERECHA ESTE BENDITO ICONITO. ME HIZO BOTAR EL CHUPO */}
                      </Stack>
                    </Tooltip>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
      <ModalGlobal handleModalClose={handleModalClose} isOpen={isOpen}>
        {hasValuesOnObject(wash) ? (
          <SuccessData handleModalClose={handleModalClose} />
        ) : (
          <ModalAddWash
            handleModalClose={handleModalClose}
            setStepperStep={setStepperStep}
            stepperStep={stepperStep}
            handleChangeCreateWash={handleChangeCreateWash}
            createWash={createWash}
            listWasher={listWasher}
            isButtonDisabled={isButtonDisabled}
            handleSubmitCreateWash={handleSubmitCreateWash}
            loading={loading}
          />
        )}
      </ModalGlobal>
    </DashboardLayout>
  );
};

export default lavados;
