import { type FC } from "react";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
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
};

const dev = true;
const devMsg = `これは開発中です。ぜひあそんで、フィードバックをください。また、一緒につくる人、ドキュメントを書いてくれる人も募集しています。`;
const todo = [
  "仮データをもうしこしまともなものにする",
  "送信直後の挙動をちゃんとさせる（今は適当にオーバーレイして動作を止めてるだけ）",
  "「反映予定のアカウント」欄のデザインとフォームのデザインをちゃんとする",
  "仕様的に、「Googleアカウントにログインした状態での使用」に限定する気でいるので、そうすれば「投稿した人がその日に投稿したアカウントをアクセス時に表示（重複させないため）」とかも可能になります",
];

const InfoBlock: FC<InfoBlockProps> = ({ message, hasUrl, url }) => {
  return hasUrl ? (
    <Box marginY="3" p="5" border="1px" borderStyle="dashed" bgColor="#f1e9d0">
      <p>{message}</p>
      {url ?? <Link href={url}>New Info Here</Link>}
    </Box>
  ) : (
    <>
      <Spacer p="2" />
      {dev ? (
        <Alert status="warning">
          <AlertIcon />
          <Box>
            <AlertTitle>STATUS - Development: ver 2023-02-26</AlertTitle>
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
      ) : (
        ""
      )}
    </>
  );
};

export default InfoBlock;
