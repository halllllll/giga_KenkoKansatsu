import { ss, AnswerSheetHeaders } from "@/server/Config/Const";
import { StoreSheetName } from "@/server/Config/SheetData";
import {
  type postDataRequestObj,
  type postDataRequest,
} from "@/client/API/postData";
import { type FormValues } from "@/client/components/Form/form-select-data";
import {
  InvalidSheetArchtectureError,
  NothingFormSheetError,
} from "@/server/Config/errors";

const storeSheet = ss.getSheetByName(StoreSheetName);

type postDataResult = {
  status: null | "success" | "error";
  error?: Error;
  message?: string;
  data?: any;
};

const postFormValues = (data: postDataRequest): postDataResult => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const requestObj: postDataRequestObj = JSON.parse(data) as postDataRequestObj;
  const formValues: FormValues[] = requestObj.data;
  const userId = requestObj?.userId; // TODO: ...
  const ret: postDataResult = { status: null };
  try {
    // validation
    if (storeSheet === null) {
      throw new NothingFormSheetError(`NOT Found "${StoreSheetName}" Sheet`);
    }
    const answerValues = storeSheet.getDataRange().getDisplayValues();
    const headers = answerValues[0];
    if (!headers.every((header) => AnswerSheetHeaders.includes(header))) {
      console.error("wrong headers!!!");
      console.error(`header of ${StoreSheetName} : ${headers.join(", ")}`);
      throw new InvalidSheetArchtectureError("INVALID sheet architecture");
    }

    for (const formValue of formValues) {
      const row = [
        new Date(),
        userId, // "（未実装）", // TODO
        new Date(formValue.registerDate),
        formValue.grade?.value,
        formValue.className?.value,
        formValue.classNumber,
        formValue.name?.value,
        formValue.classNumber,
        formValue.attendance.value,
        formValue.condition?.map((val) => val.value).join(", "),
        formValue.status,
      ];
      storeSheet.appendRow(row);
    }
    ret.status = "success";
  } catch (err) {
    ret.status = "error";
    if (err instanceof NothingFormSheetError) {
      ret.error = err;
      ret.message = `not found sheet named ${StoreSheetName}`;
      console.error(err);
    } else if (err instanceof InvalidSheetArchtectureError) {
      ret.error = err;
      ret.message = `header of ${
        storeSheet?.getName() ?? "<undefined sheet>"
      } archtecture is weired.`;
      console.error(err);
    } else {
      ret.error = new Error("undefined error");
      console.error(err);
    }
  } finally {
    // eslint-disable-next-line no-unsafe-finally
    return ret;
  }
};

export { postFormValues, type postDataResult };
