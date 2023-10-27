import { useContext, type FC } from "react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Box, HStack, Link, Text } from "@chakra-ui/react";
import { CustomMenuCtx } from "@/customMenu/client/App";

const Info: FC = () => {
  const c = useContext(CustomMenuCtx);
  if (c === null) {
    console.warn("context...");
    console.warn(c);
    throw Error("null context");
  }

  return (
    <>
      <Box>info</Box>
      <Text>{"注：画面デザインは開発中のものです。"}</Text>

      <Box py={2}>
        <Text as="b">{"フォームのURL（beta)"}</Text>

        <HStack>
          <Text>{"URL: "}</Text>
          <Link href={import.meta.env.VITE_TEMP_REAL_URL} isExternal>
            {"> HERE <"} <ExternalLinkIcon mx="2px" />
          </Link>
        </HStack>
      </Box>
    </>
  );
};

export default Info;
