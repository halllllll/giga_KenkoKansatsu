import { useState, useEffect } from "react";

import { type Student, type InquiryItem } from "@/server/Config/SheetData";
import { FormInquiryAPI, FormMemberAPI } from "../API/initialAccessFormData";

type MemberDataResult = {
  formStudentElements: Student[];
  inquiryItem: InquiryItem | null;
};

export const useMemberData = (): MemberDataResult => {
  const [formStudentElements, setStudentElements] = useState<Student[]>([]);
  const [inquiryItem, setInquiryItem] = useState<InquiryItem | null>(null);

  useEffect(() => {
    const knock = async () => {
      const [FormElementsStudents, FormElementsInquiryItems] =
        await Promise.all([FormMemberAPI(), FormInquiryAPI()]);
      setStudentElements(FormElementsStudents);
      setInquiryItem(FormElementsInquiryItems);
    };
    void knock();
  }, []);

  return { formStudentElements, inquiryItem };
};
