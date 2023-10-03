import { type FC } from "react";
import { Box, Center, Heading } from "@chakra-ui/react";

const ParentPassword: FC = () => {
  return (
    <Box mx="auto">
      <Box>
        <Center pb={5}>
          <Heading>保護者用パスワード設定画面</Heading>
        </Center>
      </Box>
    </Box>
  );
};

export default ParentPassword;
