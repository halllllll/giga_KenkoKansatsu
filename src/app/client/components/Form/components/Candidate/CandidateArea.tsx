import { useContext, type FC } from "react";
import {
  Box,
  Button,
  Center,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tr,
  VStack,
} from "@chakra-ui/react";
import { format } from "date-fns";
import ja from "date-fns/locale/ja";
import { type ModalMessage } from "@/app/client/components/Screen/Modal";
import { type postDataResult } from "@/app/server/API/Post";
import { type submitStateType } from "../../submit-state";
import { type ViewData } from "./CandidateInfo";
import { postFormValueDataAPI } from "@/app/client/API/postData";
import { type FormValues } from "@/app/client/components/Form/form-select-data";
import { Ctx } from "@/app/client/context";
import { TimeoutError } from "@/app/client/errors";
import { type CandidateAction } from "@/app/client/reducer/candidateReducer";

type CandidateAreaProps = {
  candidatesState: FormValues[];
  onOpenModal: () => void;
  onDefaultForm: () => void;
  candidateDispatch: React.Dispatch<CandidateAction>;
  setModalMessage: (msg: ModalMessage) => void;
  setSubmitState: (state: submitStateType) => void;
  checkSubmitState: (state: submitStateType) => boolean;
};

const CandidateArea: FC<CandidateAreaProps> = (props) => {
  const {
    candidatesState,
    candidateDispatch,
    onOpenModal,
    onDefaultForm,
    setModalMessage,
    setSubmitState,
    checkSubmitState,
  } = props;

  // context
  const curCtx = useContext(Ctx);
  const accessedUserId = curCtx.accessedUserId as string;

  /**
   * for candidate area
   */
  // view用にする
  const candidatesItems: ViewData[] = candidatesState.map((c, idx) => {
    return {
      viewIndex: idx,
      registerDate: c.registerDate,
      registerEndToDate: c.registerEndToDate,
      grade: c.grade,
      className: c.className,
      classNumber: c.classNumber,
      name: c.name,
      attendance: c.attendance,
      condition: c.condition,
      status: c.status,
    };
  });

  /**
   * send button用
   */

  const onPostSubmit = async () => {
    setSubmitState("isSubmitting");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    const result = await Promise.race<postDataResult>([
      new Promise((resolve, _reject) =>
        setTimeout(() => {
          const ret: postDataResult = {
            status: "error",
            error: new TimeoutError("time out"),
            message: "時間がかかりすぎています。やり直してください。",
          };
          resolve(ret);
        }, 15000)
      ),
      postFormValueDataAPI(candidatesState, accessedUserId),
    ]);
    setSubmitState("isSubmitted");

    onOpenModal();
    switch (result.status) {
      case "success": {
        onDefaultForm();
        candidateDispatch({
          type: "RESET",
        });
        setModalMessage({
          headerText: "送信完了",
          bodyText: `${candidatesState.length} 件送信しました。ありがとうございます！`,
        });
        break;
      }
      case "error": {
        console.error(result.error);
        setModalMessage({
          headerText: result.error?.name ?? "Error",
          bodyText: result.message ?? "some error occured",
        });
        break;
      }
    }
  };

  return (
    <>
      <Box>
        <Box
          mt="2"
          py="5"
          h="fit-content"
          bg="burlywood"
          textColor="whitesmoke"
          fontSize="lg"
          fontWeight="extrabold"
          borderRadius="md"
        >
          <Center h="100%">反映予定データリスト</Center>
        </Box>
        <TableContainer whiteSpace="unset">
          <Table variant="simple" colorScheme="gray">
            <TableCaption placement="top"></TableCaption>
            <Tbody>
              {candidatesItems.map((item) => {
                return (
                  <Tr key={item.viewIndex}>
                    <Td w="min-content">
                      <VStack>
                        <Text>{item.name?.value} さん</Text>
                        <Text color="gray.500">
                          {item.grade?.value}年{item.className?.value}組
                          {item.classNumber}番
                        </Text>
                      </VStack>
                    </Td>
                    <Td fontWeight="extrabold" p="0">
                      {item.attendance.value}
                    </Td>
                    <Td w="xl">
                      <VStack align="flex-start">
                        <Text>
                          【日付】{" "}
                          {format(new Date(item.registerDate), "yyyy-MM-dd", {
                            locale: ja,
                          })}
                          {item.registerEndToDate !== undefined &&
                            ` 〜 ${format(
                              new Date(item.registerEndToDate),
                              "yyyy-MM-dd",
                              {
                                locale: ja,
                              }
                            )} `}
                        </Text>
                        <Text>
                          【出欠・遅刻】
                          <br />
                          {item.condition?.map((v) => v.value).join("、")}
                        </Text>
                        <Text>
                          【症状・理由】
                          <br />
                          {item.status}
                        </Text>
                      </VStack>
                    </Td>
                    <Td w="max-content" padding="0">
                      <Button
                        variant="solid"
                        // color="whiteAlpha.900"
                        // bgColor="orange.300"
                        colorScheme="orange"
                        onClick={() => {
                          candidateDispatch({
                            type: "DELETE",
                            payload: {
                              index: item.viewIndex,
                            },
                          });
                        }}
                      >
                        削除
                      </Button>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
      <Box mt="10">
        <Box h="maxContent">
          <Center h="100%">
            <Button
              colorScheme="teal"
              variant="solid"
              type="button"
              onClick={onPostSubmit}
              disabled={checkSubmitState("isSubmitting")}
              isLoading={checkSubmitState("isSubmitting")}
              loadingText="送信中..."
              spinnerPlacement="start"
            >
              送信する
            </Button>
          </Center>
        </Box>
      </Box>
    </>
  );
};

export default CandidateArea;
