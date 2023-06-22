import { useState, useEffect } from "react";
import { serverFunctions } from "@/client/App";
import { type Student, type InquiryItem } from "@/server/Config/SheetData";

type MemberDataResult = {
  formStudentElements: Student[];
  inquiryItem: InquiryItem | null;
};

export const useMemberData = (): MemberDataResult => {
  const [formStudentElements, setStudentElements] = useState<Student[]>([]);
  const [inquiryItem, setInquiryItem] = useState<InquiryItem | null>(null);

  useEffect(() => {
    const knock = async () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const [FormElements] = await Promise.all([serverFunctions.PrepareForm()]);
      setStudentElements(FormElements.Students);
      setInquiryItem(FormElements.InquiryItems);
    };
    void knock();
  }, []);

  return { formStudentElements, inquiryItem };
};
