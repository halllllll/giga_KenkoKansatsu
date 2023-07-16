import { type FC } from "react";
import {
  HStack,
  VStack,
  Input,
  Box,
  ButtonGroup,
  Button,
} from "@chakra-ui/react";
import { type SubmitHandler, useFormContext } from "react-hook-form";
import { type UserType } from "@/server/Config/Response";
import AdditionalFieldsRoot from "./AdditionalFields/AdditionalFieldsRoot";
import DateField from "./DateField";
import SelectClassNameField from "./SelectClassNameField";
import SelectGradeField from "./SelectGradeField";
import ControlledSelect from "@/client/components/Form/controlled-select";
import {
  type FormValues,
  type Grade,
  type ClassName,
  type Name,
  type Attendance,
  type Condition,
} from "@/client/components/Form/form-select-data";

type FormProps = {
  onAdd: SubmitHandler<any>;
  onReset: () => void;
  gradeOptions: Grade[];
  classNameOptions: ClassName[];
  nameOptions: Name[];
  conditionOptions: Condition[];
  attendanceOptions: Attendance[] | null;
  userType: UserType;
  setValueHandlers: Record<string, () => void>;
};

const Form: FC<FormProps> = (props) => {
  const {
    onAdd,
    onReset,
    gradeOptions,
    classNameOptions,
    nameOptions,
    conditionOptions,
    attendanceOptions,
    userType,
    setValueHandlers,
  } = props;

  // handler 解凍🍛
  const { setGradeHandler, setClassNameHandler, setNameHandler } =
    setValueHandlers;
  const methods = useFormContext();

  return (
    <Box
      my={3}
      px={5}
      py={3}
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="base"
    >
      <form onSubmit={methods.handleSubmit(onAdd)}>
        <HStack>
          <Box width="max-content">
            <DateField />
          </Box>
        </HStack>
        <VStack>
          <HStack width="full">
            <SelectGradeField
              gradeOptions={gradeOptions}
              setGradeHandler={setGradeHandler}
            />
            <SelectClassNameField
              classNameOptions={classNameOptions}
              setClassNameHandler={setClassNameHandler}
            />
          </HStack>
          {userType === "educator" ? ( // TODO: provide select name field by useType
            <ControlledSelect<FormValues, Name, false>
              name="name"
              id="name"
              control={methods.control}
              label="名前"
              placeholder="名前を検索しよう！"
              options={nameOptions}
              rules={{
                onChange: setNameHandler,
              }}
              formatOptionLabel={(option: Name) => {
                return (
                  <Box style={{ display: "flex" }}>
                    <Box>{option.label}</Box>
                    <Box style={{ marginLeft: "10px", color: "#999" }}>
                      {option.kana}
                    </Box>
                  </Box>
                );
              }}
              getOptionLabel={(option: Name) =>
                option.label + option.kana + option.value
              }
              chakraStyles={{
                // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                dropdownIndicator: (provided: any) => ({
                  ...provided,
                  px: 2,
                  cursor: "inherit",
                }),
                // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                indicatorSeparator: (provided: any) => ({
                  ...provided,
                  display: "none",
                }),
              }}
            />
          ) : (
            // TODO: DO IT PARENT MODE
            <>
              <Input placeholder="名前入力"></Input>
            </>
          )}
          <AdditionalFieldsRoot
            attendanceOptions={attendanceOptions}
            conditionOptions={conditionOptions}
          />
        </VStack>
        <HStack alignItems="center" justifyContent="center">
          <ButtonGroup mt="5" w="xs" gap="4">
            <Button
              w="30%"
              colorScheme="orange"
              variant="solid"
              onClick={onReset}
              disabled={methods.formState.isSubmitting}
            >
              リセット
            </Button>
            <Button
              w="70%"
              colorScheme="blue"
              variant="solid"
              type="submit"
              disabled={methods.formState.isSubmitting}
              isLoading={methods.formState.isSubmitting}
              loadingText="登録中"
              spinnerPlacement="start"
            >
              登録
            </Button>
          </ButtonGroup>
        </HStack>
      </form>
    </Box>
  );
};

export default Form;
