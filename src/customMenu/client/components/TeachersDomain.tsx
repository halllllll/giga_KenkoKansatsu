import { type FC, useContext, useState } from "react";
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
import { type AboutDomain } from "@/Config/MenuResponse";
import { CustomMenuCtx } from "../Providers";
import DomainForm from "./Form/DomainForm";

const TeachersDomain: FC = () => {
  const [show, setShow] = useState(false);
  const handleViewSwitch = () => {
    setShow(!show);
  };
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
            設定済みドメイン
          </Heading>
          {!domain.hasDomain ? (
            <>
              <Text>ドメイン未設定</Text>
            </>
          ) : (
            <>
              <Text as="span">
                確認および削除。設定できるのは1ドメインです。
              </Text>
              <HStack>
                <Box fontSize="md">
                  {show ? domain.definedDomain : "******"}
                </Box>
                <Button
                  as={motion.div}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleViewSwitch}
                >
                  {show ? <ViewOffIcon /> : <ViewIcon />}
                </Button>
              </HStack>
            </>
          )}
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
