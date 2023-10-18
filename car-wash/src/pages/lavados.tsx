/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { DashboardLayout } from "../components";
import TopBar from "../components/common/TopBar";
import CardsInfoDashboardContainer from "../components/dashboard/CardsInfoDashboardContainer";
import { Box, Flex, Input, Select, Text } from "@chakra-ui/react";
import ButtonRegister from "../components/common/ButtonRegister";
import useFetchData from "../hooks/useFetchData";

type Props = {};

const lavados = (props: Props) => {
  const url = "http://localhost:3000/api/wash/count";
  const { data } = useFetchData(url);
  return (
    <DashboardLayout>
      <TopBar title="Lavados" />
      <CardsInfoDashboardContainer dashboardCounter={data} />
      <Flex p="32px 24px" justifyContent="space-between">
        <Flex gap="1rem" alignItems="center">
          <Text>Buscar</Text>
          <Input placeholder="Placas" size="md" w="200px" />
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
          <ButtonRegister />
        </Box>
      </Flex>
    </DashboardLayout>
  );
};

export default lavados;
