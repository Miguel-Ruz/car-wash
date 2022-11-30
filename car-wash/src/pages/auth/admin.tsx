import { Button, Flex, Heading, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import { AvatarLogin, LoginCard, NavbarLogin } from "./components";

type Props = {};

const Admin = (props: Props) => {
  const [activeButton, setActiveButton] = useState<boolean>(false);
  const [opacityCard, setOpacityCard] = useState<string>("0.5");

  const handleClickUser = (e: React.MouseEvent<HTMLDivElement>) => {
    setActiveButton(true);
    console.log(e);
  };

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
          <Heading as="h2" size="md" noOfLines={1} color="fontColor">
            Ingresa tu contraseña
          </Heading>

          <Flex justify="center" w="288px" h="168px">
            <AvatarLogin
              typeUser="Admin"
              name="admin"
              handleCLick={handleClickUser}
            />
          </Flex>
          <Input type="password" placeholder="Ingresa tu contraseña" />
          <Button disabled={!activeButton} color="#FFF" bg="buttonColor">
            Continuar
          </Button>
        </LoginCard>
      </Flex>
    </>
  );
};

export default Admin;
