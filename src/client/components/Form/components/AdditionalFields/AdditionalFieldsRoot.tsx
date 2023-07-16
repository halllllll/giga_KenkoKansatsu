import { type FC } from "react";
import { Box, HStack } from "@chakra-ui/react";
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
      <HStack width="full">
        <Box minWidth="3xs">
          <SelectAttendanceField attendanceOptions={attendanceOptions} />
        </Box>
        <SelectConditionField conditionOptions={conditionOptions} />
      </HStack>
      <InputStatusField />
    </>
  );
};

export default AdditionalFieldsRoot;
