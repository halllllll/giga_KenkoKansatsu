// どういうシートがあり、どのシートにどのようなデータがあり、どんなデータ構造や型で提供するかをキメる
const MemberSheetName = 'Member';
const StoreSheetName = 'Store';
const FormSheetName = 'Form Items';

type Role = '児童生徒' | '先生' | 'その他';

interface Student {
  Grade: string;
  Class: string;
  Number: number;
  Name: string;
  Kana: string;
  Role: Role;
}

export {
  MemberSheetName,
  StoreSheetName,
  FormSheetName,
  type Student,
  type Role,
};
