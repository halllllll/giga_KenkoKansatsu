import { type FC } from "react";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  CloseButton,
  Link,
  ListItem,
  Spacer,
  UnorderedList,
  Text,
} from "@chakra-ui/react";

type InfoBlockProps = {
  message: string;
  hasUrl: boolean; // no message information is actually evil
  url: string;
  isOpen: boolean;
  onClose: () => void;
};

const dev = true;
const devMsg = `これは開発中です。ぜひあそんで、フィードバックをください。また、一緒につくる人、ドキュメントを書いてくれる人も募集しています。`;
const todo = [
  "期間設定（近日実装。まだ仮なのでうまく動作しません（でもぜひさわってみてね！））",
  "保護者用画面作成",
  "SpreadSheetでのカスタムメニュー作成",
];

const InfoBlock: FC<InfoBlockProps> = ({
  message,
  hasUrl,
  url,
  isOpen,
  onClose,
}) => {
  return hasUrl ? (
    <Box marginY="3" p="5" border="1px" borderStyle="dashed" bgColor="#f1e9d0">
      <p>{message}</p>
      {url ?? <Link href={url}>New Info Here</Link>}
    </Box>
  ) : (
    <>
      <Spacer p="2" />
      {dev
        ? isOpen && (
            <Alert status="warning">
              <CloseButton position="absolute" top="2" onClick={onClose} />
              <AlertIcon />
              <Box>
                <AlertTitle>STATUS - Development: ver 2023-07-20</AlertTitle>
                <AlertDescription>
                  {devMsg}
                  <br />
                  <Text as="b">あそびかた（簡易）</Text>
                  <Text>
                    フォームを埋めて投稿するとSheetにデータが追加されます。また、試しにSpreadSheetのタイトルを変更したり、生徒や設問のシートを変更してからこの画面を再読み込みしてみてください。Sheetからデータを取得しているのがわかると思います
                  </Text>
                  <Box py="2">
                    <Text as="b">予定してるアプデ内容（一部・順不同）</Text>
                    <UnorderedList>
                      {todo.map((v, idx) => {
                        return <ListItem key={idx}>{v}</ListItem>;
                      })}
                    </UnorderedList>
                  </Box>
                </AlertDescription>
              </Box>
            </Alert>
          )
        : ""}
    </>
  );
};

export default InfoBlock;
