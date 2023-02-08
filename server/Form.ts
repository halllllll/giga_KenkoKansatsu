// Formを司る何か

import { ss } from './Const';
import { MemberSheetName, type Student, type Role } from './SheetData';

type FormRegister = {
  Students: Student[];
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PrepareForm = async (): Promise<FormRegister> => {
  const sheetName: string = MemberSheetName;
  // eslint-disable-next-line @typescript-eslint/await-thenable
  const studentSheet = await ss.getSheetByName(sheetName);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const students = studentSheet!
    .getDataRange()
    .getValues()
    .slice(1)
    .map((row: Array<string | number | Role>) => {
      const ret = {
        Grade: row[0] as string,
        Class: row[1] as string,
        Number: row[2] as number,
        Name: row[3] as string,
        Kana: row[4] as string,
        Role: row[5] as Role,
      };

      return ret;
    });
  const ret = {
    Students: students,
  };

  return ret;
};

export { PrepareForm };
