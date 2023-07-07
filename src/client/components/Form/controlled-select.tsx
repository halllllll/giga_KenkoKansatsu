import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Box,
} from "@chakra-ui/react";
import {
  Select,
  type Props as SelectProps,
  type GroupBase,
  type MenuListProps,
} from "chakra-react-select";
import {
  useController,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";

import { FixedSizeList } from "react-window";

const MENU_LIST_ITEM_HEIGHT = 35;
const MenuList: any = <
  Option = unknown,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
>({
  options,
  getValue,
  maxHeight,
  children,
}: MenuListProps<Option, IsMulti, Group>) => {
  if (!Array.isArray(children)) {
    return null;
  }

  const [selectedOption] = getValue();
  const initialScrollOffset =
    options.indexOf(selectedOption) * MENU_LIST_ITEM_HEIGHT;

  return (
    <FixedSizeList
      style={{
        border: "1px solid #ccc",
        borderRadius: "10px",
        overflow: "auto",
      }}
      key={children.length} // ???
      width="auto"
      height={Math.min(maxHeight, children.length * MENU_LIST_ITEM_HEIGHT)}
      itemCount={children.length}
      itemSize={MENU_LIST_ITEM_HEIGHT}
      initialScrollOffset={initialScrollOffset}
    >
      {({ index, style }) => (
        <Box
          style={{
            ...style,
            backgroundColor: "white",
          }}
        >
          {children[index]}
          {console.log(`children length: ${children.length}`)}
        </Box>
      )}
    </FixedSizeList>
  );
};

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
        components={{ MenuList }}
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
