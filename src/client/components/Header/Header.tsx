import { type FC } from "react";
import {
  AttachmentIcon,
  ChatIcon,
  HamburgerIcon,
  InfoOutlineIcon,
} from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Heading,
  Menu,
  MenuItem,
  MenuButton,
  MenuList,
  Spacer,
  IconButton,
} from "@chakra-ui/react";

type HeaderProps = {
  headerTitle: string;
  spreadsheetLink: string;
};

const Header: FC<HeaderProps> = ({ headerTitle, spreadsheetLink }) => {
  return (
    <Box w="full" bgColor="#C1DBDA">
      <Flex gap="2" alignItems="center" px="10">
        <Spacer />
        <Heading as="h1" size="xl" textAlign="center" p="5">
          {headerTitle}
        </Heading>
        <Spacer />
        <Menu>
          <MenuButton as={IconButton} icon={<HamburgerIcon />} />
          <MenuList>
            <MenuItem
              icon={<AttachmentIcon />}
              as="a"
              href={spreadsheetLink}
              target="_blank"
            >
              SpreadSheetを開く
            </MenuItem>
            <MenuItem icon={<InfoOutlineIcon />}>使い方をみる</MenuItem>
            <MenuItem icon={<ChatIcon />}>【DEV】リリースノート</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Box>
  );
};

export default Header;
