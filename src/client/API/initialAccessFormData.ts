/* eslint-disable import/extensions */
import { type FormViewResponse } from "@/server/Config/Response";
import { type Student, type InquiryItem } from "@/server/Config/SheetData";
import { serverFunctions, isGASEnvironment } from "./serverFunctions";

const FormInquiryAPI = async (): Promise<InquiryItem> => {
  if (isGASEnvironment()) {
    const ret = await serverFunctions.getInquiryData();
    if (ret.status === "success" && ret.data !== undefined) {
      return ret.data;
    } else {
      // TODO: error handling
      console.error(ret.error);
    }

    return { Attendance: [], Condition: [] };
  } else {
    // in dev
    const data = await import("./stubs/formInquiries.json");

    return await new Promise((resolve) => {
      setTimeout(() => {
        resolve(data.Inquiries as unknown as InquiryItem);
      }, 1500);
    });
  }
};

const FormMemberAPI = async (): Promise<Student[]> => {
  if (isGASEnvironment()) {
    const ret = await serverFunctions.getMemberData();
    if (ret.status === "success" && ret.data !== undefined) {
      return ret.data;
    } else {
      // TODO: error handling
      console.error(ret.error);
    }

    return [];
  } else {
    // in dev
    const data = await import("./stubs/formMember.json");

    return await new Promise((resolve) => {
      setTimeout(() => {
        resolve(data.Students as unknown as Student[]);
      }, 1500);
    });
  }
};

const FormViewDataAPI = async (): Promise<FormViewResponse> => {
  if (isGASEnvironment()) {
    const ret = await serverFunctions.genFormViewData();

    return ret;
  } else {
    // in dev (treat as educator)
    const [inquiryStub, memberStub] = await Promise.all([
      import("./stubs/formInquiries.json"),
      import("./stubs/formMember.json"),
    ]);

    return await new Promise((resolve) => {
      setTimeout(() => {
        const ret = {
          userType: "educator",
          userId: "educator@example.mail",
          InquiryItem: inquiryStub.Inquiries,
          Students: memberStub.Students,
        };
        resolve(ret as FormViewResponse);
      }, 1500);
    });
  }
};

export { FormInquiryAPI, FormMemberAPI, FormViewDataAPI };
