import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import Image from "next/image";
import logo from "../../../../public/logo.svg";

const NavbarLogin = () => {
  return (
    <Box as="header">
      <Flex
        as="nav"
        backgroundColor="primaryColor"
        height="5rem"
        align="center"
        padding="8"
      >
        <Image src={logo} alt="logo de la app" />
      </Flex>
    </Box>
  );
};

export default NavbarLogin;
