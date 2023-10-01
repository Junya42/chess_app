import { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import SignupForm from "./SignupForm";
import Signin from "../Signin/Signin";

export default function Signup() {
  const OverlayOne = () => (
    <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
  );

  const { isOpen, onOpen } = useDisclosure();
  const [toSignin, setToSignin] = useState<boolean>(false);

  useEffect(() => {
    onOpen();

    return () => {
      onOpen();
    };
  }, []);

  if (toSignin) return <Signin setToSignin={setToSignin} />;

  return (
    <>
      <Modal isCentered isOpen={isOpen} onClose={() => {}}>
        <OverlayOne />
        <ModalContent>
          <ModalHeader display="flex" justifyContent="center">
            <div>Sign Up</div>
          </ModalHeader>
          <ModalBody>
            <SignupForm />
          </ModalBody>
          <ModalFooter
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <div className="px-1">Already a User?</div>
            <button
              className="px-1 hover:text-purple-700"
              onClick={() => {
                setToSignin(true);
              }}
            >
              Sign In
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
