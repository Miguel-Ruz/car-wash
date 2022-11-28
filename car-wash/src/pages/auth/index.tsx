import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  ResponsiveValue,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { AvatarLogin, LoginCard, NavbarLogin } from "./components";

const index = () => {
  const [activeButton, setActiveButton] = useState<boolean>(false);

  return (
    <>
      <NavbarLogin />

      <Flex
        direction="column"
        align="center"
        padding="8rem"
        height="90vh"
        backgroundColor="primaryColor"
      >
        <LoginCard>
          <Heading as="h2" size="md" noOfLines={1}>
            ¿Qué rol tienes?
          </Heading>

          <Flex justify="space-between" w="288px" h="168px">
            <AvatarLogin typeUser="Admin" name="admin" />
            <AvatarLogin typeUser="Regular" />
          </Flex>
          <Button disabled={!activeButton} color="#FFF" bg="buttonColor">
            Continuar
          </Button>
        </LoginCard>
      </Flex>
    </>
  );
};

export default index;
