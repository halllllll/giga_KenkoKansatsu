import { type FC, useState, useEffect, useReducer } from "react";
import { Container } from "@chakra-ui/react";
import { GASClient } from "gas-client";

import { type Student, type InquiryItem } from "@/server/Config/SheetData";
import type * as server from "@/server/Main";
import "./App.css";
import CandidatesArea from "./components/Candidate/components/CandidatesArea";
import Footer from "./components/Footer/Footer";
import Form, { type FormValues } from "./components/Form/Form";
import SendButton from "./components/Form/Send/SendButton";
import Header from "./components/Header/Header";
import Info from "./components/Info/Info";

import { useSheetNameAndUrl } from "./hooks/useSheetNameAndUrl";

import { FormReducer } from "./reducer/FormReducer";

export const { serverFunctions } = new GASClient<typeof server>();

const candidates: FormValues[] = [];

const _formStudentElementsTest: Student[] = [
  {
    Grade: "1",
    Class: "スリザリン",
    Name: "Terada",
    Kana: "てらだ",
    Number: 5,
    Role: "児童生徒",
  },
  {
    Grade: "4",
    Class: "グリフィンドール",
    Name: "Matsuda",
    Kana: "まつだ",
    Number: 14,
    Role: "児童生徒",
  },
  {
    Grade: "2",
    Class: "スリザリン",
    Name: "Bernardin",
    Kana: "べるなるだん",
    Number: 16,
    Role: "児童生徒",
  },
  {
    Grade: "1",
    Class: "レイブンクロー",
    Name: "Kubo",
    Kana: "くぼ",
    Number: 18,
    Role: "児童生徒",
  },
  {
    Grade: "3",
    Class: "ハッフルパフ",
    Name: "Takahashi",
    Kana: "たかはし",
    Number: 20,
    Role: "児童生徒",
  },
  {
    Grade: "4",
    Class: "スリザリン",
    Name: "Yoshida",
    Kana: "よしだ",
    Number: 22,
    Role: "児童生徒",
  },
  {
    Grade: "1",
    Class: "グリフィンドール",
    Name: "Ito",
    Kana: "いとう",
    Number: 24,
    Role: "児童生徒",
  },
  {
    Grade: "3",
    Class: "スリザリン",
    Name: "Kawamura",
    Kana: "かわむら",
    Number: 26,
    Role: "児童生徒",
  },
  {
    Grade: "2",
    Class: "ハッフルパフ",
    Name: "Nishimura",
    Kana: "にしむら",
    Number: 28,
    Role: "児童生徒",
  },
  {
    Grade: "1",
    Class: "スリザリン",
    Name: "Miyamoto",
    Kana: "みやもと",
    Number: 30,
    Role: "児童生徒",
  },
  {
    Grade: "4",
    Class: "レイブンクロー",
    Name: "Suzumura",
    Kana: "すずむら",
    Number: 32,
    Role: "児童生徒",
  },
  {
    Grade: "4",
    Class: "ハッフルパフ",
    Name: "Anonn",
    Kana: "あのん",
    Number: 2,
    Role: "児童生徒",
  },
  {
    Grade: "2",
    Class: "レイブンクロー",
    Name: "Ken",
    Kana: "けん",
    Number: 3,
    Role: "児童生徒",
  },
  {
    Grade: "3",
    Class: "グリフィンドール",
    Name: "Yamada",
    Kana: "やまだ",
    Number: 10,
    Role: "児童生徒",
  },
  {
    Grade: "1",
    Class: "スリザリン",
    Name: "Nakamura",
    Kana: "なかむら",
    Number: 7,
    Role: "児童生徒",
  },
  {
    Grade: "2",
    Class: "ハッフルパフ",
    Name: "Suzuki",
    Kana: "すずき",
    Number: 4,
    Role: "児童生徒",
  },
  {
    Grade: "4",
    Class: "レイブンクロー",
    Name: "Leclère",
    Kana: "れくれーる",
    Number: 1,
    Role: "児童生徒",
  },
  {
    Grade: "3",
    Class: "スリザリン",
    Name: "Watanabe",
    Kana: "わたなべ",
    Number: 6,
    Role: "児童生徒",
  },
  {
    Grade: "2",
    Class: "グリフィンドール",
    Name: "Kato",
    Kana: "かとう",
    Number: 8,
    Role: "児童生徒",
  },
  {
    Grade: "1",
    Class: "ハッフルパフ",
    Name: "Abe",
    Kana: "あべ",
    Number: 9,
    Role: "児童生徒",
  },
  {
    Grade: "4",
    Class: "スリザリン",
    Name: "Ishida",
    Kana: "いしだ",
    Number: 12,
    Role: "児童生徒",
  },
  {
    Grade: "3",
    Class: "レイブンクロー",
    Name: "Sato",
    Kana: "さとう",
    Number: 11,
    Role: "児童生徒",
  },
  {
    Grade: "2",
    Class: "ハッフルパフ",
    Name: "Ogawa",
    Kana: "おがわ",
    Number: 13,
    Role: "児童生徒",
  },
  {
    Grade: "2",
    Class: "グリフィンドール",
    Name: "Mia",
    Kana: "みあ",
    Number: 12,
    Role: "児童生徒",
  },
  {
    Grade: "3",
    Class: "スリザリン",
    Name: "Nathan",
    Kana: "ねいさん",
    Number: 7,
    Role: "児童生徒",
  },
  {
    Grade: "1",
    Class: "ハッフルパフ",
    Name: "Erika",
    Kana: "えりか",
    Number: 14,
    Role: "児童生徒",
  },
  {
    Grade: "4",
    Class: "レイブンクロー",
    Name: "Gina",
    Kana: "じーな",
    Number: 9,
    Role: "児童生徒",
  },
  {
    Grade: "2",
    Class: "ハッフルパフ",
    Name: "Ryan",
    Kana: "らいあん",
    Number: 15,
    Role: "児童生徒",
  },
  {
    Grade: "3",
    Class: "レイブンクロー",
    Name: "Isabella",
    Kana: "いざべら",
    Number: 3,
    Role: "児童生徒",
  },
  {
    Grade: "1",
    Class: "グリフィンドール",
    Name: "Jack",
    Kana: "じゃっく",
    Number: 17,
    Role: "児童生徒",
  },
  {
    Grade: "4",
    Class: "スリザリン",
    Name: "Lana",
    Kana: "らな",
    Number: 8,
    Role: "児童生徒",
  },
  {
    Grade: "2",
    Class: "レイブンクロー",
    Name: "Drew",
    Kana: "どりゅう",
    Number: 11,
    Role: "児童生徒",
  },
  {
    Grade: "3",
    Class: "グリフィンドール",
    Name: "Emma",
    Kana: "えんま",
    Number: 19,
    Role: "児童生徒",
  },
  {
    Grade: "2",
    Class: "レイブンクロー",
    Name: "Dubois",
    Kana: "でゅぼわ",
    Number: 12,
    Role: "児童生徒",
  },
  {
    Grade: "3",
    Class: "グリフィンドール",
    Name: "Leveque",
    Kana: "るうべーく",
    Number: 17,
    Role: "児童生徒",
  },
  {
    Grade: "4",
    Class: "スリザリン",
    Name: "Durand",
    Kana: "でゅらん",
    Number: 3,
    Role: "児童生徒",
  },
  {
    Grade: "1",
    Class: "ハッフルパフ",
    Name: "Fournier",
    Kana: "ふーるにえ",
    Number: 8,
    Role: "児童生徒",
  },
  {
    Grade: "2",
    Class: "グリフィンドール",
    Name: "Gautier",
    Kana: "ごーてぃえ",
    Number: 11,
    Role: "児童生徒",
  },
  {
    Grade: "3",
    Class: "スリザリン",
    Name: "Moreau",
    Kana: "もろー",
    Number: 15,
    Role: "児童生徒",
  },
  {
    Grade: "1",
    Class: "レイブンクロー",
    Name: "Rousseau",
    Kana: "るーそー",
    Number: 19,
    Role: "児童生徒",
  },
  {
    Grade: "4",
    Class: "レイブンクロー",
    Name: "Leroy",
    Kana: "るろわ",
    Number: 7,
    Role: "児童生徒",
  },
  {
    Grade: "2",
    Class: "ハッフルパフ",
    Name: "Dupont",
    Kana: "でゅぽん",
    Number: 14,
    Role: "児童生徒",
  },
  {
    Grade: "3",
    Class: "レイブンクロー",
    Name: "Blanchard",
    Kana: "ぶらんしゃーる",
    Number: 10,
    Role: "児童生徒",
  },
];

const _inquryItemsTest: InquiryItem = {
  Condition: [
    "不定愁訴",
    "修行",
    "遠征",
    "鼻血",
    "腹痛",
    "激辛料理",
    "人面疽",
    "タンスの角に小指",
    "咳",
    "食欲不振",
    "筋肉痛",
    "深爪",
    "虫歯",
    "寝違え",
    "寝癖",
    "ボランティア",
  ],
  Attendance: ["出席停止", "病欠", "自己欠", "忌引", "遅刻"],
};

const App: FC = () => {
  // reducer 用意
  const [candidateStates, candidateDispatch] = useReducer(
    FormReducer,
    candidates
  );
  // 各種state
  // const [title, setTitle] = useState<string>(document.title);
  // const [sheetUrl, setSheetUrl] = useState<string>("");
  const { sheetName, sheetUrl } = useSheetNameAndUrl();
  const [formStudentElements, setStudentElements] = useState<Student[]>([]);
  const [inquiryItem, setInquiryItem] = useState<InquiryItem | null>(null);
  // titleとForm用のデータとで取得する時間にかなり差があるので別々に取得するためにuseEffectをわけた
  useEffect(() => {
    const knock = async () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const [FormElements] = await Promise.all([serverFunctions.PrepareForm()]);
      setStudentElements(FormElements.Students);
      setInquiryItem(FormElements.InquiryItems);
    };
    void knock();
  }, []);

  // useEffect(() => {
  //   const knock = async () => {
  //     const [spreadsheettitle, spreadsheetUrl] = await Promise.all([
  //       serverFunctions.getSpreadSheetName(),
  //       serverFunctions.getSpreadSheetUrl(),
  //     ]);
  //     console.log(`get spread sheet title: ${spreadsheettitle ?? "(null)"}`);
  //     setTitle(spreadsheettitle);
  //     setSheetUrl(spreadsheetUrl);
  //   };
  //   void knock();
  // }, []);

  return (
    <div className="App">
      <Header headerTitle={sheetName} spreadsheetLink={sheetUrl} />
      <Container maxW="4xl">
        {/** TODO: information area */}
        <Info message={""} hasUrl={false} url={""} />
        <Form
          students={formStudentElements}
          inquiryItem={inquiryItem}
          dispatch={candidateDispatch}
        />
        {candidateStates.length > 0 ? (
          <>
            <CandidatesArea
              dispatch={candidateDispatch}
              candidates={candidateStates}
            />
            <SendButton
              dispatch={candidateDispatch}
              formValues={candidateStates}
            />
          </>
        ) : (
          <></>
        )}
      </Container>
      <Footer footerTitle={sheetName} />
    </div>
  );
};

export default App;
