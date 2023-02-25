import { type FC } from "react";
import {
  Center,
  Box,
  Text,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tr,
} from "@chakra-ui/react";
import { type Actions } from "@/client/reducer/FormReducer";
import { type FormValues } from "../../Form/Form";
import { type ViewData } from "../CandidateInfo";

type CandidateProps = {
  dispatch: React.Dispatch<Actions>;
  candidates: FormValues[];
};

const CandidatesArea: FC<CandidateProps> = ({ candidates }) => {
  // view用にする
  const candidatesItems: ViewData[] = candidates.map((c, idx) => {
    return {
      viewIndex: idx,
      registerDate: c.registerDate,
      grade: c.grade,
      className: c.className,
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
        <Center h="100%">投稿予定のアカウント</Center>
      </Box>
      <TableContainer whiteSpace="unset">
        <Table variant="simple" colorScheme="cyan">
          <TableCaption placement="top"></TableCaption>
          <Tbody>
            {candidatesItems.map((item) => {
              return (
                <Tr key={item.viewIndex}>
                  <Td>{item.name?.value} さん</Td>
                  <Td fontWeight="extrabold">{item.attendance.value}</Td>
                  <Td>
                    <Text>
                      【出欠・遅刻】
                      <br />
                      {item.condition?.map((v) => v.value).join("、")}
                    </Text>
                    <Text>
                      【症状など】
                      <br />
                      {item.status}
                    </Text>
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
