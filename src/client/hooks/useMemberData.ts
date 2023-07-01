import { useState, useEffect } from "react";

import { type Student, type InquiryItem } from "@/server/Config/SheetData";
import {
  FormInquiryAPI,
  FormMemberAPI,
} from "@/client/API/initialAccessFormData";

type MemberDataResult = {
  formStudents: Student[];
  formInquiryItems: InquiryItem;
};

export const useMemberData = (): MemberDataResult => {
  const [formStudents, setStudentElements] = useState<Student[]>([]);
  const [formInquiryItems, setInquiryItem] = useState<InquiryItem>({
    Attendance: [],
    Condition: [],
  });

  useEffect(() => {
    const knock = async () => {
      const [FormElementsStudents, FormElementsInquiryItems] =
        await Promise.all([FormMemberAPI(), FormInquiryAPI()]);
      setStudentElements(FormElementsStudents);
      setInquiryItem(FormElementsInquiryItems);
    };
    void knock();
  }, []);

  return { formStudents, formInquiryItems };
};
