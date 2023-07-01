import { useState, useEffect } from "react";
import { type InquiryItem, type Student } from "@/server/Config/SheetData";
import {
  type ClassName,
  type Name,
  type Grade,
  type Condition,
  type Attendance,
} from "../form-select-data";

type useFormOptionsResult = {
  setGrade: (v: Grade | null) => void;
  setClassName: (V: ClassName | null) => void;
  setName: (V: Name | null) => void;

  gradeOptions: Grade[];
  classNameOptions: ClassName[];
  nameOptions: Name[];
  attendanceOptions: Attendance[] | null;
  conditionOptions: Condition[];
};

export type FormOptionsProps = {
  students: Student[];
  inquiryItem: InquiryItem;
};

export const useOptionsOfForm = (
  props: FormOptionsProps
): useFormOptionsResult => {
  const { students, inquiryItem } = props;

  // 選択肢・選択した値を管理
  // 選択された値
  const [curGrade, setCurGrade] = useState<Grade | null>(null);
  const [curClassName, setCurClassName] = useState<ClassName | null>(null);
  const [curName, setCurName] = useState<Name | null>(null);

  // // 選択肢
  const [gradeOpts, setGradeOpts] = useState<Grade[]>([]);
  const [classNameOpts, setClassNameOpts] = useState<ClassName[]>([]);
  const [nameOpts, setNameOpts] = useState<Name[]>([]);
  const [attendanceOpts, setAttendanceOpts] = useState<Attendance[] | null>(
    null
  );
  const [conditionOpts, setConditionOpts] = useState<Condition[]>([]);

  useEffect(() => {
    // labelで候補の絞り込み
    // 全部undefined -> 全候補をそのまま設定
    /** thank chat GPT */

    const targetStudents = students.filter((student) => {
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

    const nameOptions: Name[] = targetStudents
      .map((d) => {
        return {
          label: d.Name,
          value: `${d.Name}`,
          kana: d.Kana,
        };
      })
      .sort((a, b) => (a.value >= b.value ? 1 : -1));

    const attendance: Attendance[] = inquiryItem.Attendance.map((a) => {
      return { label: a, value: a };
    }) ?? [{ label: "", value: "" }];

    const conditions: Condition[] = inquiryItem.Condition.map((c) => {
      return { label: c, value: c };
    }) ?? [{ label: "", value: "" }];

    setGradeOpts(gradeOptions);
    setClassNameOpts(classNameOptions);
    setNameOpts(nameOptions);
    setAttendanceOpts(attendance);
    setConditionOpts(conditions);
  }, [curGrade, curClassName, curName, students, inquiryItem]);

  return {
    setGrade: setCurGrade,
    setClassName: setCurClassName,
    setName: setCurName,
    gradeOptions: gradeOpts,
    classNameOptions: classNameOpts,
    nameOptions: nameOpts,
    attendanceOptions: attendanceOpts,
    conditionOptions: conditionOpts,
  };
};
