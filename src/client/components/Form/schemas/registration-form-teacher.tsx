import { differenceInDays, isBefore } from "date-fns";
import * as yup from "yup";

interface EndToDateTestContext extends yup.TestContext {
  parent: {
    registerDate: Date;
  };
}

// yup用スキーマ
const schema = yup.object().shape({
  registerDate: yup.date().required("登録する日付を選んでね"),
  registerEndToDate: yup
    .date()
    .notRequired()
    .test("is-greater", "日付より後にしよう！", function (value) {
      const { registerDate } = (this as EndToDateTestContext).parent;
      if (value === null || value === undefined) return true;
      if (value instanceof Date) {
        return isBefore(registerDate, value);
      }

      return true;
    })
    // TODO: 妥当？
    .test("within-40-days", "開始日から40日以内にしよう！", function (value) {
      const { registerDate } = (this as EndToDateTestContext).parent;
      if (value === null || value === undefined) return true;
      if (value instanceof Date) {
        const daysDifference = differenceInDays(value, registerDate);

        return daysDifference <= 40;
      }

      return false;
    }),
  grade: yup
    .object()
    .shape({
      label: yup.string().required(),
      value: yup.string().required(),
    })
    .nullable()
    .required("学年を選んでね"),
  name: yup
    .object()
    .shape({
      label: yup.string().required(),
      value: yup.string().required(),
    })
    .nullable()
    .required("名前を検索・選択してね"),
  className: yup
    .object()
    .shape({
      label: yup.string().required(),
      value: yup.string().required(),
    })
    .nullable()
    .required("クラスを選んでね"),
  classNumber: yup.number().nullable(), // 出席番号
  status: yup.string(),
});

// type FormValueSchema = InferType<typeof schema>

export { schema as TeacherFormSchema };
