// Formを司る何か

import { ss } from "@/server/Config/Const";
import {
  MemberSheetName,
  FormSheetName,
  type Student,
  type InquiryItem,
  type Role,
} from "@/server/Config/SheetData";

export type FormRegister = {
  Students: Student[];
  InquiryItems: InquiryItem;
};

const _PrepareForm = async (): Promise<FormRegister> => {
  const [allValues, inquiryValues] = await Promise.all([
    getMemberData(),
    getInquiryData(),
  ]);

  const ret = {
    Students: allValues.filter(
      (row) => row.Role === "児童生徒" || row.Role === "Student"
    ),
    InquiryItems: inquiryValues,
  };

  return ret;
};

const getInquiryData = async (): Promise<InquiryItem> => {
  return await new Promise((resolve, reject) => {
    const sheetName: string = FormSheetName;
    const formSheet = ss.getSheetByName(sheetName);
    if (formSheet === null) {
      reject(new Error("not found form sheet error"));
    } else {
      const inquiryArr = formSheet.getDataRange().getValues() as string[][];
      // カラム方向でのデータがほしいので転置
      const inquiry = inquiryArr.reduce(
        (preVal, curVal, curIdx) => {
          if (curIdx === 0) return preVal;

          return preVal.map((x, idx) =>
            curVal[idx] === "" ? x : [...x, curVal[idx]]
          );
        },
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        [...Array(inquiryArr[0].length)].map((_) => [] as string[])
      );
      // とりあえず設問をインデックスで決め打ちする
      const ret: InquiryItem = {
        Attendance: inquiry[0],
        Condition: inquiry[1],
      };
      resolve(ret);
    }
  });
};

const getMemberData = async (): Promise<Student[]> => {
  return await new Promise<Student[]>((resolve, reject) => {
    const sheetName: string = MemberSheetName;
    const studentSheet = ss.getSheetByName(sheetName);
    if (studentSheet === null) {
      console.error(`can't find the sheet named [${MemberSheetName}]`);
      reject(new Error("not found student sheet error"));
    } else {
      const students: Student[] = studentSheet
        .getDataRange()
        .getValues()
        .slice(1)
        .map((row: Array<string | number | Role>) => {
          const ret = {
            Grade: row[0] as string,
            Class: row[1] as string,
            Number: row[2] as number,
            Name: row[3] as string,
            Kana: row[4] as string,
            Role: row[5] as Role,
          };

          return ret;
        });
      resolve(students);
    }
  });
};

export { getInquiryData, getMemberData };
