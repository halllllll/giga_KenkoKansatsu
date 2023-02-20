import { type FC, useState, useEffect } from "react";
import { Container } from "@chakra-ui/react";
import { GASClient } from "gas-client";

import { type Student, type InquiryItem } from "@/server/Config/SheetData";
import type * as server from "../server/Main";
import "./App.css";
import Form from "./components/Form/Form";
import Header from "./components/Header";
import Info from "./components/Info";

const { serverFunctions } = new GASClient<typeof server>();

const App: FC = () => {
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
        <Form students={formStudentElements} inquiryItem={inquiryItem} />
      </Container>
    </div>
  );
};

export default App;
