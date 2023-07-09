import React from "react";
import { DashboardLayout } from "../components";

//UI COMPONENTS
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

type Props = {};

const reportes = (props: Props) => {
  return (
    <DashboardLayout>
      <Tabs>
        <TabList p="16px 24px 0 24px">
          <Tab>Reporte diario</Tab>
          <Tab>Reporte mensual</Tab>
        </TabList>

        <TabPanels>
          <TabPanel p="24px 24px">
            <TableContainer
              border="1px solid #E2E8F0"
              borderRadius="12px"
              p="12px"
            >
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>CLIENTE</Th>
                    <Th>VEHICULO</Th>
                    <Th>LAVADO</Th>
                    <Th>PAGO</Th>
                    <Th isNumeric>TOTAL</Th>
                  </Tr>
                </Thead>
                <Tbody fontSize="14px">
                  <Tr>
                    <Td fontWeight="500">Segun Adebayo</Td>
                    <Td fontWeight="500">Taxi</Td>
                    <Td>Abajo y arriba</Td>
                    <Td>Efectivo</Td>
                    <Td isNumeric>$15.000</Td>
                  </Tr>
                  <Tr>
                    <Td fontWeight="500">Segun Adebayo</Td>
                    <Td fontWeight="500">Taxi</Td>
                    <Td>Abajo y arriba</Td>
                    <Td>Efectivo</Td>
                    <Td isNumeric>$15.000</Td>
                  </Tr>
                  <Tr>
                    <Td fontWeight="500">Segun Adebayo</Td>
                    <Td fontWeight="500">Taxi</Td>
                    <Td>Abajo y arriba</Td>
                    <Td>Efectivo</Td>
                    <Td isNumeric>$15.000</Td>
                  </Tr>
                </Tbody>
                <Tfoot bg="#EDF2F7" h="52px">
                  <Tr>
                    <Th></Th>
                    <Th></Th>
                    <Th></Th>
                    <Th
                      textTransform="capitalize"
                      fontSize="14px"
                      fontWeight="700"
                    >
                      Balance total
                    </Th>
                    <Th isNumeric fontSize="14px" fontWeight="700">
                      $135.000
                    </Th>
                  </Tr>
                </Tfoot>
              </Table>
            </TableContainer>
          </TabPanel>
          <TabPanel>
            <TableContainer
              border="1px solid #E2E8F0"
              borderRadius="12px"
              p="12px"
            >
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>SEMANA</Th>
                    <Th>NÚMERO DE LAVADOS</Th>
                    <Th isNumeric>TOTAL</Th>
                  </Tr>
                </Thead>
                <Tbody fontSize="14px">
                  <Tr>
                    <Td fontWeight="500">01/08/2022 - 07/08/2022</Td>
                    <Td fontWeight="500">63</Td>
                    <Td isNumeric>$945.000</Td>
                  </Tr>
                  <Tr>
                    <Td fontWeight="500">01/08/2022 - 07/08/2022</Td>
                    <Td fontWeight="500">63</Td>
                    <Td isNumeric>$945.000</Td>
                  </Tr>
                  <Tr>
                    <Td fontWeight="500">01/08/2022 - 07/08/2022</Td>
                    <Td fontWeight="500">63</Td>
                    <Td isNumeric>$945.000</Td>
                  </Tr>
                </Tbody>
                <Tfoot bg="#EDF2F7" h="52px">
                  <Tr>
                    <Th></Th>
                    <Th
                      isNumeric
                      fontSize="14px"
                      textTransform="capitalize"
                      fontWeight="700"
                    >
                      Balance total
                    </Th>
                    <Th isNumeric fontSize="14px" fontWeight="700">
                      $135.000
                    </Th>
                  </Tr>
                </Tfoot>
              </Table>
            </TableContainer>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </DashboardLayout>
  );
};

export default reportes;
