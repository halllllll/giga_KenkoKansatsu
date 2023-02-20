import { type FC } from "react";
import { Heading } from "@chakra-ui/react";

type HeaderProps = {
  headerTitle: string;
};

const Header: FC<HeaderProps> = ({ headerTitle }) => {
  return (
    <Heading as="h1" size="xl" textAlign="center" bgColor="#C1DBDA" p="5">
      {headerTitle}
    </Heading>
  );
};

export default Header;
