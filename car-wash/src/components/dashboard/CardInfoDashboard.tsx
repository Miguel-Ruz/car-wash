import { Box, Flex, HStack, Text } from "@chakra-ui/react";
import React, { ReactNode } from "react";

type Props = {
  bgColor: string;
  bgIconColor: string;
  title: string;
  amount: number | string;
  iconCard?: ReactNode;
};

const CardInfoDashboard = ({
  bgColor,
  bgIconColor,
  title,
  amount,
  iconCard,
}: Props) => {
  return (
    <Flex
      direction="column"
      padding="16px 24px"
      bg={bgColor}
      borderRadius="12px"
      w="33%"
      rowGap="16px"
    >
      <HStack>
        <Box
          w="44px"
          h="44px"
          borderRadius="34px"
          bg={bgIconColor}
          p="10px"
          textAlign="center"
        >
          {iconCard}
        </Box>
        <Text>{title}</Text>
      </HStack>
      {/* logica a cambiar: colocar condicionalmente simbolo de peso */}
      <Text fontSize="2xl" fontWeight="semibold">
        {amount?.toString().length > 2
          ? "$" + amount.toLocaleString("es")
          : amount}
      </Text>
    </Flex>
  );
};

export default CardInfoDashboard;
