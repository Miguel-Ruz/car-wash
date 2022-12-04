import {
  Avatar,
  Flex,
  Heading,
  HStack,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { AiOutlineDown } from "react-icons/ai";

type Props = {};

const NavBar = (props: Props) => {
  return (
    <Flex
      align="center"
      justify="space-between"
      paddingTop="16px"
      paddingBottom="16px"
      paddingRight="24px"
      paddingLeft="24px"
      w="87vw"
      borderBottom="1px solid #E2E8F0"
      marginLeft="14.563rem"
    >
      <Text
        fontSize="xs"
        color="navTitleColor"
        bg="#EDF2F7"
        w="49px"
      fontWeight="semibold"
        p="4px"
      >
        ADMIN
      </Text>

      <HStack w="64px" h="32px">
        <Avatar size="sm" />
        <Menu>
          <MenuButton>
            <AiOutlineDown />
          </MenuButton>
        </Menu>
      </HStack>
    </Flex>
  );
};

export default NavBar;
