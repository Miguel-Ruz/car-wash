import { Box, Container, Heading, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import { DashboardLayout } from "../components";
import logo from "../../public/logoDash.png";
import { CardInfoDashboard } from "../components/dashboard";

export default function Home() {
  return (
    <div>
      <DashboardLayout>
        <div>
          <Box
            as="header"
            paddingTop="16px"
            paddingBottom="16px"
            paddingRight="24px"
            paddingLeft="24px"
            borderBottom="1px solid #E2E8F0"
          >
            <Heading size="md" color="fontColor" fontWeight="semibold">
              Dashboard
            </Heading>
          </Box>

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
                <Text fontSize="lg" color=" rgba(255, 255, 255, 0.8)" fontWeight="semibold">
                  Estas son las estadisticas
                </Text>
              </Flex>

              <Image src={logo} alt="logo de la app" />
            </Flex>
          </Box>

          <Flex p="0 24px" columnGap="1.25rem">
            <CardInfoDashboard
              bgColor="#F0FFF4"
              bgIconColor="#C6F6D5"
              title="Lavados del día"
              amount={25}
            />
            <CardInfoDashboard
              bgColor="#EBF8FF"
              bgIconColor="#BEE3F8"
              title="Lavados del día"
              amount={1000000}
            />
            <CardInfoDashboard
              bgColor="#FAF5FF"
              bgIconColor="#E9D8FD"
              title="Lavados del día"
              amount={10000000}
            />
          </Flex>
        </div>
      </DashboardLayout>
    </div>
  );
}
