import React from "react";
import { DashboardLayout } from "../components";
import TopBar from "../components/common/TopBar";
import CardsInfoDashboardContainer from "../components/dashboard/CardsInfoDashboardContainer";
import { Flex, Input, Select, Text } from "@chakra-ui/react";

type Props = {};

const lavados = (props: Props) => {
  return (
    <DashboardLayout>
      <TopBar title="Lavados" />
      <CardsInfoDashboardContainer />
      <Flex p="0 24px">
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
      </Flex>
    </DashboardLayout>
  );
};

export default lavados;
