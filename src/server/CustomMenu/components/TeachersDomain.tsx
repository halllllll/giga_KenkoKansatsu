import { type FC, useState } from "react";
import { InfoOutlineIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Heading,
  Box,
  Center,
  Icon,
  Text,
  Tooltip,
  Button,
  HStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import FormRoot from "./Form/FormRoot";

const TeachersDomain: FC = () => {
  const [show, setShow] = useState(false);
  const handleViewSwitch = () => {
    setShow(!show);
  };

  return (
    <Box mx="auto">
      <Box>
        <Center pb={5}>
          <Heading>教師用画面ドメイン設定</Heading>
        </Center>
        <Box alignContent="center" pb="5">
          <Heading as="h2" size="lg" my={2}>
            設定済みドメイン
          </Heading>
          <Text as="span">確認および削除。設定できるのは1ドメインです。</Text>
          <HStack>
            <Box w="sm" fontSize="md">
              {show ? "nya-n" : "******"}
            </Box>
            <Button
              as={motion.div}
              whileTap={{ scale: 0.9 }}
              onClick={handleViewSwitch}
            >
              {show ? <ViewOffIcon /> : <ViewIcon />}
            </Button>
          </HStack>
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
      <FormRoot />
    </Box>
  );
};

export default TeachersDomain;
