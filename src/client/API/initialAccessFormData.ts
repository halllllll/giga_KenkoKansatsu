/* eslint-disable import/extensions */
import { type getInquiryDataResult } from "@/server/API/FormInquiry";
import { type Student, type InquiryItem } from "@/server/Config/SheetData";
import { serverFunctions, isGASEnvironment } from "./serverFunctions";

const FormInquiryAPI = async (): Promise<getInquiryDataResult> => {
  if (isGASEnvironment()) {
    const ret = await serverFunctions.getInquiryData();

    return ret;
  } else {
    // in dev
    const ret: getInquiryDataResult = { status: "success" };
    const data = await import("./stubs/formInquiries.json");

    return await new Promise((resolve) => {
      setTimeout(() => {
        ret.data = data.Inquiries as unknown as InquiryItem;
        resolve(ret);
      }, 1500);
    });
  }
};

const FormMemberAPI = async (): Promise<Student[]> => {
  if (isGASEnvironment()) {
    const ret = await serverFunctions.getMemberData();

    return ret;
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

export { FormInquiryAPI, FormMemberAPI };
