import { type FC } from "react";
import { FormControl, FormLabel, Textarea } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

const InputStatusField: FC = () => {
  const methods = useFormContext();

  return (
    <FormControl
      id="status"
      isInvalid={!(methods.formState.errors.status?.message == null)}
    >
      <FormLabel>備考</FormLabel>
      <Textarea
        maxHeight={200}
        placeholder="備考があれば書いてね"
        {...methods.register("status")}
      />
    </FormControl>
  );
};

export default InputStatusField;
