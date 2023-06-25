import { type FormValues } from "@/client/components/Form/Form";
import { ss, AnswerSheetHeaders } from "../Config/Const";
import { StoreSheetName } from "../Config/SheetData";

const storeSheet = ss.getSheetByName(StoreSheetName);

const SaveAnswers = (formValues: FormValues[]): boolean => {
  const answerValues = storeSheet
    ?.getDataRange()
    .getDisplayValues() as string[][];
  const header = answerValues[0];
  if (!header.every((header) => AnswerSheetHeaders.includes(header))) {
    // なにもできないことを伝えるよ
    console.error(`${StoreSheetName}シートのヘッダーが異常です`);

    return false;
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
  console.log(`${StoreSheetName}シートに反映しました`);

  return true;
};

type postDataResult = {
  success: boolean;
  error: Error | null;
  msg: string;
};

const postFormValues2 = async (formValues: string): Promise<string> => {
  console.log(formValues);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const formData: FormValues[] = JSON.parse(formValues);

  return await new Promise((resolve, _reject) => {
    try {
      const answerValues = storeSheet
        ?.getDataRange()
        .getDisplayValues() as string[][];
      const header = answerValues[0];
      if (!header.every((header) => AnswerSheetHeaders.includes(header))) {
        // なにもできないことを伝えるよ
        console.error(`${StoreSheetName}シートのヘッダーが異常です`);

        for (const formValue of formData) {
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
        console.log(`${StoreSheetName}シートに反映しました`);

        resolve(
          JSON.stringify({ success: false, error: null, msg: "from server" })
        );
      }
    } catch (err) {
      _reject(err);
    }
  });
};

export { SaveAnswers, postFormValues2, type postDataResult };
