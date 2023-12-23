import { parseISO, differenceInDays, addDays } from "date-fns";
import { ss, AnswerSheetHeaders } from "@/Config/Const";
import { StoreSheetName } from "@/Config/SheetData";
import {
  InvalidSheetArchtectureError,
  SheetNotFoundError,
} from "@/Config/errors";
import {
  type postDataRequestObj,
  type postDataRequest,
} from "@/app/client/API/postData";
import { type FormValues } from "@/app/client/components/Form/form-select-data";

const storeSheet = ss.getSheetByName(StoreSheetName);

type postDataResult =
  | {
      success: true;
    }
  | {
      success: false;
      error: Error;
      message: string;
      data?: any;
    };

const postFormValues = (data: postDataRequest): postDataResult => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const requestObj: postDataRequestObj = JSON.parse(data) as postDataRequestObj;
  const formValues: FormValues[] = requestObj.data;
  const userId = requestObj?.userId; // TODO: ...
  try {
    // validation
    if (storeSheet === null) {
      return {
        success: false,
        error: new SheetNotFoundError(`NOT Found "${StoreSheetName}" Sheet`),
        message: `not found sheet named ${StoreSheetName}`,
      };
    }
    const answerValues = storeSheet.getDataRange().getDisplayValues();
    const headers = answerValues[0];
    if (!headers.every((header) => AnswerSheetHeaders.includes(header))) {
      console.error("wrong headers!!!");
      console.error(`header of ${StoreSheetName} : ${headers.join(", ")}`);

      return {
        success: false,
        error: new InvalidSheetArchtectureError("INVALID sheet architecture"),
        message: `header of ${
          storeSheet?.getName() ?? "<undefined sheet>"
        } archtecture is weired.`,
      };
    }
    const TIMESTAMP = new Date();
    for (const formValue of formValues) {
      let days = 1;
      const startDay = parseISO(formValue.registerDate);
      if (formValue.registerEndToDate !== undefined) {
        // differenceInDaysは差分なのでもともとのぶん（1日）足す
        days += differenceInDays(
          parseISO(formValue.registerEndToDate),
          startDay
        );
      }
      for (let day = 0; day < days; day++) {
        const curDay = addDays(startDay, day);
        const row = [
          TIMESTAMP,
          userId, // TODO
          curDay, // new Date(formValue.registerDate),
          formValue.grade?.value,
          formValue.className?.value,
          formValue.classNumber,
          formValue.name?.value,
          formValue.name?.kana,
          formValue.attendance.value,
          formValue.condition?.map((val) => val.value).join(", "),
          formValue.status,
        ];
        storeSheet.appendRow(row);
      }
    }

    return { success: true };
  } catch (err) {
    const e = err as Error;
    console.error(e);

    return {
      success: false,
      error: e,
      message: `undefined`,
    };
  }
};

export { postFormValues, type postDataResult };
