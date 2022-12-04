import { Flex } from "@chakra-ui/react";
import React from "react";
import NavBar from "./NavBar";
import SideBar from "./SideBar";

type Props = {
  children: JSX.Element;
};

const DashboardLayout = ({ children }: Props) => {
  return (
    <Flex>
      <SideBar />
      <Flex direction="column">
        <NavBar />
        {children}
      </Flex>
    </Flex>
  );
};

export default DashboardLayout;
