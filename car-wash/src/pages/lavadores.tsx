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
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FiCalendar, FiPlus, FiSearch } from "react-icons/fi";
import { DashboardLayout } from "../components";
import TopBar from "../components/common/TopBar";
import ButtonRegister from "../components/common/ButtonRegister";
import useFetchData from "../hooks/useFetchData";

type Props = {};

interface Washer {
  id: string;
  name: string;
  documentId: string;
  washes: any[];
  status: boolean;
}

const lavadores = (props: Props) => {
  const [nameFilter, setNameFilter] = useState("");
  const [documentFilter, setDocumentFilter] = useState("");

  const thWidth = "18vw";

  //fetch
  const url = "http://localhost:3000/api/washer";
  const { data } = useFetchData(url);

  //filtro
  const filteredData =
    data &&
    data?.filter((item) => {
      // Filtrar por nombre
      const nameMatches = item.name
        .toLowerCase()
        .includes(nameFilter.toLowerCase());

      // Filtrar por documento
      const documentMatches = item.documentId.includes(documentFilter);

      // Combinar ambas condiciones (AND lógico)
      return nameMatches && documentMatches;
    });
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
            <ButtonRegister title="Registrar nuevo lavador" />
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
                  <Th />
                </Tr>
              </Thead>
              <Tbody>
                {filteredData?.map((washer: Washer) => {
                  return (
                    <Tr key={washer.id}>
                      <Td>{washer?.name}</Td>
                      <Td isNumeric>{washer?.documentId}</Td>
                      <Td isNumeric>{washer?.washes.length}</Td>
                      <Td isNumeric>$---</Td>
                      <Td>
                        <Tooltip hasArrow label="Cerrar día" placement="auto">
                          <Stack align="end">
                            <FiCalendar cursor="pointer" color="#319795" />{" "}
                            {/* ALINEAR A LA DERECHA ESTE BENDITO ICONITO. ME HIZO BOTAR EL CHUPO */}
                          </Stack>
                        </Tooltip>
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </>
    </DashboardLayout>
  );
};

export default lavadores;
