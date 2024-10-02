/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { DashboardLayout } from "../components";
import TopBar from "../components/common/TopBar";
import CardsInfoDashboardContainer from "../components/dashboard/CardsInfoDashboardContainer";
import {
  Avatar,
  Badge,
  Box,
  Button,
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
import patchWash from "../services/patchWash";
import { hasValuesOnObject } from "../utilitis/validators";
import SuccessData from "../components/common/ModalAddWashs.tsx/SuccessData";
import { MdArrowDropDown } from "react-icons/md";

type Props = {};
type STATUS = {
  NO_PAGO: string;
  PAGADO: string;
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
  const [washTypeFilter, setWashTypeFilter] = useState("");
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
    // rate: false,
    paymentType: false,
  });
  const [washEstado, setWashEstado] = useState<string>('NO_PAGO')

  const isButtonDisabled =
    !createWash.clientName ||
    !createWash.vehicleType ||
    !createWash.licensePlate;

  const isButtonDisabledWashData =
    !createWash.washerId ||
    !createWash.washType ||
    !createWash.paymentType;

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
        const response = await postWash({ ...createWash, rate: createWash.washType === "FULL" ? "13000" : createWash.washType === "DRY" ? "15000" : "" });

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

  const finishWash = async (id) => {
    try {
      const response = await patchWash(id);
      console.log(response, "completed, listo");
    } catch (error) {
      console.log(error, "error");
    } finally {
      location.reload();
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
  const filteredData = listWashes?.data?.data?.filter((item) => {
    const matchesPlacas = item.licensePlate.includes(placasFilter);
    // Obtener el valor seleccionado del Select
    const matchesWashTypes = item.washType.includes(washTypeFilter);

    // El elemento se incluirá en los resultados si cumple ambas condiciones
    return matchesPlacas && matchesWashTypes;
  });

  const thWidth = "18vw";

  const badgeStatus: STATUS = {
    NO_PAGO: "red",
    PAGADO: "green",
  };

  const BadgeStatus = () => {
    const statusBadge = badgeStatus[washEstado] || null;
    console.log(washEstado, 'hola')
    return (
      <Select bg={statusBadge} icon={<MdArrowDropDown />} onChange={(e) => setWashEstado(e.target.value)}>
        <option value='NO PAGO'>NO PAGO</option>
        <option value='PAGADO'>PAGADO</option>
      </Select>
    );
  };

  //modal logic
  var handleModalClose = () => {
    onClose(); // Cierra el modal
  };
  return (
    <DashboardLayout>
      <>
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
              value={washTypeFilter}
              onChange={(e) => setWashTypeFilter(e.target.value)}
            >
              <option value="DRY">DRY</option>
              <option value="FULL">FULL</option>
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
                {filteredData &&
                  filteredData?.map((item) => (
                    <Tr key={item.id}>
                      <Td>
                        <WrapItem alignItems="center">
                          <Avatar
                            name={item?.clientName}
                            mr="12px"
                          />
                          {item?.clientName}
                        </WrapItem>
                      </Td>
                      <Td>{item?.vehicleType}</Td>
                      <Td>{item?.licensePlate}</Td>
                      <Td>{item?.washer.name}</Td>
                      <Td>{item?.washType}</Td>
                      <Td>
                        <BadgeStatus />
                      </Td>
                      <Td>
                        <Tooltip placement="auto">
                          <Stack align="end">
                            {/* <FiCalendar
                              onClick={onOpen}
                              cursor="pointer"
                              color="#319795"
                            /> */}{" "}
                            <Button
                              w="108px"
                              h="32px"
                              bg="buttonColor"
                              color="mainColor"
                              fontSize="14px"
                              p="18px 12px"
                              fontWeight="semibold"
                              _hover={{ bg: "#258685" }}
                              onClick={() => finishWash(item?.id)}
                            >
                              Finalizar
                            </Button>
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
        <ModalGlobal handleModalClose={handleModalClose} isOpen={isOpen} wash={wash}>
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
              isButtonDisabledWashData={isButtonDisabledWashData}
            />
          )}
        </ModalGlobal>
      </>
    </DashboardLayout>
  );
};

export default lavados;
