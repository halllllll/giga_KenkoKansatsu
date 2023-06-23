import { type FC } from "react";
import {
  Box,
  Center,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Spinner,
} from "@chakra-ui/react";

type SpinnerProps = {
  onClose: () => void;
  isOpen: boolean;
};

const ScreenSpinner: FC<SpinnerProps> = ({ onClose, isOpen }) => {
  return (
    <Box>
      <Modal onClose={onClose} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <Center>
              <Spinner />
            </Center>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ScreenSpinner;
