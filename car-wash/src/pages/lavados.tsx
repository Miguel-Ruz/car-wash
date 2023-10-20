/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
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
import ModalAddWash from "../components/common/ModalAddWash";

type Props = {};
type STATUS = {
  WAITING: string;
  IN_PROGRESS: string;
  COMPLETED: string;
};

const lavados = (props: Props) => {
  const [placasFilter, setPlacasFilter] = useState("");
  // const [tipoLavado, setTipoLavado] = useState("");
  //open modal
  const { isOpen, onOpen, onClose } = useDisclosure();

  //wash count
  const url = "http://localhost:3000/api/wash/count";
  const { data } = useFetchData(url);

  const urlListWashes = "http://localhost:3000/api/wash";
  const listWashes = useFetchData(urlListWashes);

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
        <ModalAddWash />
      </ModalGlobal>
    </DashboardLayout>
  );
};

export default lavados;
