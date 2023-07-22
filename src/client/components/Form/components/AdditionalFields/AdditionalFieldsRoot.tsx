import { type FC } from "react";
import { Box, Flex } from "@chakra-ui/react";
import InputStatusField from "./InputStatusField";
import SelectAttendanceField from "./SelectAttendanceField";
import SelectConditionField from "./SelectConditionField";
import {
  type Attendance,
  type Condition,
} from "@/client/components/Form/form-select-data";

type AdditionalFieldOptions = {
  attendanceOptions: Attendance[] | null;
  conditionOptions: Condition[] | null;
};

const AdditionalFieldsRoot: FC<AdditionalFieldOptions> = (props) => {
  const { attendanceOptions, conditionOptions } = props;

  return (
    <>
      <Flex width="full" flexDirection={["column", "row"]} gap={2}>
        <Box minWidth="3xs">
          <SelectAttendanceField attendanceOptions={attendanceOptions} />
        </Box>
        <SelectConditionField conditionOptions={conditionOptions} />
      </Flex>
      <InputStatusField />
    </>
  );
};

export default AdditionalFieldsRoot;
