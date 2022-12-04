import {
  Flex,
  ListIcon,
  ListItem,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import logo from "../../../public/logo.svg";
import { navPage } from "../../utilitis/navPages";

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
      direction="column"
      rowGap="64px"
    >
      <Flex h="3rem" w="11.563rem">
        <Image src={logo} alt="logo de la app" />
      </Flex>
      <UnorderedList
        listStyleType="none"
        rowGap="18px"
        display="flex"
        flexDirection="column"
      >
        {navPage.map((page) => {
          return (
            <ListItem
              key={page.id}
              display="flex"
              alignItems="center"
              columnGap="8px"
            >
              <Image src={page.icon} alt="logo" />
              <Text fontSize="sm" color="fontColor" fontWeight="semibold">
                {page.pageName}
              </Text>
            </ListItem>
          );
        })}
      </UnorderedList>
    </Flex>
  );
}

export default SideBar;
