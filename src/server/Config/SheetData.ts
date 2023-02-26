// どういうシートがあり、どのシートにどのようなデータがあり、どんなデータ構造や型で提供するかをキメる
const MemberSheetName = "Member";
const StoreSheetName = "Answers";
const FormSheetName = "Form Items";

type Role = "児童生徒" | "Student" | "先生" | "Teacher" | "管理者" | "Admin";

// record
interface Student {
  Grade: string;
  Class: string;
  Number: number;
  Name: string;
  Kana: string;
  Role: Role;
}

// column
interface InquiryItem {
  Attendance: string[];
  Condition: string[];
}

interface Answer {
  TimeStamp: Date;
  Date: Date;
  Grade: string;
  Class: string;
  Number: number;
  Name: string;
  Kana: string;
  Attendance: string;
  Condition: string;
  Special: string;
}

const EssentialSheets = [MemberSheetName, StoreSheetName, FormSheetName];

export {
  MemberSheetName,
  StoreSheetName,
  FormSheetName,
  EssentialSheets,
  type Student,
  type Role,
  type InquiryItem,
  type Answer,
};
