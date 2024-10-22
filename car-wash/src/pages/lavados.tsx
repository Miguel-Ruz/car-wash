/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useRef, useState } from "react";
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
import deleteWash from "../services/deleteWash";
import editWashService from "../services/editWashService";
import { hasValuesOnObject } from "../utilitis/validators";
import SuccessData from "../components/common/ModalAddWashs.tsx/SuccessData";
import { MdArrowDropDown } from "react-icons/md";
import { Toaster } from "react-hot-toast";
import Toast from "../components/common/Toast/Toast";
import MenuEditDelete from "../components/common/MenuEditDelete/MenuEditDelete";
import AlternativeModal from "../components/common/ModalAddWashs.tsx/SuccessData";

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
  const [selectedWashType, setSelectedWashType] = useState({
    name: "",
    value: ""
  })
  const [editWash, setEditWash] = useState(null);
  const [isDeleteWash, setIsDeleteWash] = useState(false);
  const [idDeleteWash, setIdDeleteWash] = useState("")
  const [washPagado, setWashPagado] = useState()

  const isButtonDisabled =
    !createWash.clientName ||
    !createWash.vehicleType ||
    !createWash.licensePlate;

  const isButtonDisabledWashData =
    !createWash.washerId ||
    !createWash.washType ||
    !createWash.rate ||
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
        let response;
        if (editWash) {
          response = await editWashService(createWash, editWash.id);
          if (response.success) {
            Toast({ message: 'El servicio se editó con éxito', type: 'success', });
          } else {
            Toast({ message: 'No se pudo editar el lavado', type: 'error', retry: true });
          }
        } else {
          response = await postWash({ ...createWash, rate: selectedWashType.value });
          // La petición se ha completado exitosamente
          setWash(response);
          if (response.success) {
            Toast({ message: 'El lavado se guardó con éxito', type: 'success', });
          }
        }
        setTimeout(
          () => window.location.reload(),
          1000
        )
      } catch (error) {
        // Hubo un error en la petición
        Toast({ message: 'No se pudo guardar el lavado', type: 'error', retry: true });
      } finally {
        setLoading(false); // Establece el estado de carga a falso después de la petición
      }
    } else {
      alert("Por favor, complete el formulario correctamente.");
    }
  };

  const finishWash = async (id: string) => {
    try {
      const response = await patchWash(id);
      setWashPagado(response.data)
      if (response.success) {
        Toast({ message: 'El servicio se pagó con éxito', type: 'success', });
      } else {
        Toast({ message: 'No se pudo pagar el servicio', type: 'error', });
      }
      setTimeout(
        () => window.location.reload(),
        1000
      )
    } catch (error) {
      Toast({ message: 'No se pudo pagar el servicio', type: 'error', });
      setTimeout(
        () => window.location.reload(),
        1000
      )
    } finally {
      // location.reload();
    }
  };

  const handleDeleteWash = async (id: any) => {
    setLoading(true);
    let response;
    try {
      response = await deleteWash(id); // Asumiendo que editWashService tiene un campo `id`
      if (response.success) {
        Toast({ message: 'El servicio se eliminó con éxito', type: 'success', });
        setTimeout(
          () => window.location.reload(),
          1000
        )
      } else {
        Toast({ message: 'No se pudo eliminar el servicio', type: 'error', });
      }
    } catch (error) {
      // Hubo un error en la petición
      Toast({ message: 'No se pudo eliminar el servicio', type: 'error', });
    } finally {
      setLoading(false); // Establece el estado de carga a falso después de la petición
    }

  }

  const handleOpenModalDeleteWash = (id: any) => {
    setIsDeleteWash(true)
    setIdDeleteWash(id)
    onOpen()
  }

  useEffect(() => {
    if (selectedWashType.value) {
      setCreateWash({
        ...createWash,
        rate: selectedWashType.value
      })
    }
  }, [selectedWashType])

  //editar lavado
  const handleEditClick = (item: any) => {
    setEditWash(item); // Guardar el item seleccionado
    onOpen(); // Abrir el modal
  }



  //open modal
  const { isOpen, onOpen, onClose } = useDisclosure();

  //wash count
  const url = "http://localhost:3000/api/wash/count";
  const { data } = useFetchData(url);

  const urlListWashes = "http://localhost:3000/api/wash";
  const listWashes = useFetchData(urlListWashes);

  const urlListWasher = "http://localhost:3000/api/washer";
  const listWasher = useFetchData(urlListWasher);

  const urlListWashtype = "http://localhost:3000/api/washtype";
  const listWashType = useFetchData(urlListWashtype);

  //filtrar por placas
  const filteredData = listWashes?.data?.data?.filter((item) => {
    const matchesPlacas = item.licensePlate.includes(placasFilter);
    // Obtener el valor seleccionado del Select
    const matchesWashTypes = item.washType.includes(washTypeFilter);

    // El elemento se incluirá en los resultados si cumple ambas condiciones
    return matchesPlacas && matchesWashTypes;
  });

  const thWidth = "18vw";

  const BadgeStatus = (id) => {
    // Estado para manejar el estado del pago
    const [washEstado, setWashEstado] = useState("NO_PAGO");

    // Ref para almacenar el estado inicial y evitar loops
    const isManualChange = useRef(true);

    // Definir los colores de acuerdo al estado
    const badgeStatus: STATUS = {
      NO_PAGO: "red",
      PAGADO: "green",
    };

    // Obtener el color basado en el estado actual
    const statusBadge = badgeStatus[washEstado];

    // Al cargar, verificamos si el estado es "COMPLETED" y lo actualizamos
    useEffect(() => {
      const washItem = filteredData?.find((item) => item.id === id?.id);
      if (washItem && washItem.status === "COMPLETED") {
        setWashEstado("PAGADO");  // Si el estado es "COMPLETED", lo establecemos como "PAGADO"
      }
    }, [id, filteredData]);

    // Manejar los cambios en el estado manualmente
    useEffect(() => {
      if (isManualChange.current) {
        if (washEstado === "PAGADO") {
          finishWash(id?.id);  // Llamamos al servicio solo si el usuario cambia el estado manualmente a "PAGADO"
        }
      }
      // Reiniciar el flag para el próximo cambio
      isManualChange.current = false;
    }, [washEstado, id]);

    // Función para manejar el cambio en el Select
    const handleEstadoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      isManualChange.current = true;  // Marcamos que el cambio es manual
      setWashEstado(e.target.value);  // Actualizamos el estado del pago
    };

    return (
      <Select
        bg={statusBadge}  // Cambia el color de fondo basado en el estado actual
        icon={<MdArrowDropDown />}
        value={washEstado}
        onChange={handleEstadoChange}  // Actualiza el estado del pago
      >
        <option value="NO_PAGO">NO PAGO</option>
        <option value="PAGADO">PAGADO</option>
      </Select>
    );
  };

  //modal logic
  var handleModalClose = () => {
    setCreateWash({
      washerId: "",
      clientName: "",
      vehicleType: "",
      licensePlate: "",
      washType: "",
      rate: "",
      paymentType: "",
    }); // Restablecer el formulario
    setValidation({
      washerId: false,
      clientName: false,
      vehicleType: false,
      licensePlate: false,
      washType: false,
      paymentType: false,
    }); // Restablecer el estado de validación si es necesario
    setEditWash(null); // Resetear editWash en caso de que esté editando
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
                        <BadgeStatus id={item?.id} />
                      </Td>
                      <Td>
                        <Tooltip placement="auto">
                          <Stack align="end">
                            {/* <Button
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
                            </Button> */}
                            <Stack align="end">
                              <MenuEditDelete
                                handleEditClick={handleEditClick}
                                handleDelete={() => handleOpenModalDeleteWash(item.id)}
                                item={item}
                              />

                            </Stack>
                          </Stack>
                        </Tooltip>
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
        <ModalGlobal handleModalClose={handleModalClose} isOpen={isOpen} wash={wash}>
          {
            isDeleteWash
              ? <AlternativeModal
                title="¿Seguro deseas eliminar este lavado?"
                text="Esta acción no se puede deshacer. Si continúas, el lavado se eliminará de forma permanente."
                buttonPrimaryText="Si, eliminar"
                buttonSecondaryText="Cancelar"
                mainFunction={() => handleDeleteWash(idDeleteWash)}
                handleModalClose={handleModalClose}
                isCancelar
                isDelete
              />
              :
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
                listWashType={listWashType}
                selectedWashType={selectedWashType}
                setSelectedWashType={setSelectedWashType}
                editWash={editWash}
                setCreateWash={setCreateWash}
                setValidation={setValidation}

              />
          }

        </ModalGlobal>
      </>
    </DashboardLayout>
  );
};

export default lavados;
