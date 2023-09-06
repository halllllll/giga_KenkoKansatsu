import { type FC } from "react";
import { useFormContext } from "react-hook-form";
import ControlledSelect from "@/app/client/components/Form/controlled-select";
import {
  type FormValues,
  type Condition,
} from "@/app/client/components/Form/form-select-data";

type SelectConditionFieldProps = {
  conditionOptions: Condition[] | null;
};

const SelectConditionField: FC<SelectConditionFieldProps> = ({
  conditionOptions,
}) => {
  const methods = useFormContext();

  return (
    <ControlledSelect<FormValues, Condition, true>
      isMulti
      name="condition"
      id="condition"
      control={methods.control}
      label="症状・理由"
      placeholder="なんでかな？（複数可）"
      options={conditionOptions}
    />
  );
};

export default SelectConditionField;
