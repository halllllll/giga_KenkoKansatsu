import { type OptionBase } from "chakra-react-select";

interface Grade extends OptionBase {
  label: string;
  value: string;
}
interface ClassName extends OptionBase {
  label: string;
  value: string;
}

type StudentNumberForClass = number;

interface Name extends OptionBase {
  label: string;
  value: string;
  kana: string;
  classNumber?: StudentNumberForClass;
}

interface Attendance extends OptionBase {
  label: string;
  value: string;
}

interface Condition extends OptionBase {
  label: string;
  value: string;
}

interface FormValues {
  registerDate: string; // not date but string
  registerEndToDate?: string;
  grade: Grade | null;
  className: ClassName | null;
  classNumber: number | null;
  name: Name | null;
  attendance: Attendance;
  condition: Condition[] | null;
  status: string;
}

export type { Grade, ClassName, Name, Attendance, Condition, FormValues };
