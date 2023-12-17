import { type CSSProperties, type FC } from "react";
import { Box, HStack, Icon, Text } from "@chakra-ui/react";
import { RiArrowDownCircleLine } from "react-icons/ri";

// 場所 決め打ち
const css: CSSProperties = {
  position: "fixed",
  zIndex: "var(--toast-z-index, 5500)",
  // pointerEvents: "none",
  // display: "flex",
  margin: "-30px auto",
  top: "env(safe-area-inset-top, 0px)",

  // right: "env(safe-area-inset-right, 0px)",
  // left: "env(safe-area-inset-left, 0px)",
  left: "50%",
  transform: "translateX(-50%)",
};

const HavingListToast: FC = () => {
  return (
    <Box>
      <Box w={"max-content"} p={20} m={15} style={css}>
        <Box
          rounded={"md"}
          p={3}
          bg={"whiteAlpha.800"}
          border={"1px"}
          borderColor={"blackAlpha.400"}
        >
          <HStack justifyContent={"center"} alignItems={"center"}>
            <Text as={"b"} color={"red.600"}>
              {"未送信のデータがあります。"}
            </Text>
            <Icon
              onClick={() => {
                // なぜかiPadのsafariだとdocument.body.clientHightが底をつきぬけた時点の底の座標がてっぺんになってしまう
                window.scrollTo({
                  top: document.body.clientHeight - window.innerHeight,
                  behavior: "smooth",
                });
              }}
              cursor="pointer"
              as={RiArrowDownCircleLine}
              bgColor="gray.100"
              color="gray.500"
              w={8}
              h={8}
              rounded="full"
              _hover={{
                bgColor: "gray.200",
              }}
            />
          </HStack>
        </Box>
      </Box>
    </Box>
  );
};

export { HavingListToast };
