import { Flex } from "@chakra-ui/react";
import React from "react";
import CardInfoDashboard from "./CardInfoDashboard";
import { MdCalendarViewDay } from "react-icons/md";

interface CardData {
  bgColor: string;
  bgIconColor: string;
  title: string;
  amount: number;
}

const dataMock: CardData[] = [
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
function CardsInfoDashboardContainer({
  dataCards = dataMock,
}: {
  dataCards?: CardData[];
}) {
  return (
    <Flex p="0 24px" columnGap="1.25rem" m="2rem 0">
      <CardInfoDashboard
        bgColor="#F0FFF4"
        bgIconColor="#C6F6D5"
        title="Lavados del día"
        amount={25}
        iconCard={<MdCalendarViewDay />}
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
  );
}

export default CardsInfoDashboardContainer;
