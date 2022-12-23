import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import { Box } from "@chakra-ui/react";

type Props = {};

const DataTableDashboard = (props: Props) => {
  return (
    <Box p="24px">
      <TableContainer border="1px solid #E2E8F0" borderRadius="12px" p="12px">
        <Table size="md">
          <Thead>
            <Tr>
              <Th>Semana</Th>
              <Th>Número de lavados</Th>
              <Th isNumeric>Total</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>22 / 12 / 2022</Td>
              <Td>63</Td>
              <Td isNumeric>$945.000</Td>
            </Tr>
          
          </Tbody>
          <Tfoot bg="#EDF2F7" >
            <Tr >
              <Th></Th>
              <Th>Balance total</Th>
              <Th isNumeric>$945.000</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default DataTableDashboard;
