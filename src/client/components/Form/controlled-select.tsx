import { FormErrorMessage, FormLabel, FormControl } from "@chakra-ui/react";
import {
  Select,
  type Props as SelectProps,
  type GroupBase,
} from "chakra-react-select";
import {
  useController,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";

interface ControlledSelectProps<
  FormValues extends FieldValues = FieldValues,
  Option = unknown,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
> extends Omit<SelectProps<Option, IsMulti, Group>, "name" | "defaultValue">,
    UseControllerProps<FormValues> {
  label?: string;
}
/**
 * An attempt to make a reusable chakra-react-select form component
 *
 * @param props - The combined props of the chakra-react-select component and the useController hook
 */

const ControlledSelect: any = <
  FormValues extends FieldValues = FieldValues,
  Option = unknown,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
>({
  name,
  label,
  options,
  control,
  rules,
  shouldUnregister,
  ...selectProps
}: ControlledSelectProps<FormValues, Option, IsMulti, Group>) => {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController<FormValues>({
    name,
    control,
    rules,
    shouldUnregister,
  });

  return (
    <FormControl label={label} isInvalid={!!error} id={name}>
      {label != null && <FormLabel>{label}</FormLabel>}
      <Select<Option, IsMulti, Group>
        options={options}
        {...selectProps}
        ref={ref}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        name={name}
      />
      {error?.message === undefined ? (
        "　"
      ) : (
        <FormErrorMessage>{error.message}</FormErrorMessage>
      )}
    </FormControl>
  );
};

export default ControlledSelect;
