import { useState, type FC } from "react";
import { InfoOutlineIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Heading,
  Icon,
  Text,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import DomainForm from "./components/DomainForm";
import DomainModal from "./components/DomainModal";

const TeachersDomain: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useState<boolean>(false);

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
          <DomainModal isOpen={isOpen} onClose={onClose} />

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
