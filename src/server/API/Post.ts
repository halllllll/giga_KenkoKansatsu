import { ss, AnswerSheetHeaders } from "@/server/Config/Const";
import { StoreSheetName } from "@/server/Config/SheetData";
import { type postDataRequest } from "@/client/API/postData";
import { type FormValues } from "@/client/components/Form/form-select-data";
import { InvalidSheetError } from "@/server/Config/errors";

const storeSheet = ss.getSheetByName(StoreSheetName);

type postDataResult = {
  status: null | "success" | "error";
  error?: Error;
  message?: string;
  data?: any;
};

const postFormValues = (data: postDataRequest): postDataResult => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const formValues: FormValues[] = JSON.parse(data) as FormValues[];
  const ret: postDataResult = { status: null };
  try {
    // validation
    if (storeSheet === null) {
      throw new InvalidSheetError(`NOT Found "${StoreSheetName}" Sheet`);
    }
    const answerValues = storeSheet.getDataRange().getDisplayValues();
    const header = answerValues[0];
    if (!header.every((header) => AnswerSheetHeaders.includes(header))) {
      throw new InvalidSheetError("INVALID sheet architecture");
    }

    for (const formValue of formValues) {
      const row = [
        new Date(),
        "（未実装）", // TODO
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
      storeSheet?.appendRow(row);
    }
    ret.status = "success";
  } catch (err) {
    ret.status = "error";
    if (err instanceof InvalidSheetError) {
      ret.error = err;
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
