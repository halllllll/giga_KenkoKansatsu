import { type FC } from 'react';
import { Box, Link, Spacer } from '@chakra-ui/react';

type InfoBlockProps = {
  message: string;
  hasUrl: boolean; // no message information is actually evil
  url: string;
};
const InfoBlock: FC<InfoBlockProps> = ({ message, hasUrl, url }) => {
  return hasUrl ? (
    <Box marginY="3" p="5" border="1px" borderStyle="dashed" bgColor="#f1e9d0">
      <p>{message}</p>
      {url ?? <Link href={url}>New Info Here</Link>}
    </Box>
  ) : (
    <>
      <Spacer p="2" />
    </>
  );
};

export default InfoBlock;
