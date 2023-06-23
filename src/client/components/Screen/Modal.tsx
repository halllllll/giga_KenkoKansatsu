import { useState, useEffect, type FC } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";

type ModalProps = {
  // resp: RegisterResponse | undefined;
};

const sendingModal: FC<ModalProps> = ({}) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setIsOpen(false);
      }}
    >
      <ModalOverlay />
      <ModalContent py="4">
        <ModalHeader>{"hhhhhh"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{"bbbbbbb"}</ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default sendingModal;
