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
    as="nav"
      align="center"
      justify="space-between"
      paddingTop="16px"
      paddingBottom="16px"
      paddingRight="24px"
      paddingLeft="24px"
      w="87vw"
      h="4rem"
      borderBottom="1px solid #E2E8F0"
    >
      <Text
        fontSize="xs"
        color="fontNavColor"
        bg="#EDF2F7"
        w="49px"
        h="18px"
        fontWeight="semibold"
        textAlign="center"
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
