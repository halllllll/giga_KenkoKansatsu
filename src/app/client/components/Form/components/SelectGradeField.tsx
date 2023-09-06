import { type FC } from "react";
import { useFormContext } from "react-hook-form";
import ControlledSelect from "../controlled-select";
import {
  type FormValues,
  type Grade,
} from "@/app/client/components/Form/form-select-data";

type SelectGradeFieldProps = {
  gradeOptions: Grade[];
  setGradeHandler: () => void;
};

const SelectGradeField: FC<SelectGradeFieldProps> = ({
  gradeOptions,
  setGradeHandler,
}) => {
  const methods = useFormContext();

  return (
    <ControlledSelect<FormValues, Grade, false>
      name="grade"
      id="grade"
      control={methods.control}
      label="学年"
      placeholder="学年を選ぼう！"
      options={gradeOptions}
      // value={gradeOptions}
      rules={{
        onChange: setGradeHandler,
      }}
    />
  );
};

export default SelectGradeField;
