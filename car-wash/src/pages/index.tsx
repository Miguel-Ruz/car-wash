import { Box, Heading, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import { DashboardLayout } from "../components";
import logo from "../../public/logoDash.png";
import { DataTableDashboard } from "../components/dashboard";
import TopBar from "../components/common/TopBar";
import CardsInfoDashboardContainer from "../components/dashboard/CardsInfoDashboardContainer";
import { useEffect, useState } from "react";

//hooks
import useFetchData from "../hooks/useFetchData";

const data = [
  {
    bgColor: "#F0FFF4",
    bgIconColor: "#C6F6D5",
    title: "Lavados del día",
    amount: 25,
  },
  {
    bgColor: "#EBF8FF",
    bgIconColor: "#BEE3F8",
    title: "Producido semanal",
    amount: 25,
  },
  {
    bgColor: "#FAF5FF",
    bgIconColor: "#E9D8FD",
    title: "Producido mensual",
    amount: 25,
  },
];

export default function Home() {
  const url = "http://localhost:3000/api/wash/count";
  const { data } = useFetchData(url);

  return (
    <div>
      <DashboardLayout>
        <>
          <TopBar title="Dashboard" />

          <Box p="24px">
            <Flex
              w="100%"
              h="214px"
              borderRadius="12px"
              paddingTop="32px"
              paddingBottom="32px"
              paddingRight="64px"
              paddingLeft="64px"
              bg="bgCardDashboradColor"
              align="center"
              justify="space-between"
            >
              <Flex direction="column" color="mainColor" rowGap="16px">
                <Heading size="xl">Mav Wash</Heading>
                <Text
                  fontSize="lg"
                  color=" rgba(255, 255, 255, 0.8)"
                  fontWeight="semibold"
                >
                  Estas son las estadisticas
                </Text>
              </Flex>

              <Image src={logo} alt="logo de la app" priority />
            </Flex>
          </Box>

          <CardsInfoDashboardContainer dashboardCounter={data} />
          <DataTableDashboard />
        </>
      </DashboardLayout>
    </div>
  );
}
