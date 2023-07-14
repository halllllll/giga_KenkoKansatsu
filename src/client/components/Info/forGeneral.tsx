import { type FC } from "react";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Text,
  Spacer,
} from "@chakra-ui/react";

const dev = true;
const devMsg = `これは「保護者用」の画面で、まだ開発中です。Googleの教育用アカウントでログインしてください。`;

const InfoBlockForGeneral: FC = () => {
  return (
    <>
      <Spacer p="2" />
      {dev ? (
        <Alert status="warning">
          <AlertIcon />
          <Box>
            <AlertTitle>UNDER CONTRUCTION</AlertTitle>
            <AlertDescription>
              {devMsg}
              <br />
              <Text as="b">あそびかた（簡易）</Text>
              <Text>
                フォームを埋めて投稿するとSheetにデータが追加されます。また、試しにSpreadSheetのタイトルを変更したり、生徒や設問のシートを変更してからこの画面を再読み込みしてみてください。Sheetからデータを取得しているのがわかると思います
              </Text>
            </AlertDescription>
          </Box>
        </Alert>
      ) : (
        ""
      )}
    </>
  );
};

export default InfoBlockForGeneral;
