import * as yup from "yup";

// yup用スキーマ
const schema = yup.object().shape({
  registerDate: yup.date().required("登録する日付を選んでね"),
  registerEndToDate: yup.date(),
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
