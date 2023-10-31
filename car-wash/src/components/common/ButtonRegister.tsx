import React from "react";
import { Box, Button, useDisclosure } from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";

type Props = {
  title: string;
  onOpen: () => void;
};

const ButtonRegister = ({ title, onOpen }: Props) => {
  return (
    <Box>
      <Button
        w="208px"
        h="32px"
        leftIcon={<FiPlus />}
        bg="buttonColor"
        color="mainColor"
        fontSize="14px"
        p="18px 12px"
        fontWeight="semibold"
        _hover={{ bg: "#258685" }}
        onClick={onOpen}
      >
        {title}
      </Button>
    </Box>
  );
};

export default ButtonRegister;
