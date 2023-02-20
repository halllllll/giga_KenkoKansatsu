import { useState, useEffect, type FC, type SyntheticEvent } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Textarea,
  Input,
  VStack,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { type OptionBase } from "chakra-react-select";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { useForm, type SubmitHandler } from "react-hook-form";
import { type InquiryItem, type Student } from "@/server/Config/SheetData";
import { FormShema } from "../schemas/registration-form";
import ControlledSelect from "./controlled-select";

const _conditionOptionsTest = [
  {
    label: "不定愁訴",
    value: "不定愁訴",
  },
  {
    label: "網膜剥離",
    value: "網膜剥離",
  },
  {
    label: "開放骨折",
    value: "開放骨折",
  },
  {
    label: "鼻血",
    value: "鼻血",
  },
  {
    label: "心臓爆発",
    value: "心臓爆発",
  },
  {
    label: "アルコール中毒",
    value: "アルコール中毒",
  },
  {
    label: "人面疽",
    value: "人面疽",
  },
  {
    label: "タンスの角に小指",
    value: "開放骨折",
  },
  {
    label: "食欲不振",
    value: "食欲不振",
  },
];

const _attendanceOptionsTest = [
  {
    label: "出席停止",
    value: "出席停止",
  },
  {
    label: "病欠",
    value: "病欠",
  },
  {
    label: "自己欠",
    value: "自己欠",
  },
  {
    label: "忌引",
    value: "忌引",
  },
  {
    label: "遅刻",
    value: "遅刻",
  },
];

// for chakra-react-select
interface Grade extends OptionBase {
  label: string;
  value: string;
}
interface ClassName extends OptionBase {
  label: string;
  value: string;
}

interface Name extends OptionBase {
  label: string;
  value: string;
  kana: string;
}

interface Attendance extends OptionBase {
  label: string;
  value: string;
}

interface Condition extends OptionBase {
  label: string;
  value: string;
}

export interface FormValues {
  registerDate: string;
  grade: Grade | null;
  className: ClassName | null;
  name: Name | null;
  attendance: string;
  condition: string[] | null;
  status: string;
}

// あらかじめDefaultValuesをきめておけば、reset()に流用できる
const formDefaultValues: FormValues = {
  registerDate: format(new Date(), "yyyy-MM-dd", { locale: ja }),
  grade: null,
  className: null,
  name: null,
  attendance: "",
  condition: null,
  status: "",
};

type FormProps = {
  readonly students: Student[];
  readonly inquiryItem: InquiryItem | null;
};

const DataForm: FC<FormProps> = (props) => {
  const { students, inquiryItem } = props;

  // 選択肢・選択した値を管理
  const [gradeOptionValue, setGradeOptionValue] = useState<Grade | null>(null);
  const [classNameOptionValue, setClassNameOptionValue] =
    useState<ClassName | null>(null);
  const [nameOptionValue, setNameOptionValue] = useState<Name | null>(null);

  const [gradeOptions, setGradeOptions] = useState<Grade[]>([]);
  const [classNameOptions, setClassNameOptions] = useState<ClassName[]>([]);
  const [nameOptions, setNameOptions] = useState<Name[]>([]);
  const [attendanceOptions, setAttendanceOptions] = useState<Attendance[]>();
  const [conditionOptions, setConditionOptions] = useState<Condition[]>([]);

  useEffect(() => {
    // labelで候補の絞り込み
    // 全部undefined -> 全候補をそのまま設定
    /** thank chat GPT */

    const targetStudents = students.filter((student) => {
      return (
        (gradeOptionValue?.value == null ||
          student.Grade === gradeOptionValue.value) &&
        (classNameOptionValue?.value == null ||
          student.Class === classNameOptionValue.value) &&
        (nameOptionValue?.value == null ||
          student.Name === nameOptionValue.value)
      );
    });
    // それぞれの項目用にデータ整形
    const gradeOptions: Grade[] = [
      ...new Set([...targetStudents].map((sd) => sd.Grade)),
    ]
      .map((d) => {
        return { label: `${d} 年生`, value: d };
      })
      .sort((a, b) => (a.value >= b.value ? 1 : -1));

    const classNameOptions: ClassName[] = [
      ...new Set([...targetStudents].map((sd) => sd.Class)),
    ]
      .map((d) => {
        return { label: `${d} 組`, value: d };
      })
      .sort((a, b) => (a.value >= b.value ? 1 : -1));

    const nameOptions: Name[] = targetStudents
      .map((d) => {
        return {
          label: d.Name,
          value: `${d.Name}`,
          kana: d.Kana,
        };
      })
      .sort((a, b) => (a.value >= b.value ? 1 : -1));

    const attendance: Attendance[] = inquiryItem?.Attendance.map((a) => {
      return { label: a, value: a };
    }) ?? [{ label: "", value: "" }];

    const conditions: Condition[] = inquiryItem?.Condition.map((c) => {
      return { label: c, value: c };
    }) ?? [{ label: "", value: "" }];

    setGradeOptions(gradeOptions);
    setClassNameOptions(classNameOptions);
    setNameOptions(nameOptions);
    setAttendanceOptions(attendance);
    setConditionOptions(conditions);
  }, [
    gradeOptionValue,
    classNameOptionValue,
    nameOptionValue,
    students,
    inquiryItem,
  ]);

  // useForm用
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    control,
    getValues,
  } = useForm<FormValues>({
    mode: "all",
    criteriaMode: "all",
    resolver: yupResolver(FormShema),
    defaultValues: formDefaultValues,
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("yo", data);
    console.log("students?");
    console.log(students);
    // 連続して登録する場合、シチュエーション的にほとんどの場合は名前とstatusのみ変更
    reset({
      grade: gradeOptionValue,
      name: null,
      className: classNameOptionValue,
      status: "",
      attendance: "",
      condition: null,
    });
    setNameOptionValue(null);
  };

  // 全部リセット
  const onReset = (e: SyntheticEvent) => {
    e.stopPropagation();
    reset(formDefaultValues);
    setGradeOptionValue(null);
    setNameOptionValue(null);
    setClassNameOptionValue(null);
  };

  return (
    <Box
      my={3}
      px={5}
      py={3}
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="base"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <HStack>
          <Box width="max-content">
            <FormControl
              my="5"
              id="registerDate"
              isInvalid={!(errors.registerDate?.message == null)}
            >
              <FormLabel>日付</FormLabel>
              <Input
                size="lg"
                variant="flushed"
                {...register("registerDate")}
                type="date"
              />
              {(errors.registerDate?.message !== null && (
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
              value={gradeOptionValue}
              rules={{
                onChange: () => {
                  setGradeOptionValue(getValues().grade);
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
              value={classNameOptionValue}
              rules={{
                onChange: () => {
                  setClassNameOptionValue(getValues().className);
                },
              }}
            />
          </HStack>
          <ControlledSelect<FormValues, Name, false>
            name="name"
            id="name"
            control={control}
            label="名前"
            placeholder="名前を選ぼう！"
            options={nameOptions}
            value={nameOptionValue}
            rules={{
              onChange: () => {
                setNameOptionValue(getValues().name);
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
              label="症状など"
              placeholder="なんでかな？（複数可）"
              options={conditionOptions}
            />
          </HStack>
        </VStack>
        <FormControl id="status" isInvalid={!(errors.status?.message == null)}>
          <FormLabel>備考</FormLabel>
          <Textarea
            maxHeight={200}
            placeholder="備考があれば書いてね"
            {...register("status")}
          />
        </FormControl>
        <HStack alignItems="center" justifyContent="center">
          <ButtonGroup mt="5" w="xs" gap="4">
            <Button
              w="30%"
              colorScheme="orange"
              variant="solid"
              onClick={onReset}
              disabled={isSubmitting}
            >
              リセット
            </Button>
            <Button
              w="70%"
              colorScheme="blue"
              variant="solid"
              type="submit"
              disabled={isSubmitting}
              isLoading={isSubmitting}
              loadingText="送信中"
              spinnerPlacement="start"
            >
              送信
            </Button>
          </ButtonGroup>
        </HStack>
      </form>
    </Box>
  );
};

export default DataForm;
