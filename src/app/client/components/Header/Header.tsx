import { type FC } from "react";
import { Box, Flex, Heading, Spacer, useDisclosure } from "@chakra-ui/react";
import DrawerRoot from "@/app/client/components/Screen/History/DrawerRoot";
import HeaderMenu from "./HeaderMenu";

type HeaderProps = {
  headerTitle: string;
  spreadsheetLink: string;
};

const Header: FC<HeaderProps> = ({ headerTitle, spreadsheetLink }) => {
  const {
    isOpen: isDrawerOpen,
    onOpen: onDrowerOpen,
    onClose: onDrowerClose,
  } = useDisclosure();

  return (
    <Box w="full" bgColor="#C1DBDA">
      {isDrawerOpen && (
        <DrawerRoot isOpen={isDrawerOpen} onClose={onDrowerClose} />
      )}
      <Box maxW={"3xl"} mx={"auto"}>
        <Flex
          minW={"xl"}
          gap="2"
          alignItems="center"
          px="10"
          justify={"center"}
        >
          <Spacer />
          <Heading as="h1" size="xl" textAlign="center" p="5">
            {headerTitle}
          </Heading>
          <Spacer />
          {spreadsheetLink && (
            <HeaderMenu link={spreadsheetLink} onDrawerOpen={onDrowerOpen} />
          )}
        </Flex>
      </Box>
    </Box>
  );
};

export default Header;
