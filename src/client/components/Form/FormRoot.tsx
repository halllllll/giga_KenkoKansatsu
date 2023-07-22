import { type FC, useEffect, useState, useContext } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, type SubmitHandler, FormProvider } from "react-hook-form";
import { ScreenSpinner } from "@/client/components/Index";
import { type UserType } from "@/server/Config/Response";
import { type InquiryItem, type Student } from "@/server/Config/SheetData";
import SendingModal, { type ModalMessage } from "../Screen/Modal";
import CandidateArea from "./components/Candidate/CandidateArea";
import Form from "./components/Form";
import formDefaultValues from "./form-default-values";
import {
  type ClassName,
  type Name,
  type FormValues,
  type Attendance,
  type Condition,
  type Grade,
} from "./form-select-data";
import { ParentFormSchema } from "./schemas/registration-form-parent";
import { TeacherFormSchema } from "./schemas/registration-form-teacher";
import { type submitStateType } from "./submit-state";
import { Ctx } from "@/client/context";
import { type CandidateAction } from "@/client/reducer/candidateReducer";

type FormProps = {
  readonly candidatesState: FormValues[];
  readonly userType: UserType;
  candidateDispatch: React.Dispatch<CandidateAction>;
};

// experimental
/**
 *
 *  TODO: integrate FORM experiences.
 *  - DEVIDING components for FAST rendering for options.
 *  - Adaptable Thought, especially future-features.
 *
 */

const FormRoot: FC<FormProps> = (props) => {
  const { candidateDispatch, candidatesState, userType } = props;
  const schema = userType === "educator" ? TeacherFormSchema : ParentFormSchema;

  // propsではなくcontextで受け取る
  const curCtx = useContext(Ctx);
  const [formStudents, formInquiryItems] = [
    curCtx.students as Student[],
    curCtx.inquiries as InquiryItem,
  ];

  /**
   *
   * TODO: MORE BETTER temporary-customhook
   *
   */

  // 選択肢・選択した値を管理
  // 選択された値
  const [curGrade, setCurGrade] = useState<Grade | null>(null);
  const [curClassName, setCurClassName] = useState<ClassName | null>(null);
  const [curName, setCurName] = useState<Name | null>(null);

  // 選択肢
  const [gradeOptions, setGradeOptions] = useState<Grade[]>([]);
  const [classNameOptions, setClassNameOptions] = useState<ClassName[]>([]);
  const [nameOptions, setNameOptions] = useState<Name[]>([]);
  const [attendanceOptions, setAttendanceOptions] = useState<
    Attendance[] | null
  >(null);
  const [conditionOptions, setConditionOptions] = useState<Condition[]>([]);

  /**
   * Form部分
   * useForm用 ここから
   */
  const methods = useForm<FormValues>({
    mode: "all",
    criteriaMode: "all",
    resolver: yupResolver(schema),
    defaultValues: formDefaultValues,
  });

  // sets
  // TODO: baaaad suji, terrible, miserable
  const setValueHandlers = {
    setGradeHandler: (): void => {
      setCurGrade(methods.getValues().grade);
    },
    setClassNameHandler: (): void => {
      setCurClassName(methods.getValues().className);
    },
    setNameHandler: (): void => {
      setCurName(methods.getValues().name);
    },
  };

  // 各種options/value用
  useEffect(() => {
    // labelで候補の絞り込み
    // 全部undefined -> 全候補をそのまま設定

    const targetStudents = formStudents.filter((student) => {
      return (
        (curGrade?.value == null || student.Grade === curGrade.value) &&
        (curClassName?.value == null || student.Class === curClassName.value) &&
        (curName?.value == null || student.Name === curName.value)
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

    // TODO: how to treat student class number
    const nameOptions: Name[] = targetStudents
      .map((d) => {
        return {
          label: d.Name,
          value: `${d.Name}`,
          kana: d.Kana,
        };
      })
      .sort((a, b) => (a.value >= b.value ? 1 : -1));

    const attendance: Attendance[] = formInquiryItems?.Attendance.map((a) => {
      return { label: a, value: a };
    }) ?? [{ label: "", value: "" }];

    const conditions: Condition[] = formInquiryItems?.Condition.map((c) => {
      return { label: c, value: c };
    }) ?? [{ label: "", value: "" }];

    if (classNameOptions.length === 1) {
      methods.setValue("className", classNameOptions[0]);
    }
    if (gradeOptions.length === 1) {
      methods.setValue("grade", gradeOptions[0]);
    }
    if (nameOptions.length === 1) {
      methods.setValue("name", nameOptions[0]);
    }
    setGradeOptions(gradeOptions);
    setClassNameOptions(classNameOptions);
    if (userType === "educator") {
      setNameOptions(nameOptions);
    }
    setAttendanceOptions(attendance);
    setConditionOptions(conditions);

    // 出席番号
    if (curName !== null) {
      methods.setValue("classNumber", targetStudents[0].Number);
    }
  }, [
    curGrade,
    curClassName,
    curName,
    formStudents,
    formInquiryItems,
    methods,
    userType,
  ]);

  const onAdd: SubmitHandler<FormValues> = (data) => {
    // 登録
    candidateDispatch({
      type: "ADD",
      payload: data,
    });
    // 連続して登録する場合、シチュエーション的にほとんどの場合は名前とstatusのみ変更
    methods.reset({
      grade: methods.getValues().grade,
      name: null,
      className: methods.getValues().className,
      status: "",
      attendance: { label: "", value: "" },
      condition: [],
    });
    setCurName(null);
    setCurGrade(methods.getValues().grade);
    setCurClassName(methods.getValues().className);
  };

  // 全部リセット(event.propagationは不要らしい)
  const onReset = () => {
    methods.reset(formDefaultValues);
    setCurGrade(null);
    setCurName(null);
    setCurClassName(null);
  };

  /**
   * modal 用
   */
  const { onClose, onOpen, isOpen } = useDisclosure();
  const [modalMessage, setModalMessage] = useState<ModalMessage>(null);
  const setModalHandler = (msg: ModalMessage) => {
    setModalMessage(msg);
  };
  const [submitState, setSubmitState] = useState<submitStateType>("idle");
  const submitStateHandler = (submitState: submitStateType) => {
    setSubmitState(submitState);
  };
  const checkSubmitStateHandler = (submitStateType: submitStateType) => {
    return submitState === submitStateType;
  };

  return (
    <>
      {submitState === "isSubmitting" && <ScreenSpinner />}
      {submitState === "isSubmitted" && (
        <SendingModal
          isOpen={isOpen}
          onClose={onClose}
          message={modalMessage}
        />
      )}
      <FormProvider {...methods}>
        <Form
          onAdd={onAdd}
          onReset={onReset}
          classNameOptions={classNameOptions}
          nameOptions={nameOptions}
          gradeOptions={gradeOptions}
          conditionOptions={conditionOptions}
          attendanceOptions={attendanceOptions}
          userType={userType}
          setValueHandlers={setValueHandlers}
        />
      </FormProvider>
      {candidatesState.length > 0 && (
        <CandidateArea
          candidatesState={candidatesState}
          onOpenModal={onOpen}
          onDefaultForm={onReset}
          candidateDispatch={candidateDispatch}
          setModalMessage={setModalHandler}
          setSubmitState={submitStateHandler}
          checkSubmitState={checkSubmitStateHandler}
        />
      )}
    </>
  );
};

export default FormRoot;
