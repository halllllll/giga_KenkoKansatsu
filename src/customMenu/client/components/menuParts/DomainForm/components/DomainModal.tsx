import { useState, type FC, useContext } from "react";
import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  HStack,
  Switch,
  Text,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  ModalContent,
  ModalOverlay,
  Modal,
  VStack,
} from "@chakra-ui/react";
import { type AboutDomain } from "@/Config/MenuResponse";
import { CustomMenuCtx } from "@/customMenu/client/Providers";

type MyProps = {
  isOpen: boolean;
  onClose: () => void;
};

const DomainModal: FC<MyProps> = (props) => {
  const { isOpen, onClose } = props;
  const [isReadyRemoveDomain, setIsReadyRemoveDomain] =
    useState<boolean>(false);
  const c = useContext(CustomMenuCtx);

  const domain = c.domain as AboutDomain;

  return (
    <>
      <Modal
        closeOnOverlayClick={false}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <ModalOverlay />

        <ModalContent p={3}>
          <ModalHeader>現在の教師用ドメイン</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Box>
              {!domain.hasDomain ? (
                <Text justifyContent="center">ドメイン未設定</Text>
              ) : (
                <VStack>
                  <Center>
                    <Text fontSize="3xl" fontWeight="bold">
                      {domain.definedDomain}
                    </Text>
                  </Center>
                  <HStack w="full" justifyContent="space-evenly">
                    <FormControl display="flex" alignItems="center">
                      <FormLabel htmlFor="remove-domain" mb="0">
                        削除する
                      </FormLabel>
                      <Switch
                        id="remove-domain"
                        onChange={(event) => {
                          setIsReadyRemoveDomain(event.target.checked);
                        }}
                      />
                    </FormControl>
                    <Button colorScheme="red" isDisabled={!isReadyRemoveDomain}>
                      削除
                    </Button>
                  </HStack>
                </VStack>
              )}
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DomainModal;
