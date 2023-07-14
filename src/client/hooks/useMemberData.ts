import { useState, useEffect } from "react";

import { type UserType } from "@/server/Config/Response";
import { type Student, type InquiryItem } from "@/server/Config/SheetData";
import { FormViewDataAPI } from "@/client/API/initialAccessFormData";

type MemberDataResult = {
  formStudents: Student[];
  formInquiryItems: InquiryItem;
  accessedUserId: string;
  accessedUserType: UserType;
};

export const useMemberData = (): MemberDataResult => {
  const [formStudents, setStudentElements] = useState<Student[]>([]);
  const [formInquiryItems, setInquiryItem] = useState<InquiryItem>({
    Attendance: [],
    Condition: [],
  });
  // TODO: matomo logic
  const [accessedUserId, setAccessedUserId] = useState<string>("");
  const [accessedUserType, setAccessedUserType] =
    useState<UserType>("educator"); // TODO: init

  useEffect(() => {
    const knock = async () => {
      const viewData = await FormViewDataAPI();

      switch (viewData.userType) {
        case "educator": {
          setStudentElements(viewData.Students);
          setInquiryItem(viewData.InquiryItem);
          setAccessedUserId(viewData.userId);
          setAccessedUserType(viewData.userType);
          break;
        }
        case "general": {
          setInquiryItem(viewData.InquiryItem);
          break;
        }
      }
    };
    void knock();
  }, []);

  return { formStudents, formInquiryItems, accessedUserId, accessedUserType };
};
