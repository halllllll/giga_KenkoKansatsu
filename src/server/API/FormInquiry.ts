// Formを司る何か

import { ss } from "@/server/Config/Const";
import {
  MemberSheetName,
  FormSheetName,
  type Student,
  type InquiryItem,
  type Role,
} from "@/server/Config/SheetData";
import { NothingFormSheetError } from "../Config/errors";

type getInquiryDataResult = {
  status: null | "success" | "error";
  error?: Error;
  message?: string;
  data?: InquiryItem;
};

const getInquiryData = (): getInquiryDataResult => {
  const sheetName: string = FormSheetName;
  const formSheet = ss.getSheetByName(sheetName);
  const ret: getInquiryDataResult = { status: null };
  try {
    if (formSheet === null) {
      throw new NothingFormSheetError(`NOT Found "${sheetName}" Sheet`);
    }
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
    // TODO: modify?
    // とりあえず設問をインデックスで決め打ちする
    ret.data = {
      Attendance: inquiry[0],
      Condition: inquiry[1],
    };
    ret.status = "success";

    return ret;
  } catch (err) {
    console.error(err);
    ret.status = "error";
    if (err instanceof NothingFormSheetError) {
      ret.error = err;
    }

    return ret;
  }
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

export { getInquiryData, getMemberData, type getInquiryDataResult };
