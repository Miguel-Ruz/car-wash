import React from "react";
import { Box, Button, useDisclosure } from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";
import ModalAddWasher from "./ModalAddWasher";

type Props = {
  title: string;
};

const ButtonRegister = ({ title }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
      <ModalAddWasher isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default ButtonRegister;
