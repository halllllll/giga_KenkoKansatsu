import { type FC } from "react";
import {
  HStack,
  FormControl,
  VStack,
  FormLabel,
  Input,
  Textarea,
  Box,
  ButtonGroup,
  Button,
} from "@chakra-ui/react";
import { type SubmitHandler, useFormContext } from "react-hook-form";
import { type UserType } from "@/server/Config/Response";
import ControlledSelect from "../controlled-select";
import {
  type FormValues,
  type Grade,
  type ClassName,
  type Name,
  type Attendance,
  type Condition,
} from "../form-select-data";
import DateField from "./DateField";

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
  // handler 解答
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
            <FormControl
              my="5"
              id="registerDate"
              isInvalid={
                !(methods.formState.errors.registerDate?.message == null)
              }
            >
              <DateField />
            </FormControl>
          </Box>
        </HStack>
        <VStack>
          <HStack width="full">
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
          </HStack>
          {userType === "educator" ? (
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
                  // bg: "transparent",
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
          <HStack width="full">
            <Box minWidth="3xs">
              <ControlledSelect<FormValues, Attendance, false>
                name="attendance"
                id="attendance"
                control={methods.control}
                label="出欠・遅刻"
                placeholder="どうしたの？"
                options={attendanceOptions}
              />
            </Box>
            <ControlledSelect<FormValues, Condition, true>
              isMulti
              name="condition"
              id="condition"
              control={methods.control}
              label="症状・理由"
              placeholder="なんでかな？（複数可）"
              options={conditionOptions}
            />
          </HStack>
        </VStack>
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
