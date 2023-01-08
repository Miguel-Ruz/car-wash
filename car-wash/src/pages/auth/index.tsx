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

const Auth = () => {
  const [activeButton, setActiveButton] = useState<boolean>(false);
  const [opacityCard, setOpacityCard] = useState<string>("");

  const users = [
    { id: 1, tipo: "Admin" },
    { id: 2, tipo: "Regular" },
  ];

  const handleClickUser = (name: string) => {
    setActiveButton(true);
    setOpacityCard(name);
  };
  // const handleClickUser = (e: React.MouseEvent<HTMLDivElement>) => {
  //   setActiveButton(true);
  //   // setOpacityCard("1");
  // };

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
            ¿Qué rol tienes?
          </Heading>

          <Flex justify="space-between" w="288px" h="168px">
            {users.map((user) => {
              return (
                <AvatarLogin
                  key={user.id}
                  typeUser={user.tipo}
                  name={user.tipo}
                  handleCLick={handleClickUser}
                  opacityCard={opacityCard}
                />
              );
            })}
          </Flex>
          <Button disabled={!activeButton} color="#FFF" bg="buttonColor">
            Continuar
          </Button>
        </LoginCard>
      </Flex>
    </>
  );
};

export default Auth;
