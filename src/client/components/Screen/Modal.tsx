import { type FC } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";

export type ModalMessage = null | {
  headerText: string;
  bodyText: string;
};

type ModalProps = {
  // resp: RegisterResponse | undefined;
  isOpen: boolean;
  onClose: () => void;
  message: ModalMessage;
};

const SendingModal: FC<ModalProps> = ({ isOpen, onClose, message }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent py="4">
        <ModalHeader>{message?.headerText}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{message?.bodyText}</ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SendingModal;
