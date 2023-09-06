import { type FC } from "react";
import { Box, Center, Spinner } from "@chakra-ui/react";

const ScreenSpinner: FC = () => {
  return (
    <Box
      position="fixed"
      zIndex="1000"
      left="0"
      top="0"
      w="100vw"
      h="100vh"
      bg="rgba(0, 0, 0, 0.4)"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Center h="full">
        <Spinner
          thickness="10px"
          speed="0.70s"
          emptyColor="gray.200"
          color="teal"
          size="xl"
          boxSize={200}
        />
      </Center>
    </Box>
  );
};

export default ScreenSpinner;
