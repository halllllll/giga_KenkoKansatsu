import { type FC } from "react";
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
  isOpen: boolean;
  onClose: () => void;
};

const SendingModal: FC<ModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent py="4">
        <ModalHeader>{"hhhhhh"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{"bbbbbbb"}</ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SendingModal;
