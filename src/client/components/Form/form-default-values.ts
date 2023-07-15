import { format } from "date-fns";
import ja from "date-fns/locale/ja-Hira";
import { type FormValues } from "./form-select-data";

// あらかじめDefaultValuesをきめておけば、reset()に流用できる
const formDefaultValues: FormValues = {
  registerDate: format(new Date(), "yyyy-MM-dd", { locale: ja }),
  registerEndToDate: undefined,
  grade: null,
  className: null,
  classNumber: null,
  name: null,
  attendance: { label: "", value: "" },
  condition: [],
  status: "",
};

export default formDefaultValues;
