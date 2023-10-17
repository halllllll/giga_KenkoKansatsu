import { type FC, useReducer } from "react";
import { Box, Container, HStack, Icon, Spacer, Text } from "@chakra-ui/react";
import "./App.css";
import { RiArrowDownCircleLine } from "react-icons/ri";
import { Footer, Header, FormRoot } from "@/app/client/components/Index";
import { type FormValues } from "./components/Form/form-select-data";
import InfoBlockForGeneral from "./components/_Info/forGeneral";

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
        <Container maxW="4xl">
          {accessedUserType === "general" ? (
            <InfoBlockForGeneral />
          ) : (
            <Box py={4} paddingLeft={3}>
              <HStack>
                <Text>
                  {accessedUserId !== ""
                    ? `こんにちは、${accessedUserId} さん！`
                    : "よみこみちゅう..."}
                </Text>
                {candidateStates.length > 0 && (
                  <>
                    <Spacer />
                    <Text as={"b"} color={"red.600"}>
                      未送信のデータがあります。
                    </Text>
                    <Icon
                      onClick={() => {
                        window.scrollTo({
                          top: document.body.scrollHeight,
                          behavior: "smooth",
                        });
                      }} // 上までSmoothスクロール
                      cursor="pointer"
                      as={RiArrowDownCircleLine}
                      bgColor="gray.100"
                      color="gray.500"
                      w={8}
                      h={8}
                      rounded="full"
                      // p={2}
                      boxShadow="md"
                      _hover={{
                        bgColor: "gray.200",
                      }}
                    />
                  </>
                )}
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
