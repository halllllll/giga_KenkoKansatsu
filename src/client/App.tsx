import { type FC, useReducer } from "react";
import { Container } from "@chakra-ui/react";

import "./App.css";
import { Footer, Header, Info, FormRoot } from "@/client/components/Index";
import { type FormValues } from "./components/Form/form-select-data";

import { Ctx } from "./context";
import { useMemberData } from "./hooks/useMemberData";
import { useSheetNameAndUrl } from "./hooks/useSheetNameAndUrl";
import { CandidateReducer } from "./reducer/candidateReducer";

// 送信予定（登録後）のフォームのデータ
const candidates: FormValues[] = [];

const App: FC = () => {
  // 送信予定reducer 用意
  const [candidateStates, candidateDispatch] = useReducer(
    CandidateReducer,
    candidates
  );
  // 各種state
  const { sheetName, sheetUrl } = useSheetNameAndUrl();
  const { formStudents, formInquiryItems } = useMemberData();

  // 使い回すcontext

  return (
    <div className="App">
      <Ctx.Provider
        value={{
          students: formStudents,
          inquiries: formInquiryItems,
          accessedUser: "",
        }}
      >
        <Header headerTitle={sheetName} spreadsheetLink={sheetUrl} />
        <Container maxW="4xl">
          {/** TODO: information area */}
          {/* <Info message={""} hasUrl={false} url={""} /> */}
          <FormRoot
            formStudents={formStudents}
            formInquiryItems={formInquiryItems}
            candidatesState={candidateStates}
            candidateDispatch={candidateDispatch}
          />
        </Container>
        <Footer footerTitle={sheetName} />
      </Ctx.Provider>
    </div>
  );
};

export default App;
