import { type FC, useReducer } from "react";
import { Box, Container, Text, useDisclosure } from "@chakra-ui/react";
import "./App.css";
import { Footer, Header, FormRoot, Info } from "@/app/client/components/Index";
import { type FormValues } from "./components/Form/form-select-data";
import InfoBlockForGeneral from "./components/Info/forGeneral";

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
  const { formStudents, formInquiryItems, accessedUserId, accessedUserType } =
    useMemberData();

  // infoバナー用
  const { isOpen, onClose } = useDisclosure({
    defaultIsOpen: true,
  });

  return (
    <div className="App">
      <Ctx.Provider
        // 使い回すcontext
        value={{
          students: formStudents,
          inquiries: formInquiryItems,
          accessedUserId,
        }}
      >
        <Header headerTitle={sheetName} spreadsheetLink={sheetUrl} />
        <Container maxW="4xl">
          {/** TODO: information area */}
          <Info
            message={""}
            hasUrl={false}
            url={""}
            isOpen={isOpen}
            onClose={onClose}
          />
          {accessedUserType === "general" ? (
            <InfoBlockForGeneral />
          ) : (
            <Box py={4} paddingLeft={3}>
              <Text>
                {" "}
                {accessedUserId && `こんにちわ、${accessedUserId} さん！`}
              </Text>
            </Box>
          )}
          <FormRoot
            userType={accessedUserType}
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