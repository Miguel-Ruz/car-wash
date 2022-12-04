import { Flex } from "@chakra-ui/react";
import React from "react";

type Props = {};

function SideBar({}: Props) {
  return (
    <Flex
      as="aside"
      h="100vh"
      width="13vw"
      paddingTop="16px"
      paddingBottom="16px"
      paddingRight="24px"
      paddingLeft="24px"
      bg="primaryColor"
      borderRight="1px solid #E2E8F0"
    >
        
    </Flex>
  );
}

export default SideBar;
