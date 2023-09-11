import { type FC, useContext, useState } from "react";
import { InfoOutlineIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Switch,
  HStack,
  VStack,
  Text,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { type AboutDomain } from "@/Config/MenuResponse";
import { CustomMenuCtx } from "../Providers";
import DomainForm from "./Form/DomainForm";

const TeachersDomain: FC = () => {
  // TODO: non needed

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isReadyRemoveDomain, setIsReadyRemoveDomain] =
    useState<boolean>(false);

  const c = useContext(CustomMenuCtx);

  const domain = c.domain as AboutDomain;

  return (
    <Box mx="auto">
      <Box>
        <Center pb={5}>
          <Heading>教師用画面ドメイン設定</Heading>
        </Center>
        <Box alignContent="center" pb="5">
          <Heading as="h2" size="lg" my={2}>
            設定済み教師用ドメイン
          </Heading>
          <Text as="span">確認と削除。設定できるのは1ドメインです</Text>
          <Center my="5">
            <Button onClick={onOpen}>確認</Button>
          </Center>
          <Modal
            closeOnOverlayClick={false}
            onClose={onClose}
            isOpen={isOpen}
            isCentered
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>現在の教師用ドメイン</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Box>
                  {!domain.hasDomain ? (
                    <Text justifyContent="center">ドメイン未設定</Text>
                  ) : (
                    <>
                      <VStack spacing="8">
                        <Text fontSize="3xl" fontWeight="bold">
                          {domain.definedDomain}
                        </Text>
                        <HStack>
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
                          <Button
                            colorScheme="red"
                            isDisabled={!isReadyRemoveDomain}
                          >
                            削除
                          </Button>
                        </HStack>
                      </VStack>
                    </>
                  )}
                </Box>
              </ModalBody>
            </ModalContent>
          </Modal>
          <Heading as="h2" size="lg" my={2}>
            新規設定
          </Heading>
          <Text as="span" pr="3">
            教師用で使用するGoogleアカウントのドメインを設定してください。
          </Text>
          <Icon>
            <Tooltip
              hasArrow
              label="ここで設定したドメイン（「@」以降）のGoogleアカウントでアクセスした場合は先生用の設定が、それ以外の場合は保護者用の設定がそれぞれフォームに反映されます。"
              placement="top"
              aria-label="info"
              p="3"
            >
              <InfoOutlineIcon />
            </Tooltip>
          </Icon>
        </Box>
      </Box>
      <DomainForm />
    </Box>
  );
};

export default TeachersDomain;
