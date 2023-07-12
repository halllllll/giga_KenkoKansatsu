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
      // TODO: validation (where? not here?)
      if (
        FormElementsInquiryItems.status === "success" &&
        FormElementsInquiryItems.data !== undefined
      ) {
        setInquiryItem(FormElementsInquiryItems.data);
      } else {
        // TODO: error handling
        console.error(FormElementsInquiryItems.error);
      }
    };
    void knock();
  }, []);

  return { formStudents, formInquiryItems };
};
