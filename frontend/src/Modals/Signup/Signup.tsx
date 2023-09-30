import { useState, useEffect } from "react";
import { Button } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import SignupForm from "./SignupForm";

export default function Signup() {
  const OverlayOne = () => (
    <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
  );

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    onOpen();

    return () => {
      onOpen();
    };
  }, []);

  return (
    <>
      <Modal isCentered isOpen={isOpen} onClose={() => {}}>
        <OverlayOne />
        <ModalContent>
          <ModalHeader>Sign up</ModalHeader>
          <ModalBody>
            <SignupForm />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
