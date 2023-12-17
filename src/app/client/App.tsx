import { type FC, useReducer } from "react";
import { Box, Container, HStack, Text } from "@chakra-ui/react";
import { Footer, Header, FormRoot } from "@/app/client/components/Index";
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
  const { formStudents, formInquiryItems, accessedUserId, accessedUserType } =
    useMemberData();

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
        <Container maxW="3xl">
          {accessedUserType === "general" ? (
            <></>
          ) : (
            <Box py={4} paddingLeft={3}>
              <HStack>
                <Text>
                  {accessedUserId !== ""
                    ? `こんにちは、${accessedUserId} さん！`
                    : "よみこみちゅう..."}
                </Text>
              </HStack>
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
