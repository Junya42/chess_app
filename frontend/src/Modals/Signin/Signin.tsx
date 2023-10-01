import { useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import SigninForm from "./SigninForm";

interface Props {
	setToSignin: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Signin({setToSignin}: Props) {
  const OverlayOne = () => (
    <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
  );

  const { isOpen, onOpen } = useDisclosure();

  useEffect(() => {
    onOpen();

    return () => {
      onOpen();
    };
  },);

  return (
    <>
      <Modal isCentered isOpen={isOpen} onClose={() => {}}>
        <OverlayOne />
        <ModalContent>
          <ModalHeader display='flex' justifyContent='center'>
            <div>Sign In</div>
          </ModalHeader>
          <ModalBody>
            <SigninForm />
          </ModalBody>
		  <ModalFooter display='flex' justifyContent='center' alignItems='center'>
            <div className='px-1'>Not a User?</div>
            <button className='px-1 hover:text-purple-700' onClick={() => {setToSignin(false)}}>Sign Up</button>
        </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}