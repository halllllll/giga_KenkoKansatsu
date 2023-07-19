import { differenceInDays, isBefore } from "date-fns";
import * as yup from "yup";

interface EndToDateTestContext extends yup.TestContext {
  parent: {
    registerDate: Date;
  };
}

// interface AtDateTestContext extends yup.TestContext {
//   parent: {
//     registerEndToDate: Date;
//   };
// }

interface TermTestContext extends yup.TestContext {
  parent: {
    termSwitch: boolean;
  };
}

// yup用スキーマ
const schema = yup.object().shape({
  registerDate: yup
    .date()
    .required("登録する日付を選んでね")
    .test(
      "is-lesser",
      "開始日は終了日よりも前にしてね",
      function (/* value */) {
        // TODO: a~....
        const { termSwitch } = (this as TermTestContext).parent;
        if (!termSwitch) return true;

        // const { registerEndToDate } = (this as AtDateTestContext).parent;
        // if (value instanceof Date) {
        //   return isBefore(registerEndToDate, value);
        // }

        return true;
      }
    ),

  termSwitch: yup.bool().default(false).required(),
  registerEndToDate: yup
    // 「期間日のバリデーション」を考えたい
    // TODO: あとでやる
    .date()
    .nullable()
    .notRequired()
    .test("is-greater", "終了日は開始日よりも後にしてね", function (value) {
      const { registerDate } = (this as EndToDateTestContext).parent;
      if (value === null || value === undefined) return true;
      if (value instanceof Date) {
        return isBefore(registerDate, value);
      }
      console.log("omg...");

      return true;
    })
    .test(
      "within-40-days",
      "終了日は開始日から40日以内にしてね",
      function (value) {
        const { registerDate } = (this as EndToDateTestContext).parent;
        if (value === null || value === undefined) return true;

        if (value instanceof Date) {
          const daysDifference = differenceInDays(value, registerDate);

          return daysDifference <= 40;
        }
        console.log("omg...");

        return false;
      }
    ),
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
  status: yup.string(),
});

// type FormValueSchema = InferType<typeof schema>

export { schema as TeacherFormSchema };
