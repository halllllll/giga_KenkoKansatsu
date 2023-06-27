import { type FC, useReducer } from "react";
import { Container } from "@chakra-ui/react";

import "./App.css";
import { Footer, Header, Info, Form } from "@/client/components/Index";
import { type FormValues } from "./components/Form/form-select-data";

import { useMemberData } from "./hooks/useMemberData";
import { useSheetNameAndUrl } from "./hooks/useSheetNameAndUrl";
import { FormReducer } from "./reducer/FormReducer";

const candidates: FormValues[] = [];

const App: FC = () => {
  // reducer 用意
  const [candidateStates, candidateDispatch] = useReducer(
    FormReducer,
    candidates
  );
  // 各種state
  const { sheetName, sheetUrl } = useSheetNameAndUrl();
  const { formStudents, formInquiryItems } = useMemberData();

  return (
    <div className="App">
      <Header headerTitle={sheetName} spreadsheetLink={sheetUrl} />
      <Container maxW="4xl">
        {/** TODO: information area */}
        <Info message={""} hasUrl={false} url={""} />
        <Form
          formStudents={formStudents}
          formInquiryItems={formInquiryItems}
          candidatesState={candidateStates}
          candidateDispatch={candidateDispatch}
        />
      </Container>
      <Footer footerTitle={sheetName} />
    </div>
  );
};

export default App;
