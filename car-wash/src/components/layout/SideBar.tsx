import { Flex } from "@chakra-ui/react";
import React from "react";

type Props = {};

function SideBar({}: Props) {
  return (
    <Flex
      h="100vh"
      border="1px solid red"
      width="13vw"
      paddingTop="16px"
      paddingBottom="16px"
      paddingRight="24px"
      paddingLeft="24px"
    >
      SideBar
    </Flex>
  );
}

export default SideBar;
