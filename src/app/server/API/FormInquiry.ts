// Formを司る何か

import { ss } from "@/Config/Const";
import {
  MemberSheetName,
  FormSheetName,
  type Student,
  type InquiryItem,
  type Role,
} from "@/Config/SheetData";
import { NothingFormSheetError } from "@/Config/errors";

type inquiryDataResult = {
  status: null | "success" | "error";
  error?: Error;
  message?: string;
  data?: InquiryItem;
};

const getInquiryData = (): inquiryDataResult => {
  const sheetName: string = FormSheetName;
  const formSheet = ss.getSheetByName(sheetName);
  const ret: inquiryDataResult = { status: null };
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
    } else {
      ret.error = new Error("undefined error occured...");
      ret.message = "!! 不明なエラーが発生 !!";
    }

    return ret;
  }
};

type memberDataResult = {
  status: null | "success" | "error";
  error?: Error;
  message?: string;
  data?: Student[];
};

const getMemberData = (): memberDataResult => {
  const sheetName: string = MemberSheetName;
  const studentSheet = ss.getSheetByName(sheetName);
  const ret: memberDataResult = { status: null };
  try {
    if (studentSheet === null) {
      console.error(`can't find the sheet named [${MemberSheetName}]`);
      throw new NothingFormSheetError(`NOT Found "${MemberSheetName}" Sheet`);
    }
    const students: Student[] = studentSheet
      .getDataRange()
      .getDisplayValues()
      .slice(1)
      .map((row: Array<string | number | Role>) => {
        const tmp = {
          Grade: row[0] as string,
          Class: row[1] as string,
          // ↓↓↓ It likes that Apps Script has NOT `Number.NEGATIVE_INFINITY` property.
          // Number: row[2] === "" ? Number.NEGATIVE_INFINITY : (row[2] as number),
          Number: Number.isNaN(parseInt(row[2] as string))
            ? 0
            : (row[2] as number),
          Name: row[3] as string,
          Kana: row[4] as string,
          Role: row[5] as Role,
        };

        return tmp;
      });
    ret.data = students;
    ret.status = "success";

    return ret;
  } catch (err) {
    console.error(err);
    ret.status = "error";
    if (err instanceof NothingFormSheetError) {
      ret.error = err;
      ret.message = ""; // TODO: not need?
    } else {
      ret.error = new Error("undefined error occured...");
      ret.message = "!! 不明なエラーが発生 !!";
    }

    return ret;
  }
};

export {
  getInquiryData,
  getMemberData,
  type inquiryDataResult,
  type memberDataResult,
};
