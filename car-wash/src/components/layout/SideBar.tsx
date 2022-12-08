import {
  Flex,
  ListIcon,
  ListItem,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import logo from "../../../public/logo.svg";
import { navPage } from "../../utilitis/navPages";

type Props = {};

function SideBar({}: Props) {
  const router = useRouter();

  const activeMenu = useMemo(
    () => navPage.find((menu) => menu.link === router.pathname),
    [router.pathname]
  );

  console.log(activeMenu);

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
      align="center"
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
            <Link href={page.link} key={page.id}>
              <ListItem
                w="11.563rem"
                h="2.75rem"
                p="10px"
                bg={activeMenu?.id === page.id ? "hoverSideBard" : ""}
                key={page.id}
                display="flex"
                alignItems="center"
                columnGap="8px"
                cursor="pointer"
                _hover={{
                  background: "hoverSideBard",
                  color: "hoverTextColor",
                }}
              >
                <Image src={page.icon} alt="logo" color="fontColor" />
                <Text fontSize="sm" color="fontColor" fontWeight="semibold">
                  {page.pageName}
                </Text>
              </ListItem>
            </Link>
          );
        })}
      </UnorderedList>
    </Flex>
  );
}

export default SideBar;
