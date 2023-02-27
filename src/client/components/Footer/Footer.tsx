import { type FC } from "react";

import { Box, Center } from "@chakra-ui/react";

type FooterProps = {
  footerTitle: string;
};

const Footer: FC<FooterProps> = ({ footerTitle }) => {
  return (
    <Box w="full" h="100px" mt="20vh" bgColor="beige">
      <Center h="100%">{footerTitle}</Center>
    </Box>
  );
};

export default Footer;
