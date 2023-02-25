import { type FC, useState, useEffect, useReducer } from "react";
import { Container } from "@chakra-ui/react";
import { GASClient } from "gas-client";

import { type Student, type InquiryItem } from "@/server/Config/SheetData";
import type * as server from "../server/Main";
import "./App.css";
import CandidatesArea from "./components/Candidate/components/CandidatesArea";
import Form, { type FormValues } from "./components/Form/Form";
import Header from "./components/Header/Header";
import Info from "./components/Info/Info";

import { FormReducer } from "./reducer/FormReducer";

const { serverFunctions } = new GASClient<typeof server>();

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
    Name: "Nakagawa",
    Kana: "なかがわ",
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
    Name: "Tanaka",
    Kana: "たなか",
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
];

const _inquryItemsTest: InquiryItem = {
  Condition: [
    "不定愁訴",
    "網膜剥離",
    "開放骨折",
    "鼻血",
    "心臓爆発",
    "アルコール中毒",
    "人面疽",
    "タンスの角に小指",
    "開放骨折",
    "食欲不振",
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
  const [title, setTitle] = useState<string>(document.title);
  const [formStudentElements, setStudentElements] = useState<Student[]>([]);
  const [inquiryItem, setInquiryItem] = useState<InquiryItem | null>(null);
  // titleとForm用のデータとで取得する時間にかなり差があるので別々に取得するためにuseEffectをわけた
  useEffect(() => {
    const knock = async () => {
      const [FormElements] = await Promise.all([serverFunctions.PrepareForm()]);
      setStudentElements(FormElements.Students);
      setInquiryItem(FormElements.InquiryItems);
      // 更新されるタイミングがあるのでここで呼んでも空
      // console.log(formStudentElements);
      // 以下のように無理やりやる方法はある
      // setInquiryItem((a) => {
      //   console.log("get inquiry items insane way");
      //   console.log(a);

      //   return a;
      // });
    };
    void knock();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const knock = async () => {
      const spreadsheettitle = await serverFunctions.getSpreadSheetName();
      console.log(`get spread sheet title: ${spreadsheettitle ?? "(null)"}`);
      setTitle(spreadsheettitle);
    };
    void knock();
  }, []);

  return (
    <div className="App">
      <Header headerTitle={title} />
      <Container maxW="3xl">
        {/** TODO: information area */}
        <Info message={""} hasUrl={false} url={""} />
        <Form
          students={_formStudentElementsTest}
          inquiryItem={_inquryItemsTest}
          dispatch={candidateDispatch}
        />
        {candidateStates.length > 0 ? (
          <CandidatesArea
            dispatch={candidateDispatch}
            candidates={candidateStates}
          />
        ) : (
          <></>
        )}
      </Container>
    </div>
  );
};

export default App;
