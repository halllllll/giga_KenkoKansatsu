import { type FC } from "react";
import { Box } from "@chakra-ui/react";
import { FaSchool } from "react-icons/fa";
import { LuCog } from "react-icons/lu";
import { MdOutlineAutoGraph } from "react-icons/md";
import { PiSealWarningFill } from "react-icons/pi";
import { RiParentLine } from "react-icons/ri";
import { type MenuItem, MenuItems } from "./menuParts/MenuItems";

export const SideMenu: FC = () => {
  const sideMenuItems: MenuItem[] = [
    {
      link: `init`,
      icon: PiSealWarningFill,
      name: "初期化",
    },
    {
      link: `parent`,
      icon: RiParentLine,
      name: "【保護者画面用】ひみつパスワード設定",
    },
    {
      link: `teachers_domain`,
      icon: FaSchool,
      name: "【教師画面用】ドメイン設定",
    },
    {
      link: `data`,
      icon: MdOutlineAutoGraph,
      name: "統計",
    },
    {
      link: `info`,
      icon: LuCog,
      name: "情報",
    },
  ];

  return (
    <Box w="full" m="20px">
      <MenuItems items={sideMenuItems} />
    </Box>
  );
};
