import { Flex } from "@chakra-ui/react";
import React from "react";
import CardInfoDashboard from "./CardInfoDashboard";

function CardsInfoDashboardContainer({ dataCards }) {
  return (
    <Flex p="0 24px" columnGap="1.25rem">
      {dataCards?.map((cardInfo) => (
        <CardInfoDashboard
          bgColor={cardInfo.bgColor}
          bgIconColor={cardInfo.bgIconColor}
          title={cardInfo.title}
          amount={cardInfo.amount}
        />
      ))}
    </Flex>
  );
}

export default CardsInfoDashboardContainer;
