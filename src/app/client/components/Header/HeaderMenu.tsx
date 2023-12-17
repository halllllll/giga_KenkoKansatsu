import { type FC } from "react";
import {
  HamburgerIcon,
  AttachmentIcon,
  InfoOutlineIcon,
  TimeIcon,
} from "@chakra-ui/icons";
import {
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";

type HeaderMenuProps = {
  link: string;
  onDrawerOpen: () => void;
};

const HeaderMenu: FC<HeaderMenuProps> = (props) => {
  return (
    <Menu>
      <MenuButton as={IconButton} icon={<HamburgerIcon />} />
      <MenuList>
        <MenuItem
          icon={<AttachmentIcon />}
          as="a"
          href={props.link}
          target="_blank"
        >
          SpreadSheetを開く
        </MenuItem>
        <MenuItem icon={<InfoOutlineIcon />}>【未実装】使い方をみる</MenuItem>
        <MenuItem icon={<TimeIcon />} onClick={props.onDrawerOpen}>
          履歴をみる（β）
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default HeaderMenu;
