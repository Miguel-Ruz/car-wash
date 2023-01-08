import React, { useRef, useState } from "react";
import { Avatar, Text, VStack } from "@chakra-ui/react";

type Props = {
  typeUser: string;
  name?: string;
  // handleCLick?: React.MouseEventHandler<HTMLSpanElement>;
  handleCLick?: (value: string | undefined) => void;
  opacityCard?: string;
};

function AvatarLogin({ typeUser, name, handleCLick, opacityCard }: Props) {
  return (
    <VStack opacity={opacityCard === name ? "1" : "0.3"}>
      <Avatar
        size="2xl"
        name={name}
        cursor="pointer"
        onClick={() => handleCLick(name)}
      />
      <Text color="#718096">{typeUser}</Text>
    </VStack>
  );
}

export default AvatarLogin;
