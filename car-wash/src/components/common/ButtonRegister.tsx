import React from "react"
import { Box, Button } from "@chakra-ui/react"
import { FiPlus } from "react-icons/fi"

const ButtonRegister = () => {
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
      >
        Registrar nuevo lavador
      </Button>
    </Box>
  )
}

export default ButtonRegister