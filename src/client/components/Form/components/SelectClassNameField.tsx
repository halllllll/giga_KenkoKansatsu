import { type FC } from "react";
import { useFormContext } from "react-hook-form";
import ControlledSelect from "@/client/components/Form/controlled-select";
import {
  type FormValues,
  type ClassName,
} from "@/client/components/Form/form-select-data";

type SelectClassNameFieldProps = {
  classNameOptions: ClassName[];
  setClassNameHandler: () => void;
};

const SelectClassNameField: FC<SelectClassNameFieldProps> = ({
  classNameOptions,
  setClassNameHandler,
}) => {
  const methods = useFormContext();

  return (
    <ControlledSelect<FormValues, ClassName, false>
      name="className"
      id="className"
      control={methods.control}
      label="クラス"
      placeholder="クラスを選ぼう！"
      options={classNameOptions}
      // value={classNameOptions}
      rules={{
        onChange: setClassNameHandler,
      }}
    />
  );
};

export default SelectClassNameField;
