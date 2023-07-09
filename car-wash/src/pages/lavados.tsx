import React from "react";
import { DashboardLayout } from "../components";
import TopBar from "../components/common/TopBar";
import CardsInfoDashboardContainer from "../components/dashboard/CardsInfoDashboardContainer";

type Props = {};

const lavados = (props: Props) => {
  return (
    <DashboardLayout>
      <TopBar title="Lavados" />
      <CardsInfoDashboardContainer />
    </DashboardLayout>
  );
};

export default lavados;
