/* eslint-disable import/extensions */
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

// TODO: あとでやる
// const FormViewDataAPI = () => {};

export { FormInquiryAPI, FormMemberAPI };
