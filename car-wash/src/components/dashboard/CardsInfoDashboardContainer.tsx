import { Flex } from "@chakra-ui/react";
import React from "react";
import CardInfoDashboard from "./CardInfoDashboard";
import { MdCalendarViewDay } from "react-icons/md";
import { MdCalendarViewWeek } from "react-icons/md";
import { MdCalendarViewMonth } from "react-icons/md";

interface DashboardCounter {
  dashboardCounter: {
    dailyCount: number;
    totalEarningsMonth: string;
    totalEarningsWeekly: string;
  };
}

function CardsInfoDashboardContainer({ dashboardCounter }: DashboardCounter) {
  return (
    <Flex p="0 24px" columnGap="1.25rem" m="2rem 0">
      <CardInfoDashboard
        bgColor="#F0FFF4"
        bgIconColor="#C6F6D5"
        title="Lavados del día"
        amount={dashboardCounter?.dailyCount}
        iconCard={
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <MdCalendarViewDay style={{ fontSize: "59px" }} />
          </div>
        }
      />

      <CardInfoDashboard
        bgColor="#EBF8FF"
        bgIconColor="#BEE3F8"
        title="Producido semanal"
        amount={dashboardCounter?.totalEarningsWeekly}
        iconCard={
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <MdCalendarViewWeek style={{ fontSize: "59px" }} />
          </div>
        }
      />
      <CardInfoDashboard
        bgColor="#FAF5FF"
        bgIconColor="#E9D8FD"
        title="Producido mensual"
        amount={dashboardCounter?.totalEarningsMonth}
        iconCard={
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <MdCalendarViewMonth style={{ fontSize: "59px" }} />
          </div>
        }
      />
    </Flex>
  );
}

export default CardsInfoDashboardContainer;
