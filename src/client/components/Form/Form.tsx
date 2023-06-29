import { type SyntheticEvent, type FC } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Textarea,
  Tr,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { format } from "date-fns";
import ja from "date-fns/locale/ja";
import { useForm, type SubmitHandler } from "react-hook-form";
import { type Actions } from "@/client/reducer/FormReducer";
import { type postDataResult } from "@/server/API/Post";
import { type InquiryItem, type Student } from "@/server/Config/SheetData";
import { ScreenSpinner, type ViewData } from "../Index";
import ControlledSelect from "./controlled-select";
import {
  type ClassName,
  type Name,
  type FormValues,
  type Attendance,
  type Condition,
  type Grade,
} from "./form-select-data";
import { useOptionsOfForm } from "./hooks/useOptionsOfForm";
import { FormSchema } from "./schemas/registration-form";
import { postFormValueDataAPI } from "@/client/API/postData";

type FormProps = {
  readonly formStudents: Student[];
  readonly formInquiryItems: InquiryItem | null;
  readonly candidatesState: FormValues[];
  candidateDispatch: React.Dispatch<Actions>;
};

// experimental
/**
 *
 *  TODO: integrate FORM experiences.
 *  - ONLY 1 `useForm`
 *
 */

const FormRoot: FC<FormProps> = (props) => {
  const { formStudents, formInquiryItems, candidateDispatch, candidatesState } =
    props;

  // あらかじめDefaultValuesをきめておけば、reset()に流用できる
  const formDefaultValues: FormValues = {
    registerDate: format(new Date(), "yyyy-MM-dd", { locale: ja }),
    grade: null,
    className: null,
    classNumber: null,
    name: null,
    attendance: { label: "", value: "" },
    condition: [],
    status: "",
  };
  // TODO: MORE BETTER temporary-customhook
  const {
    setGrade,
    setClassName,
    setName,
    gradeOptions,
    classNameOptions,
    nameOptions,
    attendanceOptions,
    conditionOptions,
  } = useOptionsOfForm({
    students: formStudents,
    inquiryItem: formInquiryItems,
  });

  /**
   * Form部分
   * useForm用 ここから
   */
  const {
    register: register1,
    handleSubmit: handleSubmit1,
    reset: reset1,
    formState: { errors: errors1, isSubmitting: isSubmitting1 },
    control,
    getValues,
  } = useForm<FormValues>({
    mode: "all",
    criteriaMode: "all",
    resolver: yupResolver(FormSchema),
    defaultValues: formDefaultValues,
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    // 登録
    candidateDispatch({
      type: "ADD",
      payload: data,
    });
    // 連続して登録する場合、シチュエーション的にほとんどの場合は名前とstatusのみ変更
    reset1({
      grade: getValues().grade,
      name: null,
      className: getValues().className,
      status: "",
      attendance: { label: "", value: "" },
      condition: [],
    });
    setName(null);
  };

  // 全部リセット
  const onReset = (e: SyntheticEvent) => {
    e.stopPropagation();
    reset1(formDefaultValues);
    setGrade(null);
    setName(null);
    setClassName(null);
  };

  /**
   * for candidate area
   */
  // view用にする
  const candidatesItems: ViewData[] = candidatesState.map((c, idx) => {
    return {
      viewIndex: idx,
      registerDate: c.registerDate,
      grade: c.grade,
      className: c.className,
      classNumber: c.classNumber,
      name: c.name,
      attendance: c.attendance,
      condition: c.condition,
      status: c.status,
    };
  });

  /**
   * send button用
   */
  // Form部分とは別のuseFormを使っている（sendHandlerのためだけに（多分））
  const { onClose } = useDisclosure();

  const {
    handleSubmit: handleSubmit2,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    formState: { errors: errors2, isSubmitting: isSubmitting2 },
    reset: reset2,
  } = useForm<FormValues>({});
  const onPostSubmit: SubmitHandler<FormValues> = async () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    const result = await Promise.race<postDataResult>([
      new Promise((resolve, _reject) =>
        setTimeout(() => {
          const ret: postDataResult = {
            status: "error",
          };
          resolve(ret);
        }, 5000)
      ),
      await postFormValueDataAPI(candidatesState),
    ]);
    switch (result.status) {
      case "success": {
        reset2();
        break;
      }
      case "error": {
        // TODO: view
        console.error(result.error);
        break;
      }
    }
    console.log(`result ... ${JSON.stringify(result)}`);
  };

  return (
    <>
      <Box
        my={3}
        px={5}
        py={3}
        borderWidth="1px"
        borderRadius="lg"
        boxShadow="base"
      >
        <form onSubmit={handleSubmit1(onSubmit)}>
          <HStack>
            <Box width="max-content">
              <FormControl
                my="5"
                id="registerDate"
                isInvalid={!(errors1.registerDate?.message == null)}
              >
                <FormLabel>日付</FormLabel>
                <Input
                  size="lg"
                  variant="flushed"
                  {...register1("registerDate")}
                  type="date"
                />
                {(errors1.registerDate?.message !== null && (
                  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                  <FormErrorMessage>日付を選んでね</FormErrorMessage>
                )) || <> </>}
              </FormControl>
            </Box>
          </HStack>
          <VStack>
            <HStack width="full">
              <ControlledSelect<FormValues, Grade, false>
                name="grade"
                id="grade"
                control={control}
                label="学年"
                placeholder="学年を選ぼう！"
                options={gradeOptions}
                value={gradeOptions}
                rules={{
                  onChange: () => {
                    setGrade(getValues().grade);
                  },
                }}
              />
              <ControlledSelect<FormValues, ClassName, false>
                name="className"
                id="className"
                control={control}
                label="クラス"
                placeholder="クラスを選ぼう！"
                options={classNameOptions}
                value={classNameOptions}
                rules={{
                  onChange: () => {
                    setClassName(getValues().className);
                  },
                }}
              />
            </HStack>
            <ControlledSelect<FormValues, Name, false>
              name="name"
              id="name"
              control={control}
              label="名前"
              placeholder="名前を検索しよう！"
              options={nameOptions}
              value={nameOptions}
              rules={{
                onChange: () => {
                  setName(getValues().name);
                },
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
                  bg: "transparent",
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
            <HStack width="full">
              <Box minWidth="3xs">
                <ControlledSelect<FormValues, Attendance, false>
                  name="attendance"
                  id="attendance"
                  control={control}
                  label="出欠・遅刻"
                  placeholder="どうしたの？"
                  options={attendanceOptions}
                />
              </Box>
              <ControlledSelect<FormValues, Condition, true>
                isMulti
                name="condition"
                id="condition"
                control={control}
                label="症状・理由"
                placeholder="なんでかな？（複数可）"
                options={conditionOptions}
              />
            </HStack>
          </VStack>
          <FormControl
            id="status"
            isInvalid={!(errors1.status?.message == null)}
          >
            <FormLabel>備考</FormLabel>
            <Textarea
              maxHeight={200}
              placeholder="備考があれば書いてね"
              {...register1("status")}
            />
          </FormControl>
          <HStack alignItems="center" justifyContent="center">
            <ButtonGroup mt="5" w="xs" gap="4">
              <Button
                w="30%"
                colorScheme="orange"
                variant="solid"
                onClick={onReset}
                disabled={isSubmitting1}
              >
                リセット
              </Button>
              <Button
                w="70%"
                colorScheme="blue"
                variant="solid"
                type="submit"
                disabled={isSubmitting1}
                isLoading={isSubmitting1}
                loadingText="登録中"
                spinnerPlacement="start"
              >
                登録
              </Button>
            </ButtonGroup>
          </HStack>
        </form>
      </Box>

      {candidatesState.length > 0 && (
        <>
          <Box>
            <Box
              mt="10"
              py="5"
              h="fit-content"
              bg="burlywood"
              textColor="whitesmoke"
              fontSize="lg"
              fontWeight="extrabold"
              borderRadius="md"
            >
              <Center h="100%">反映予定のアカウント</Center>
            </Box>
            <TableContainer whiteSpace="unset">
              <Table variant="simple" colorScheme="gray">
                <TableCaption placement="top"></TableCaption>
                <Tbody>
                  {candidatesItems.map((item) => {
                    return (
                      <Tr key={item.viewIndex}>
                        <Td>{item.name?.value} さん</Td>
                        <Td fontWeight="extrabold" p="0">
                          {item.attendance.value}
                        </Td>
                        <Td w="xl">
                          <VStack align="flex-start">
                            <Text>
                              【出欠・遅刻】
                              <br />
                              {item.condition?.map((v) => v.value).join("、")}
                            </Text>
                            <Text>
                              【症状・理由】
                              <br />
                              {item.status}
                            </Text>
                          </VStack>
                        </Td>
                        <Td w="min-content" padding="0">
                          <Button
                            variant="solid"
                            color="whiteAlpha.900"
                            bgColor="orange.300"
                            onClick={() => {
                              candidateDispatch({
                                type: "DELETE",
                                payload: {
                                  index: item.viewIndex,
                                },
                              });
                            }}
                          >
                            削除
                          </Button>
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
          <Box mt="10">
            <ScreenSpinner onClose={onClose} isOpen={isSubmitting2} />
            <Box h="maxContent">
              <form onSubmit={handleSubmit2(onPostSubmit)}>
                <Center h="100%">
                  <Button
                    colorScheme="teal"
                    variant="solid"
                    type="submit"
                    disabled={isSubmitting2}
                    isLoading={isSubmitting2}
                    loadingText="送信中..."
                    spinnerPlacement="start"
                  >
                    送信する
                  </Button>
                </Center>
              </form>
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

export default FormRoot;
