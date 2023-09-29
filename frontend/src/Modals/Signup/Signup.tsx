import * as React from 'react';
import { Button } from '@chakra-ui/react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'
  import { Text } from '@chakra-ui/react'
  import { useDisclosure } from '@chakra-ui/react'
import { ArrowForwardIcon } from '@chakra-ui/icons';
import SignupForm from './SignupForm';

    export default function Signup() {
        const OverlayOne = () => (
          <ModalOverlay
            bg='blackAlpha.300'
            backdropFilter='blur(10px)'
          />
        )
      
        const OverlayTwo = () => (
          <ModalOverlay
            bg='none'
            backdropFilter='auto'
            backdropInvert='80%'
            backdropBlur='2px'
          />
        )
      
        const { isOpen, onOpen, onClose } = useDisclosure()
        const [overlay, setOverlay] = React.useState(<OverlayOne />)
      
        return (
          <>
            <Button
              onClick={() => {
                setOverlay(<OverlayOne />)
                onOpen()
              }}
            >
              Signup Modal
            </Button>
            {/*
            <Button
              ml='4'
              onClick={() => {
                setOverlay(<OverlayTwo />)
                onOpen()
              }}
            >
              Use Overlay two
            </Button>
            */}
            <Modal isCentered isOpen={isOpen} onClose={onClose}>
              {overlay}
              <ModalContent>
                <ModalHeader>Sign up</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <SignupForm />
                </ModalBody>
              </ModalContent>
            </Modal>
          </>
        )
      }