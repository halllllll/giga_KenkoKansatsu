import { type FC, useReducer } from "react";
import { Container } from "@chakra-ui/react";
import { isGASEnvironment } from "gas-client/src/utils/is-gas-environment";

import "./App.css";
import {
  CandidatesArea,
  Footer,
  Form,
  type FormValues,
  SendButton,
  Header,
  Info,
} from "@/client/components/Index";

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
  const { formStudentElements, inquiryItem } = useMemberData();

  if (isGASEnvironment()) {
    console.log("in PROD ENV");
  } else {
    console.log("in DEV ENV");
  }

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
        {candidateStates.length > 0 && (
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
        )}
      </Container>
      <Footer footerTitle={sheetName} />
    </div>
  );
};

export default App;
