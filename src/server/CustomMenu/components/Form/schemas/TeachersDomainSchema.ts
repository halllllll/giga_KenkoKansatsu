import * as yup from "yup";

const schema = yup.object().shape({
  domain: yup
    .string()
    .matches(/^[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-z]{2,}$/, {
      message: "ドメインが不正です",
      excludeEmptyString: true,
    })
    .required("ドメインを入力してください")
    .default(""),
});

export { schema as TDSchema };
