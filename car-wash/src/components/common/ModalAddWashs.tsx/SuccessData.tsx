import React from "react";
import {
  Box,
  Button,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
} from "@chakra-ui/react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { Icon } from "@chakra-ui/react";

type Props = {
  handleModalClose: () => void;
  title: string,
  text: string
  buttonPrimaryText: string,
  buttonSecondaryText: string,
  mainFunction: any
  isCancelar: boolean;
  isDelete: boolean
};

const AlternativeModal = ({
  handleModalClose,
  title,
  text,
  buttonPrimaryText,
  buttonSecondaryText,
  mainFunction,
  isCancelar,
  isDelete
}: Props) => {
  return (
    <>
      <ModalHeader display="flex" alignItems="center">
        {!isDelete &&
          <Box mr="3">
            <Icon as={BsFillCheckCircleFill} w={8} h={8} color="#C6F6D5" />
          </Box>
        }

        {title}
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody pb={6}>
        <Box>{text}</Box>
        <ModalFooter pb={0} pr={0}>
          <Button variant="outline" onClick={() => {
            isCancelar && handleModalClose()
          }}>
            {buttonSecondaryText}
          </Button>
          <Button
            colorScheme={isDelete ? "red" : "teal"}
            ml={3}
            onClick={() => {
              // handleModalClose()
              mainFunction()
            }
            }>
            {buttonPrimaryText}
          </Button>
        </ModalFooter>
      </ModalBody>
    </>
  );
};

export default AlternativeModal;
