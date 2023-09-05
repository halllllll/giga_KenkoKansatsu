import { type FC } from "react";
import { Flex, Heading, VStack } from "@chakra-ui/react";

type headerProps = {
  title?: string;
};

const Header: FC<headerProps> = (props) => {
  const title = props.title ?? "Hello!";

  return (
    <VStack>
      <Flex
        w="100%" // 100vwだと一定の幅以下で文頭が左端にめり込んだことがあった
        h="5vh"
        as="header"
        position="sticky"
        pos="relative"
        align="center"
        justify="center"
        bg="blackAlpha.100"
      >
        <Heading as="h1" size="xl" my={4}>
          {title}
        </Heading>
      </Flex>
    </VStack>
  );
};

export default Header;
