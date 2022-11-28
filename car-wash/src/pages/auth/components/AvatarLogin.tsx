import React from "react";
import { Avatar, Text, VStack } from "@chakra-ui/react";

type Props = {
  typeUser: string;
  name?: string;
};

function AvatarLogin({ typeUser, name }: Props) {
  return (
    <VStack>
      <Avatar size="2xl" name={name} cursor="pointer" />
      <Text color="#718096">{typeUser}</Text>
    </VStack>
  );
}

export default AvatarLogin;
