import { type FC } from "react";
import { useFormContext } from "react-hook-form";
import ControlledSelect from "@/app/client/components/Form/controlled-select";
import {
  type FormValues,
  type Attendance,
} from "@/app/client/components/Form/form-select-data";

type SelectAttendanceFieldProps = {
  attendanceOptions: Attendance[] | null;
};

const SelectAttendanceField: FC<SelectAttendanceFieldProps> = ({
  attendanceOptions,
}) => {
  const methods = useFormContext();

  return (
    <ControlledSelect<FormValues, Attendance, false>
      name="attendance"
      id="attendance"
      control={methods.control}
      label="出欠・遅刻"
      placeholder="どうしたの？"
      options={attendanceOptions}
    />
  );
};

export default SelectAttendanceField;
