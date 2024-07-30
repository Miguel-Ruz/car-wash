import { Box, Heading, Flex, Text } from "@chakra-ui/react";
import { DashboardLayout } from "../components";
import TopBar from "../components/common/TopBar";
import CardsInfoDashboardContainer from "../components/dashboard/CardsInfoDashboardContainer";
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
  Spinner
} from "@chakra-ui/react";

//hooks
import useFetchData from "../hooks/useFetchData";
import { formatCurrency } from "../utilitis/formatter";

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
  //fetch
  const urlDayli = "http://localhost:3000/api/reports?format=daily";
  const { data: dailyData, loading: loadingDayli } = useFetchData(urlDayli);

  const urlMonthly = "http://localhost:3000/api/reports/monthly";
  const { data: monthlyData, loading: loadingMonthly } =
    useFetchData(urlMonthly);
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
                <Heading size="xl">Wash Admin</Heading>
                <Text
                  fontSize="lg"
                  color=" rgba(255, 255, 255, 0.8)"
                  fontWeight="semibold"
                >
                  Estas son las estadisticas
                </Text>
              </Flex>

              {/* <Image src={logo} alt="logo de la app" priority /> */}
            </Flex>
          </Box>

          <CardsInfoDashboardContainer dashboardCounter={data} />

          {/* reportes */}
          <div>
            <Tabs>
              <TabList p="16px 24px 0 24px">
                <Tab>Reporte diario</Tab>
                <Tab>Reporte semanal</Tab>
              </TabList>

              <TabPanels>
                <TabPanel p="24px 24px" style={{ textAlign: 'center' }}>
                  {
                    loadingDayli ?
                      <Spinner
                        thickness='4px'
                        speed='0.65s'
                        emptyColor='gray.200'
                        color='blue.500'
                        size='xl'

                      />
                      :
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
                            {dailyData &&
                              dailyData?.data.map((item: any) => (
                                <Tr key={item.createdAt}>
                                  <Td fontWeight="500">{item.clientName}</Td>
                                  <Td fontWeight="500">{item.vehicleType}</Td>
                                  <Td>{item.washType}</Td>
                                  <Td>{item.paymentType}</Td>
                                  <Td isNumeric>{formatCurrency(item.rate)}</Td>
                                </Tr>
                              ))}
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
                                {formatCurrency(dailyData?.totalRate)}
                              </Th>
                            </Tr>
                          </Tfoot>
                        </Table>
                      </TableContainer>
                  }
                </TabPanel>
                <TabPanel>
                  {
                    loadingMonthly ?
                      <Spinner
                        thickness='4px'
                        speed='0.65s'
                        emptyColor='gray.200'
                        color='blue.500'
                        size='xl'

                      />
                      :
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
                            {monthlyData &&
                              monthlyData?.data?.map((item: any, index) => (
                                <Tr key={index}>
                                  <Td fontWeight="500">{item.week}</Td>
                                  <Td fontWeight="500">{item.washerCount}</Td>
                                  <Td isNumeric>{formatCurrency(item.total)}</Td>
                                </Tr>
                              ))}
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
                                {formatCurrency(monthlyData?.totalBalance)}
                              </Th>
                            </Tr>
                          </Tfoot>
                        </Table>
                      </TableContainer>
                  }
                </TabPanel>
              </TabPanels>
            </Tabs>
          </div>
        </>
      </DashboardLayout>
    </div>
  );
}
