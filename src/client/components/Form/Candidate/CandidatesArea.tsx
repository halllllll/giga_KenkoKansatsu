import { type FC } from "react";
import {
  Center,
  Box,
  Button,
  Text,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tr,
  VStack,
} from "@chakra-ui/react";
import { type ViewData } from "@/client/components/Index";
import { type FormValues } from "../form-select-data";
import { type CandidateAction } from "@/client/reducer/candidateReducer";

type CandidateProps = {
  dispatch: React.Dispatch<CandidateAction>;
  candidates: FormValues[];
};

const CandidatesArea: FC<CandidateProps> = ({ candidates, dispatch }) => {
  // view用にする
  const candidatesItems: ViewData[] = candidates.map((c, idx) => {
    return {
      viewIndex: idx,
      registerDate: c.registerDate,
      grade: c.grade,
      className: c.className,
      classNumber: c.classNumber,
      name: c.name,
      attendance: c.attendance,
      condition: c.condition,
      status: c.status,
    };
  });

  return (
    <Box>
      <Box
        mt="10"
        py="5"
        h="fit-content"
        bg="burlywood"
        textColor="whitesmoke"
        fontSize="lg"
        fontWeight="extrabold"
        borderRadius="md"
      >
        <Center h="100%">反映予定のアカウント</Center>
      </Box>
      <TableContainer whiteSpace="unset">
        <Table variant="simple" colorScheme="gray">
          <TableCaption placement="top"></TableCaption>
          <Tbody>
            {candidatesItems.map((item) => {
              return (
                <Tr key={item.viewIndex}>
                  <Td>{item.name?.value} さん</Td>
                  <Td fontWeight="extrabold" p="0">
                    {item.attendance.value}
                  </Td>
                  <Td w="xl">
                    <VStack align="flex-start">
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
                  <Td w="min-content" padding="0">
                    <Button
                      variant="solid"
                      color="whiteAlpha.900"
                      bgColor="orange.300"
                      onClick={() => {
                        dispatch({
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
  );
};

export default CandidatesArea;
