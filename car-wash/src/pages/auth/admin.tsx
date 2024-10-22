import React, { useState } from "react";
import { Button, Flex, Heading, Input } from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import { AvatarLogin, LoginCard, NavbarLogin } from "./components";

type Props = {};

const Admin = (props: Props) => {
  const [activeButton, setActiveButton] = useState<boolean>(false);
  const [opacityCard, setOpacityCard] = useState<string>("0.5");
  const [password, setPassword] = useState<string>("");

  const handleClickUser = (e: React.MouseEvent<HTMLDivElement>) => {
    setActiveButton(true);
  };

  const login = () => {
    signIn("credentials", {
      callbackUrl: "/",
      user: "juanchperez",
      password: password,
    }).then((res) => console.log(res, "res"));
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
          <Input
            type="password"
            placeholder="Ingresa tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            disabled={!activeButton}
            color="#FFF"
            bg="buttonColor"
            onClick={() => login()}
          >
            Continuar
          </Button>
        </LoginCard>
      </Flex>
    </>
  );
};

export default Admin;
